require('dotenv').config();
const NexmoApi = require('nexmo');

const Nexmo = class {

  constructor(apiKey, apiSecret, application, options) {
    if (application) {
      this.nexmo = new NexmoApi({
        apiKey: apiKey,
        apiSecret: apiSecret,
        applicationId: application.app_id,
        privateKey: application.private_key
      }, options);
    } else {
      this.nexmo = new NexmoApi({
        apiKey: apiKey,
        apiSecret: apiSecret
      }, options);
    }
  }

  apps(options, callback) {
    return this.nexmo.applications.get(options, callback);
  };

  createApp(name, type, answerUrl, eventUrl, options, callback) {
    return this.nexmo.applications.create(name, type, answerUrl, eventUrl, options, callback);
  };

  balance(callback) {
    return this.nexmo.account.checkBalance(callback);
  };

  getNumbers(callback) {
    return this.nexmo.number.get({}, callback);
  };

  linkNumber(countryCode, msisdn, app_id, callback) {
    return this.nexmo.number.update(countryCode, msisdn, {
      voiceCallbackType: 'app',
      voiceCallbackValue: app_id
    }, callback);
  }

  unlinkNumber(countryCode, msisdn, callback) {
    return this.nexmo.number.update(countryCode, msisdn, {
      voiceCallbackType: 'app'
    }, callback);
  }

  searchNumbers(countryCode, callback) {
    return this.nexmo.number.search(countryCode, { 
      features: 'VOICE', 
      size: 100
    }, callback);
  }

  buyNumber(countryCode, msisdn, callback) {
    return this.nexmo.number.buy(countryCode, msisdn, callback);
  }

  createUser(username, callback) {
    return this.nexmo.users.create({
      name: username,
      display_name: username
    }, callback);
  }
}

module.exports = Nexmo;