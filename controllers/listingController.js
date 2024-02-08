const ExpressError = require('../middlewares/ExpressError');
const { wrapAsync } = require('../utils/wrapAsync');
const { Listing } = require('../models/listngModel');

exports.index = wrapAsync(async (req, res) => {

    const index = await Listing.find();
    res.render('listings/index.ejs', { lists: index });

});

exports.newLustForm = (req, res) => {
    res.render('listings/new.ejs');
}

exports.newLust = wrapAsync(async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newLust = new Listing(req.body.listing);
    newLust.owner = req.user._id;
    newLust.image = { url, filename };
    await newLust.save();
    req.flash("success", "New Listing Created");
    res.redirect('/listings');
})

exports.show = wrapAsync(async (req, res) => {

    let { id } = req.params;
    const list = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author"
        }
    }).populate("owner");
    if (!list) {
        req.flash("error", "Listing you requested doesn't exists");
        res.redirect('/listings');
    }
    res.render('listings/show.ejs', { list: list })


});

exports.editList = wrapAsync(async (req, res) => {

    const { id } = req.params;
    const list = await Listing.findById(id);
    if (list) {
        let orignalImgUrl = list.image.url;
        orignalImgUrl = orignalImgUrl.replace('/upload', '/upload/w_200');
        res.render('listings/editList.ejs', { list, orignalImgUrl })
    } else {
        req.flash("error", "Listing you requested doesn't exists");
        res.redirect('/listings');
    }
})

exports.updateList = wrapAsync(async (req, res) => {

    const { id } = req.params;
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    let listing = await Listing.findByIdAndUpdate({ _id: id }, req.body.listing)

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect('/listings');
})

exports.deleteList = wrapAsync(async (req, res) => {

    const { id } = req.params;
    const list = await Listing.findOne({ _id: id });
    if (list) {
        await Listing.deleteOne({ _id: id });
        req.flash("success", "Listing Deleted")
        res.redirect('/listings');
    } else {
        req.flash("error", "Listing you requested doesn't exists");
        res.redirect('/listings');
    }
});

