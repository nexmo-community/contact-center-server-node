exports.index = function(req, res) {
  if (typeof req.session.api_key === 'undefined' || typeof req.session.api_key === 'undefined') {
    res.redirect('/login');
  }

  res.redirect('/app');
};