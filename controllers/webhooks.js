const applicationModel = require('../models/application');
const eventModel = require('../models/event');
const ncco = require('../util/ncco');

exports.webhooks_answer_get = (req, res) => {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      res.json({'error': 'An error occured.'});
    } else if (application === null) {
      res.json({'error': 'No application configured.'});
    } else {
      res.json(ncco(req, application));
    }
  });
}

exports.webhooks_event_post = (req, res) => {
  const event = new eventModel({
    type: 'voice',
    body: req.body
  });

  event.save((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
}

exports.webhooks_dtmf_post = (req, res) => {
  const { dtmf } = req.body;

  applicationModel.findOne({}, (err, application) => {
    if (err) {
      res.json({'error': 'An error occured.'});
    } else if (application === null) {
      res.json({'error': 'No application configured.'});
    } else {
      if (dtmf == 1) {
        res.json(ncco(req, application, 'jane'));
      } else if (dtmf == 2) {
        res.json(ncco(req, application, 'joe'));
      } else {
        res.sendStatus(400);
      }
    }
  });
}