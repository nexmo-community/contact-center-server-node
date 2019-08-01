const eventModel = require('../models/event');

exports.app_events_get = (req, res) => {
  eventModel.find({
    type: 'voice',
  }, (err, events) => {
    res.render('events', { title: 'Events', events: events });
  }).sort({ "body.timestamp": -1 } );
}