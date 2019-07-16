const mongoose = require('mongoose');
const ApplicationSchema = require('../schemas/application');

ApplicationSchema
  .virtual('ncco')
  .get(function () {
    const nccos = {
      'custom': JSON.parse(this.voice_answer_ncco || []),
      'inbound_call': [
        {
          "action": "talk",
          "text": "Welcome. Please wait while we connect you..."
        },
        {
          "action": "connect",
          "endpoint": [
            {
              "type": "app",
              "user": "Jane"
            }
          ]
        }
      ],
      'outbound_call': [
        {
          "action": "talk",
          "text": "Please wait while we connect you."
        },
        {
          "action": "connect",
          "timeout": 20,
          "from": "YOUR_NEXMO_NUMBER",
          "endpoint": [
            {
              "type": "phone",
              "number": "PARAMS_TO"
            }
          ]
        }
      ],
      'ivr': [
        {
          "action": "talk",
          "text": "Welcome. To connect to the right person, please select one of the following options.",
          "voiceName": "Amy",
          "bargeIn": false
        },
        {
          "action": "talk",
          "text": "Press 1 for Jane, or 2 for Joe, followed by the hash key.",
          "voiceName": "Amy",
          "bargeIn": true
        },
        {
          "action": "input",
          "eventUrl": [this.dtmf_url],
          "timeout": "45"
        }
      ]
    };

    let ncco = JSON.stringify(nccos[this.type]);

    if (this.number_msisdn) {
      ncco = ncco.replace(/YOUR_NEXMO_NUMBER/g, this.number_msisdn);
    }
    //ncco.replace(/PARAMS_TO/g, "bar")

    return JSON.parse(ncco);
  });

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;