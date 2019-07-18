require('dotenv').config();
const NexmoApi = require('nexmo');

const applicationModel = require('../models/application');

function Nexmo(apiKey, apiSecret, options) {
  applicationModel.findOne({}, (err, application) => {
    let params = {};
    if (application) {
      params = {
        apiKey: apiKey,
        apiSecret: apiSecret,
        applicationId: application.app_id,
        privateKey: application.private_key
      };
    } else {
      params = {
        apiKey: apiKey,
        apiSecret: apiSecret
      };
    }

    this.nexmo = new NexmoApi(params, options);
  });
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

Nexmo.prototype.searchNumbers = function searchNumbers(countryCode, callback) {
  return this.nexmo.number.search(countryCode, { 
    features: 'VOICE', 
    size: 100
  }, callback);
}

Nexmo.prototype.buyNumber = function buyNumber(countryCode, msisdn, callback) {
  return this.nexmo.number.buy(countryCode, msisdn, callback);
}

Nexmo.prototype.createUser = function createUser(username, callback) {
  return this.nexmo.users.create({
    name: username,
    display_name: username
  }, callback);
}

module.exports = Nexmo;