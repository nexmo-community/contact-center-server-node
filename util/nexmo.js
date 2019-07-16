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

Nexmo.prototype.balance = function balance(callback) {
  return this.nexmo.account.checkBalance(callback);
};

Nexmo.prototype.getNumbers = function getNumbers(callback) {
  return this.nexmo.number.get({}, callback);
};

Nexmo.prototype.linkNumber = function linkNumber(countryCode, msisdn, app_id, callback) {
  return this.nexmo.number.update(countryCode, msisdn, {
    voiceCallbackType: 'app',
    voiceCallbackValue: app_id
  }, callback);
}

Nexmo.prototype.unlinkNumber = function unlinkNumber(countryCode, msisdn, callback) {
  return this.nexmo.number.update(countryCode, msisdn, {
    voiceCallbackType: 'app'
  }, callback);
}

module.exports = Nexmo;