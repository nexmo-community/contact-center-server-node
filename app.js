var auth = require('./util/auth');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var flash = require('express-flash');
var hbs = require('express-handlebars');
var logger = require('morgan');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
require('dotenv').config();

var apiRouter = require('./routes/api');
var appRouter = require('./routes/app');
var numbersRouter = require('./routes/numbers');
var eventRouter = require('./routes/event');
var indexRouter = require('./routes/index');
var setupRouter = require('./routes/setup');
var webhooksRouter = require('./routes/webhooks');

/**
 * Express Setup
 */
var app = express();

/**
 * Template engine setup
 */
app.engine('hbs', hbs({ 
  extname: 'hbs', 
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    lowercase: (str) => {
      if(str && typeof str === 'string') {
        return str.toLowerCase();
      }
      return '';
    },
    ifeq: (a, b, opts) => {
      if (a === b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    },
    ifneq: (a, b, opts) => {
      if (a !== b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    },
    json: (object) => {
      return JSON.stringify(object, null, 2);
    }
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Session Setup
 */
var sess = {
  secret: process.env.SESSION_SECRET || 'yoursecrethere',
  cookie: { maxAge: 60000 },
  proxy: true,
  resave: true,
  saveUninitialized: true
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
 
app.use(session(sess));

/**
 * Middleware
 */
app.use(auth());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(flash());

/**
 * Static public content
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * App Routes
 */
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/app', auth.secure(), appRouter);
app.use('/numbers', auth.secure(), numbersRouter);
app.use('/app/events', auth.secure(), eventRouter);
app.use('/app/setup', auth.secure(), setupRouter);
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