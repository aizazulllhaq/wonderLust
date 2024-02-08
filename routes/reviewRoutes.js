const { Router } = require('express');
const reviewController = require('../controllers/reviewController');
const { validateReview } = require('../middlewares/validateReview');
const { isAuthor } = require('../middlewares/isAuthor');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const router = Router();

exports.router = router
    .post('/listings/:id/reviews', isLoggedIn, validateReview, reviewController.listingReview)
    .delete('/listings/:id/reviews/:reviewID', isLoggedIn, isAuthor, reviewController.deleteReview)