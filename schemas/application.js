const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  app_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  public_key: {
    type: String,
    required: true
  },
  private_key: {
    type: String,
    required: true
  },
  number_msisdn: String,
  number_country: String,
  type: {
    type: String,
    required: true,
    enum: ['custom', 'inbound_call', 'outbound_call', 'ivr']
  },
  voice_answer_url: {
    type: String,
    required: true
  },
  voice_answer_method: {
    type: String,
    required: true
  },
  voice_answer_ncco: {
    type: String,
  },
  voice_event_url: {
    type: String,
    required: true
  },
  voice_event_method: {
    type: String,
    required: true
  },
  dtmf_url: {
    type: String,
    required: true
  }
});

module.exports = ApplicationSchema;