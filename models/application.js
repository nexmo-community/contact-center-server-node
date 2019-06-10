var mongoose = require('mongoose');
var ApplicationSchema = require('../schemas/application');
var Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;