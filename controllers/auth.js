const Nexmo = require('../util/nexmo');

exports.login_get = function(req, res) {
  if (typeof req.nexmo === 'object') {
    res.redirect('/app');
  } else {
    res.render('login', { title: 'Login', layout: 'login' });
  }
}

exports.login_post = function(req, res) {
  const { api_key, api_secret } = req.body;

  if (typeof api_key === 'undefined' || typeof api_secret === 'undefined') {
    req.flash('alert', 'Api credentials are invalid...');
    res.redirect('/login');
  } else {
    const nexmo = new Nexmo(api_key, api_secret);
    nexmo.apps({}, (err, apps) => {
      if (err) {
        req.flash('alert', err);
        res.redirect('/login');
      } else if (typeof apps !== 'object') {
        req.flash('alert', 'Api credentials are invalid.');
        res.redirect('/login');
      } else {
        req.session.apiKey = api_key;
        req.session.apiSecret = api_secret;
        req.session.save();
        res.redirect('/app');
      }
    });
  }
}

exports.logout_get = function(req, res) {
  req.session.destroy();
  res.redirect('/');
}