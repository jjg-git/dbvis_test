var express = require('express');
var router = express.Router();
var DB = require('../db/mysql-DB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
