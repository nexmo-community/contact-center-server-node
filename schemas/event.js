const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  body: {
    type: Object,
    required: true
  }
});

module.exports = EventSchema;