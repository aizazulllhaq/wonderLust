const { Listing } = require('../models/listngModel');

exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!res.locals.currUser) {
        req.flash("error", "You must need to LoggedIn for this Operation!");
        res.redirect("/login");
    } else {
        if (!listing.owner._id.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the owner of this listing");
            return res.redirect(`/listings/${id}`);
        }
        next();

    }
}