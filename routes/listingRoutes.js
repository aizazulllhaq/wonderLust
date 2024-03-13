const { Router } = require('express');
const listingController = require('../controllers/listingController');
const { validateListing } = require('../middlewares/validateListing');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isOwner } = require('../middlewares/isOwner');
const router = Router();
const multer = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage });



exports.router = router
    .get('/', listingController.index)
    .get('/new', isLoggedIn, listingController.newLustForm)
    .post('/', isLoggedIn, upload.single("listing[image]"), validateListing, listingController.newLust)
    .get('/:id', listingController.show)
    .get('/:id/edit', isLoggedIn, isOwner, listingController.editList)
    .put('/:id/edit', isOwner, isLoggedIn, upload.single("listing[image]"), validateListing, listingController.updateList)
    .delete('/:id', isOwner, isLoggedIn, listingController.deleteList)

