module.exports = (req, application, body) => {
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