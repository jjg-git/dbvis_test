var mysql = require('mysql');
require('dotenv').config();

class DB {
  constructor() {
    this.con = mysql.createConnection({
      host: process.env.HOSTNAME,
      user: process.env.USER,
      password: process.env.PASSWORD
    });
  }
}

module.exports = DB;

