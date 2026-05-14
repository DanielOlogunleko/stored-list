require('dotenv').config();
const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const mongoUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017';
const mongoDbName = process.env.MONGODB_DB || 'stored_list';

mongoose.connect(mongoUrl, {
  dbName: mongoDbName,
})
  .then(async function() {
    console.log('Connected to MongoDB!');

    const Items = require('./models/items');
    const count = await Items.countDocuments();

    if (count === 0) {
      await Items.insertMany([
        { text: 'Write one thing you are grateful for today.' },
        { text: 'Take a deep breath and keep moving forward.' },
        { text: 'Do one small thing that makes your day better.' },
        { text: 'Remember that progress is better than perfection.' },
        { text: 'Share a smile with someone who needs it.' },
      ]);
      console.log('Seeded default stored list items.');
    }
  })
  .catch(function(error) {
    console.error('Error connecting to MongoDB.', error);
  });

module.exports = app;
