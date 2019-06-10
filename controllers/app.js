var applicationModel = require('../models/application');

exports.app_get = function(req, res) {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app/setup');
    } else if (application === null) {
      res.redirect('/app/setup');
    } else {
      res.render('index', { title: '' });
    }
  });
}

exports.app_reset_get = function(req, res) {
  applicationModel.deleteMany({}, (err) => {
    if (err) {
      req.flash('alert', err);
    }

    res.redirect('/app');
  });
}

exports.app_edit_get = function(req, res) {
  res.render('index', { title: '' });
}

exports.app_users_get = function(req, res) {
  res.render('index', { title: '' });
}

exports.app_number_get = function(req, res) {
  res.render('index', { title: '' });
}