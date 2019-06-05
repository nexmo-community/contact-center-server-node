var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var apiRouter = require('./routes/api');
var appRouter = require('./routes/app');
var eventRouter = require('./routes/event');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var setupRouter = require('./routes/setup');
var webhooksRouter = require('./routes/webhooks');

/**
 * Express Setup
 */
var app = express();

/**
 * Template engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Middleware
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * App Routes
 */
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/app', appRouter);
app.use('/app/events', eventRouter);
app.use('/app/setup', setupRouter);
app.use('/login', loginRouter);
app.use('/webhooks', webhooksRouter);

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;