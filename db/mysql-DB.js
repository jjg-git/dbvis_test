var mysql = require('mysql');

class DB {
  constructor(host, user, password) {
    this.con = mysql.createConnection({
      host: host,
      user: user,
      password: password
    });
  }
}

module.exports = DB;

