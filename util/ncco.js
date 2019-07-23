const dtmfOptions = {
  jane: [
    {
      "action": "talk",
      "text": "Please wait while we connect you to Jane"
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
  joe: [
    {
      "action": "talk",
      "text": "Please wait while we connect you to Joe"
    },
    {
      "action": "connect",
      "endpoint": [
        {
          "type": "app",
          "user": "Joe"
        }
      ]
    }
  ]
};

module.exports = (req, application, body) => {
    if (typeof body === 'string') {
      if (dtmfOptions[body] != undefined) {
        body = dtmfOptions[body];
      }
    }

    if (body === undefined || body === null) {
      body = application.ncco;
    }

    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }

    if (body.indexOf('PARAMS_TO') !== -1) {
      body = body.replace(/PARAMS_TO/g, req.query.to);
    }

    if (body.indexOf('YOUR_NEXMO_NUMBER') !== -1) {
      body = body.replace(/YOUR_NEXMO_NUMBER/g, application.number_msisdn);
    }

    return JSON.parse(body);
};