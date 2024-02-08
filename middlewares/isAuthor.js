const { Review } = require('../models/reviewModel');

exports.isAuthor = async (req, res, next) => {
    let { id , reviewID } = req.params;
    let review = await Review.findById(reviewID);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the Author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}