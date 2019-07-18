exports.users_get = (req, res) => {
  const users = [];

  res.render('users', { title: 'Users', users: users });
}

exports.users_new_get = (req, res) => {
  res.render('users_new', { title: 'New User' });
}

exports.users_new_post = (req, res) => {
  const { username } = req.body;
  
  req.nexmo.createUser(username, (err, user) => {
    console.log(user);
    if (err) {
      req.flash('alert', err);
    } else {
      req.flash('info', ` ${username} was successfully created.`);
    }
  });

  res.redirect('/users');
}