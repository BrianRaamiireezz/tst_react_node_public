// Core
const mysql = require('mysql2');

// Util
const dotenv = require('dotenv');

// Init
dotenv.config();

// Conectar DB
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'nomina'
});

db.connect(function (error) {
  if (error) {
    console.error('error: ' + error.message);
  }
  else {
    console.log('Conectado al servidor MySQL');
  }
});

module.exports = db;