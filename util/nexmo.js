require('dotenv').config();
const NexmoApi = require('nexmo');

function Nexmo(apiKey, apiSecret, options) {
  this.nexmo = new NexmoApi({
    apiKey: apiKey,
    apiSecret: apiSecret
  }, options);
}

Nexmo.prototype.apps = function apps(options, callback) {
  return this.nexmo.applications.get(options, callback)
};

module.exports = Nexmo;