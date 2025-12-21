const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateReview ,isReviewAuthor} = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

const reviewControllers = require("../controllers/reviews");
//Reviews
router.post("/",  isLoggedIn,
    validateReview,wrapAsync( reviewControllers.createReview )
    
);


// Delete Review Route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor,
    wrapAsync( reviewControllers.deleteReview )
);

module.exports = router;