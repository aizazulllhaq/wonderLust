if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const listingRouter = require('./routes/listingRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes');
const path = require('path');
const methodOverride = require('method-override');
const { dbConnect } = require('./utils/dbCon');
const ejsMate = require('ejs-mate');
const ExpressError = require('./middlewares/ExpressError');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const { User } = require('./models/userModel');
const LocalStrategy = require('passport-local');

// Database Connection
dbConnect();


// Middlewares
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let dbURL = process.env.ATLAS_URL;
const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
})

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(process.env.PUBLIC_DIR));


// Routes
app.use("/listings", listingRouter.router);
app.use(reviewRouter.router);
app.use(userRouter.router);


app.get('/', (req, res) => {
    res.redirect('/listings');
})

// Pages which doesn't Exists
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"))
})


// Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Some Error Occurred!" } = err;
    res.status(statusCode).render('error.ejs', { message: message })
});



// Server Listening
app.listen(process.env.PORT, () => {
    console.log(`[-] Server Listening At : http://localhost:${process.env.PORT}`);
})