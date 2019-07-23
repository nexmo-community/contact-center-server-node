const mongoose = require('mongoose');
const EventSchema = require('../schemas/event');

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;