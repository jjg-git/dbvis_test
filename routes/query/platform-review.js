const express = require("express");
const router = express.Router();
const { selectSQL, getSQLFile } = require("../sqlOperation");

const DB = require('../../db/mysql-DB');
const fs = require('fs/promises');

const sendJSON = async function(req, res, next) {
  const results = {data: req.results};
  console.log("sendJSON::results =", results);
  await res.json(results);
  console.log("done sending JSON");
}

const writeSQL = async function(req, res, next) {
  const platforms = req.body;
  console.log("writeSQL::platforms =", platforms);

  let sql = 
`SELECT COUNT(*)
FROM games as g
JOIN platform as p ON g.app_id = p.app_id 
WHERE 
  `;

  const conditions = [];
  for (let platform in platforms) {
    if (platform == "windows" && platforms[platform]["include"]) {
      conditions.push("p.windows LIKE " + (platforms[platform]["available"] ? `"true"` : `"false"`));
    }
    else if (platform == "mac" && platforms[platform]["include"]) {
      conditions.push("p.mac LIKE " + (platforms[platform]["available"] ? `"true"` : `"false"`));
    }
    else if (platform == "linux" && platforms[platform]["include"]) {
      conditions.push("p.linux LIKE " + (platforms[platform]["available"] ? `"true"` : `"false"`));
    }
  }
  
  const end_i = conditions.length - 1;
  for (let i  = 0; i <= end_i; i++) {
    sql += conditions[i];

    if (i != end_i) {
      sql += " AND ";
    }
  }

  sql += ";";
  console.log(sql);

  fs.writeFile("db/sql/platform-reviews/write.sql", sql);
  res.status(200).json();
}

const sqlPath = function (req, res, next) {
  req.queryFilePath = "db/sql/platform-reviews/write.sql";
  next();
}

const prepareData = function (req, res, next) {
  req.aggData = {
    windows: undefined,
    mac: undefined,
    linux: undefined,
  }
  next();
}

function selectPlatformForSQL(platform) {
  const queries = {
    windows:
`SELECT g.name
FROM games as g
JOIN platform as p ON g.app_id = p.app_id 
WHERE p.windows LIKE "true";
  `,
    mac:
`SELECT g.name
FROM games as g
JOIN platform as p ON g.app_id = p.app_id 
WHERE p.mac LIKE "true";
  `,
    linux:
`SELECT g.name
FROM games as g
JOIN platform as p ON g.app_id = p.app_id 
WHERE p.linux LIKE "true";
  `,
  }

  return queries[platform];
}

const queryWindows = function (req, res, next) {
  req.query = selectPlatformForSQL("windows");
  next();
}

const queryMac = function (req, res, next) {
  req.query = selectPlatformForSQL("mac");
  next();
}

const queryLinux = function (req, res, next) {
  req.query = selectPlatformForSQL("linux");
  next();
}

router.post('/', writeSQL);
router.get('/', [sqlPath, getSQLFile, selectSQL, sendJSON]);
router.get('/all', [
  queryWindows, 
  selectSQL,
  (req, res, next) => {
    req.aggData.windows = req.results;
    next();
  },
  selectSQL,
  (req, res, next) => {
    req.aggData.mac = req.results;
    next();
  },
  selectSQL,
  (req, res, next) => {
    req.aggData.linux = req.results;
    next();
  },
  (req, res, next) => {
    req.results = req.aggData;
    next();
  },
  sendJSON
]);
  /*
  const macSQL = fs.readFileSync("db/sql/mac-query.sql");
  const linuxSQL = fs.readFileSync("db/sql/linux-query.sql");
  const winMacSQL = fs.readFileSync("db/sql/windows-mac-query.sql");
  const winLinuxSQL = fs.readFileSync("db/sql/windows-linux-query.sql");
  const macLinuxSQL = fs.readFileSync("db/sql/mac-linux-query.sql");
  const allPlatformSQL= fs.readFileSync("db/sql/base-query.sql");
  */

module.exports = router;
