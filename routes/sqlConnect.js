const DB = require('../db/mysql-DB');
const db = new DB();

const selectSQL = (req, res, next) => {
  const query = req.locals.query;
  
  db.con.connect(function(err) {
    if (err) {
      console.log("sqlConnect.js: ", err);
      next(err);
    }

    db.con.query(query, function(err, results, fields) {
      if (err) {
        console.log("sqlConnect.js::db.con.query(): ", err);
      }
      next(err);

      req.locals.results = results;
    })
  });
}

module.exports = selectSQL;
