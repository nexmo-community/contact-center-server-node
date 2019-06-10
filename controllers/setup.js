var applicationModel = require('../models/application');

exports.app_setup_get = function(req, res) {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app');
    } else if (application === null) {
      res.render('setup', { title: 'Setup' });
    } else {
      res.redirect('/app');
    }
  });
}

exports.app_setup_post = function(req, res) {
  const { app_name } = req.body;

  applicationModel.findOne((err, application) => {
    if (err) {
      req.flash('alert', err);
    } else if (application !== null) {
      res.redirect('/app')
    } else if (typeof app_name === 'undefined' || app_name === '') {
      req.flash('alert', 'Application name is required.');
      res.render('setup', { title: 'Setup' });
    } else {
      const appUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const answerUrl = `${appUrl}/webhooks/answer`;
      const eventUrl = `${appUrl}/webhooks/event/voice`;
  
      req.nexmo.createApp(app_name, 'voice', answerUrl, eventUrl, {}, (err, response) => {
        if (err) {
          req.flash('alert', err);
          res.redirect('/app')
        } else {
          var application = new applicationModel({
            id: response.id,
            name: response.name,
            key: response.keys.public_key,
            private: response.keys.private_key
          });
  
          application.save(function(err) {
            if (err) {
              req.flash('alert', err);
              res.redirect('/app')
            } else {
              req.flash('info', 'Nexmo app was successfully created.')
              res.redirect('/app');
            }
          });
        }
      });
    }
  });
}