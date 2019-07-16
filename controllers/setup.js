const applicationModel = require('../models/application');

exports.app_setup_get = (req, res) => {
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

exports.app_setup_post = (req, res) => {
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
      const appUrl = `${req.protocol}://${req.get('host')}`;
      const answerUrl = `${appUrl}/webhooks/answer`;
      const eventUrl = `${appUrl}/webhooks/event`;
      const dtmfUrl = `${appUrl}/webhooks/dtmf`;
  
      req.nexmo.createApp(app_name, 'voice', answerUrl, eventUrl, {}, (err, response) => {
        if (err) {
          req.flash('alert', err);
          res.redirect('/app')
        } else {
          const application = new applicationModel({
            app_id: response.id,
            name: response.name,
            public_key: response.keys.public_key,
            private_key: response.keys.private_key,
            number_msisdn: '',
            number_country: '',
            type: 'custom',

            voice_answer_url: answerUrl,
            voice_answer_method: 'GET',
            voice_answer_ncco: '',
            voice_event_url: eventUrl,
            voice_event_method: 'POST',
            dtmf_url: dtmfUrl
          });
  
          application.save((err) => {
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