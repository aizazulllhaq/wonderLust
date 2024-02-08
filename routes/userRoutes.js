const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const { isLoggedIn, saveRedirectUrl } = require('../middlewares/isLoggedIn');


exports.router = router
    .get('/signup', userController.registerPage)
    .post('/signup', userController.register)
    .get('/login', userController.loginPage)
    .post('/login', saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), userController.login)
    .get('/logout', isLoggedIn, userController.logout)