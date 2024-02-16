var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors =require('cors');
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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
