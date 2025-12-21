const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner ,validateListing } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

const listingController = require("../controllers/listing.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});


//Index.route
router.get("/", wrapAsync(listingController.index));

// SEARCH ROUTE
router.get("/search", wrapAsync(listingController.searchListings));


//New Route
router.get("/new", isLoggedIn, listingController.renderNew);

//Show Route
router.get("/:id", wrapAsync(listingController.showlisting));

//Create Route
router.post("/", 
     isLoggedIn,
     
     upload.single('listing[image]'),
      validateListing,
      wrapAsync(listingController.createlisting));



// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.editlisting));

// Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updatelisting));



//Delete Route
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingController.deletelisting));

module.exports = router;