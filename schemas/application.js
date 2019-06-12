var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ApplicationSchema = new Schema({
  app_id: String,
  name: String,
  public_key: String,
  private_key: String,

  voice_answer_url: String,
  voice_answer_method: String,
  voice_answer_ncco: String,
  voice_event_url: String,
  voice_event_method: String
});

module.exports = ApplicationSchema;