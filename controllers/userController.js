const { User } = require('../models/userModel');
const { wrapAsync } = require('../utils/wrapAsync');


exports.registerPage = (req, res) => {
    res.render('auth/register.ejs');
};

exports.register = wrapAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);

        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome back to WanderLust");
            res.redirect('/listings');
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect('/signup');
    }
});

exports.loginPage = (req, res) => {
    res.render('auth/login.ejs');
}

exports.login = (req, res) => {
    req.flash("success", "Welcome back to WanderLust")
    let redirectURL = res.locals.redirectUrl || "/listings";
    res.redirect(redirectURL);
};

exports.logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged you out!");
        res.redirect('/listings');
    })
}