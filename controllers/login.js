exports.login_get = function(req, res) {
  res.render('login', { title: 'Login' });
}

exports.login_post = function(req, res) {
  res.redirect('/app');
}