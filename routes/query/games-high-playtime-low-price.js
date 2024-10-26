const express = require("express");
const router = express.Router();
const { selectAggregateSQL, selectSQL } = require("../sqlOperation");

const sendJSON = async function(req, res, next) {
  const results = {data: req.results};
  console.log("sendJSON::results =", results);
  await res.json(results);
  console.log("done sending JSON");
}

const prepareData = function (req, res, next) {
  console.log("prepareData");
  req.aggData = {
    
  }
  next();
}

router.get('/', [
  prepareData,
  function (req, res, next) {
    req.queryFilePath = 'db/sql/games-high-playtime-low-price/basequery2.sql'
    next();
},
  selectSQL,
  sendJSON
]);

module.exports = router;
