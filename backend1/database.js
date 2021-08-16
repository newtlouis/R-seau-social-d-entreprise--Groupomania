const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
  });

// Connexion à la BDD
db.connect(function(err) {

    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  
  });
  
  module.exports = db;