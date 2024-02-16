const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'notesHelena',
    password: 'notes2024!',
    database: 'noteshelena',
  });
 
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('Connected to database');
    }
  });

  module.exports = connection; 