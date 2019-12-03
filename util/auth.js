const Nexmo = require('./nexmo');

const applicationModel = require('../models/application');

const auth = () => {
  return async (req, res, next) => {
    if (typeof req.session.apiKey !== 'undefined' || typeof req.session.apiSecret !== 'undefined') {
      applicationModel.findOne({}, (err, application) => {
        if (err) {
          console.log(err);
          req.flash('alert', err);
          req.redirect('/');
        }

        const nexmo = new Nexmo(req.session.apiKey, req.session.apiSecret, application);

        nexmo.apps({}, (err, apps) => {
          if (err || typeof apps !== 'object') {
            req.session.destroy();
          }
          next();
        });
  
        req.nexmo = nexmo;
      })
    } else {
      next();
    }
  }
}

const secure = () => {
  return (req, res, next) => {
    if (typeof req.nexmo !== 'object') {
      res.redirect('/login');
    } else {
      next();
    }
  }
}

module.exports = auth;
module.exports.secure = secure;