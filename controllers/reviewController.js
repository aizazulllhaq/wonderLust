const { Review } = require('../models/reviewModel');
const { wrapAsync } = require('../utils/wrapAsync');
const { Listing } = require('../models/listngModel');

exports.listingReview = wrapAsync(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "Review Created");
    res.redirect(`/listings/${id}`)
});

exports.deleteReview = wrapAsync(async (req, res) => {
    const { id, reviewID } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } })
    await Review.findByIdAndDelete(reviewID);

    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
})