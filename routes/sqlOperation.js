const DB = require('../db/mysql-DB');
const fs = require('fs/promises');


const getSQLFile = async function(req, res, next) {
  console.log("getSQLFile");
  let file;
  let path = req.queryFilePath;

  console.log("getSQLFile::path =", path);

  try {
    file = await fs.readFile(path, {encoding: "utf8"});
    req.query = file;
    next();
  } 
  catch (error) {
    console.log(error);
    next(error); 
  } 
}

const selectSQL = (req, res, next) => {
  console.log("selectSQL");
  const query = req.query;

  const db = new DB();
  
  db.con.connect(function(err) {
    if (err) {
      console.log("sqlConnect.js: ", err);
      next(err);
    }

    db.con.query(query, function(err, results, fields) {
      if (err) {
        console.log("sqlConnect.js::db.con.query(): ", err);
        next(err);
      }

      req.results = results;
      next();
    })
  });
}

module.exports = { selectSQL, getSQLFile };
