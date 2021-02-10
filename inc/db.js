const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'saboroso',
  user: 'root',
  password: 'root'
});

module.exports = connection;