var applicationModel = require('../models/application');

exports.webhooks_answer_get = function(req, res) {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      res.json({'error': 'An error occured.'});
    } else if (application === null) {
      res.json({'error': 'No application configured.'});
    } else {
      res.json(application.ncco);
    }
  });
}

exports.webhooks_event_post = (req, res) => {
  res.json([]);
}

exports.webhooks_dtmf_get = (req, res) => {
  res.json([]);
}