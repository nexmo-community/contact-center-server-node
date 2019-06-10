var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ApplicationSchema = new Schema({
  id: String,
  name: String,
  key: String,
  private: String
});

module.exports = ApplicationSchema;