exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // redirectURL
        req.session.redirectURL = req.originalUrl;
        req.flash("error", "you must be loggedIn to add Listing");
        return res.redirect('/login');
    }
    next();

}

exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirectUrl = req.session.redirectURL;
    }
    next();
}
