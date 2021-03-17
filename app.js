var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

var indexRouter = require('./routes/users');

var app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;