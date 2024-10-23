var express = require('express');
var router = express.Router();
var DB = require('../db/mysql-DB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/result', function(req, res, next) {
  var db = new DB(); 
  db.con.connect(err => {
    if (err) {
      res.render('error', { error: err })
      return;
    }
    
    db.con.query(`
      SELECT g.name, CASE WHEN p.windows LIKE "true" AND
                   p.mac LIKE "true" AND
                   p.linux LIKE "true" THEN "true"
               END AS 'All platforms?'
      FROM games as g
      JOIN platform as p ON g.app_id = p.app_id
      WHERE p.windows LIKE "true" AND
          p.mac LIKE "true" AND
            p.linux LIKE "true"
      LIMIT 100;
      `, 
      (err, result, fields) => {
        if (err) {
          res.render('error', { error: err });
          return;
        }

        console.log(result);
        console.log(fields);
        res.render('index', { title: `MySQL Results`, result: result });
      })

  })

});

module.exports = router;
