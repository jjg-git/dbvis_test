const express = require("express");
const router = express.Router();
const platformReview = require("./query/platform-review");
const achievementReview = require("./query/achievement-review");
const ownerReview = require("./query/owner-review");
const gdcReview = require("./query/genre-date-category-review");
const gppReview = require("./query/genre-price-platform-review");


router.use('/platform-review', platformReview);
router.use('/achievement-review', achievementReview);
router.use('/owner-review', ownerReview);
router.use('/genre-date-category-review', gdcReview);
router.use('/genre-price-platform-review', gppReview);
module.exports = router;
