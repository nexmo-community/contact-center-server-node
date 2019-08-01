const auth = require('./util/auth');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const flash = require('express-flash');
const hbs = require('express-handlebars');
const helpers = require('./util/helpers');
const logger = require('morgan');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
require('dotenv').config();

const apiRouter = require('./routes/api');
const appRouter = require('./routes/app');
const eventRouter = require('./routes/event');
const indexRouter = require('./routes/index');
const numbersRouter = require('./routes/numbers');
const setupRouter = require('./routes/setup');
const usersRouter = require('./routes/users');
const webhooksRouter = require('./routes/webhooks');

/**
 * Express Setup
 */
const app = express();

/**
 * Template engine setup
 */
app.engine('hbs', hbs({ 
  extname: 'hbs', 
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: helpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Session Setup
 */
const sess = {
  secret: process.env.SESSION_SECRET || 'yoursecrethere',
  cookie: { maxAge: 60000 },
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
app.set('json spaces', 2);

/**
 * Static public content
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * App Routes
 */
app.use('/', indexRouter);
app.use('/webhooks', webhooksRouter);

app.use('/api', apiRouter);
app.use('/app', auth.secure(), appRouter);
app.use('/events', auth.secure(), eventRouter);
app.use('/app/setup', auth.secure(), setupRouter);
app.use('/numbers', auth.secure(), numbersRouter);
app.use('/users', auth.secure(), usersRouter);

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  next(createError(404));
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;