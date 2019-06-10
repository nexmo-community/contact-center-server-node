require('dotenv').config();
const NexmoApi = require('nexmo');

function Nexmo(apiKey, apiSecret, options) {
  this.nexmo = new NexmoApi({
    apiKey: apiKey,
    apiSecret: apiSecret
  }, options);
}

Nexmo.prototype.apps = function apps(options, callback) {
  return this.nexmo.applications.get(options, callback);
};

Nexmo.prototype.createApp = function createApp(name, type, answerUrl, eventUrl, options, callback) {
  return this.nexmo.applications.create(name, type, answerUrl, eventUrl, options, callback);
};

// Nexmo.prototype.balance = function apps(callback) {
//   return this.nexmo.account.checkBalance(callback);
// };



module.exports = Nexmo;