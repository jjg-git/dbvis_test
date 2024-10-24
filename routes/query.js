const express = require("express");
const router = express.Router();
const platformReview = require("./query/platform-review");

router.use('/platform-review', platformReview);

module.exports = router;
