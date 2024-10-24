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

const sqlPath = function(req, res, next) {
  console.log("sqlPath::req.param =", req.params.platforms);

  let platforms = req.params.platforms;

  if (!platforms || platforms == "") {
    return;
  }
  if (platforms == "windows-mac-linux") {
    platforms = "base";
  }

  req.queryFilePath = "db/sql/platform-reviews/" + platforms + "-query.sql";
  console.log("sqlpath::platforms =", platforms);
  console.log("sqlpath::req.queryfilepath =", req.queryFilePath);
  
  next();
};


router.get('/:platforms', [sqlPath, getSQLFile, selectSQL, sendJSON]);
  /*
  const macSQL = fs.readFileSync("db/sql/mac-query.sql");
  const linuxSQL = fs.readFileSync("db/sql/linux-query.sql");
  const winMacSQL = fs.readFileSync("db/sql/windows-mac-query.sql");
  const winLinuxSQL = fs.readFileSync("db/sql/windows-linux-query.sql");
  const macLinuxSQL = fs.readFileSync("db/sql/mac-linux-query.sql");
  const allPlatformSQL= fs.readFileSync("db/sql/base-query.sql");
  */

module.exports = router;
