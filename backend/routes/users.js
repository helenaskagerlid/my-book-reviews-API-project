var express = require('express');
var router = express.Router();
const connection = require('../lib/conn');

// add new user
router.post('/', (req, res) => {
  const { userName, userPassword, userEmail } = req.body;

  const addUserQuery = 'INSERT INTO users (userName, userPassword, userEmail) VALUES (?, ?, ?)';
  const values = [userName, userPassword, userEmail];

  connection.query(addUserQuery, values, (err, results) => {
    if (err) {
      console.error('Error adding user to database:', err);
      res.status(500).json({ message: 'Error adding user to database' });
    } else {
      console.log('User added to database');
      res.status(201).json({ message: 'User added to database' });
    }
  });
});

// login user
router.post('/login', (req, res) => {
  const { userName, userPassword } = req.body;

  connection.query('SELECT * FROM users WHERE userName = ? AND userPassword = ?', [userName, userPassword], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username and/or password' });
    }
  });
});

module.exports = router;
