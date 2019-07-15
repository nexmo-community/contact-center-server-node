const Nexmo = require('./nexmo');

function auth() {
  return function auth (req, res, next) {
    if (typeof req.session.apiKey !== 'undefined' || typeof req.session.apiSecret !== 'undefined') {
      const nexmo = new Nexmo(req.session.apiKey, req.session.apiSecret);
      nexmo.apps({}, (err, apps) => {
        if (err || typeof apps !== 'object') {
          req.session.destroy();
        }
      });

      req.nexmo = nexmo;

      if (typeof req.session.balance === 'undefined') {
        nexmo.balance((err, balance) => {
          if (err) {
          }
          if (balance) {
            req.session.balance = balance.value;
          }
        })
      }
    }

    next();
  }
}

function secure() {
  return function secure (req, res, next) {
    if (typeof req.nexmo !== 'object') {
      res.redirect('/login');
    } else {
      next();
    }
  }
}

module.exports = auth;
module.exports.secure = secure;