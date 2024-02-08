const { listingSchema } = require('../schema');
const ExpressError = require('./ExpressError');

exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }

}