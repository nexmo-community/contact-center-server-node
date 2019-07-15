var applicationModel = require('../models/application');
var stream = require('stream');

const downloadData = (res, fileData, fileName) => {
  var fileContents = Buffer.from(fileData, "base64");

  var readStream = new stream.PassThrough();
  readStream.end(fileContents);

  res.set('Content-disposition', 'attachment; filename=' + fileName);
  res.set('Content-Type', 'text/plain');

  readStream.pipe(res);
}

exports.app_get = function(req, res) {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app/setup');
    } else if (application === null) {
      res.redirect('/app/setup');
    } else {
      res.render('application', { 
        title: application.name, 
        application: application
      });
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

exports.app_download_private_key = function(req, res) {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      res.redirect('/app');
    } else {
      downloadData(res, application.private_key, 'private.key');
    }
  });
}

exports.app_download_public_key = function(req, res) {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      res.redirect('/app');
    } else {
      downloadData(res, application.public_key, 'public.key');
    }
  });
}

exports.app_edit_get = function(req, res) {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app');
    } else if (application === null) {
      res.redirect('/app');
    } else {
      res.render('edit_application', { 
        title: application.name, 
        application: application
      });
    }
  });
}

exports.app_edit_post = function(req, res) {
  const { voice_answer_ncco } = req.body;

  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app');
    } else if (application === null) {
      res.redirect('/app');
    } else {
      application.voice_answer_ncco = voice_answer_ncco;

      application.save(function(err) {
        if (err) {
          req.flash('alert', err);
          res.redirect('/app')
        } else {
          req.flash('info', 'Nexmo app was successfully updated.');
          res.redirect('/app');
        }
      });
    }
  });
}

exports.app_users_get = function(req, res) {
  res.render('index', { title: '' });
}

exports.app_number_get = function(req, res) {
  res.render('index', { title: '' });
}

exports.app_ncco = function(req, res) {
  const { type } = req.params;

  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app/setup');
    } else if (application === null) {
      res.redirect('/app/setup');
    } else {
      application.type = type;
      application.save((err) => {
        if (err) {
          req.flash('alert', err);
        } else {
          req.flash('info', `App NCCO type was successfully changed to ${type}.`);
        }
        
        res.redirect('/app');
      });
    }
  });
}