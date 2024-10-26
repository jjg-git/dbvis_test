const express = require("express");
const router = express.Router();
const { selectAggregateSQL } = require("../sqlOperation");

const sendJSON = async function(req, res, next) {
  const results = {data: req.results};
  console.log("sendJSON::results =", results);
  await res.json(results);
  console.log("done sending JSON");
}

const prepareData = function (req, res, next) {
  console.log("prepareData");
  req.aggData = {
    basic: undefined,
    exclusive: undefined
  }
  next();
}

function selectPlatformForSQL(option) {
  const queries = {
    basic:
`
SELECT (
	SELECT COUNT(*)
    FROM games AS g
    JOIN platform AS p ON g.app_id = p.app_id
    WHERE p.windows LIKE "true"
) as "windows", 
(
	SELECT COUNT(*)
    FROM games AS g
    JOIN platform AS p ON g.app_id = p.app_id
    WHERE p.mac LIKE "true"
) as "mac", 
(
	SELECT COUNT(*)
    FROM games AS g
    JOIN platform AS p ON g.app_id = p.app_id
    WHERE p.linux LIKE "true"
) as "linux";
`
    ,
    exclusive:
`
SELECT (
	SELECT COUNT(*)
    FROM games AS g
    JOIN platform AS p ON g.app_id = p.app_id
    WHERE p.windows LIKE "true" AND
		  p.mac LIKE "false" AND
          p.linux LIKE "false"
) as "windows", 
(
	SELECT COUNT(*)
    FROM games AS g
    JOIN platform AS p ON g.app_id = p.app_id
    WHERE p.windows LIKE "false" AND
		  p.mac LIKE "true" AND
          p.linux LIKE "false"
) as "mac", 
(
	SELECT COUNT(*)
    FROM games AS g
    JOIN platform AS p ON g.app_id = p.app_id
    WHERE p.windows LIKE "false" AND
		  p.mac LIKE "false" AND
          p.linux LIKE "true"
) as "linux";
`
  }

  return queries[option];
}

router.get('/', [
  prepareData,

  (req, res, next) => {
    console.log("querrying basic");
    req.query = selectPlatformForSQL("basic");
    next();
  },
  selectAggregateSQL,
  (req, res, next) => {
    console.log("preparing basic");
    req.aggData.basic = req.results;
    next();
  },

  (req, res, next) => {
    console.log("querrying exclusive");
    req.query = selectPlatformForSQL("exclusive");
    next();
  },
  selectAggregateSQL,
  (req, res, next) => {
    console.log("preparing exclusive");
    req.aggData.exclusive = req.results;
    next();
  },
  (req, res, next) => {
    req.results = req.aggData;
    next();
  },
  sendJSON
]);

module.exports = router;
