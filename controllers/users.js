const userModel = require('../models/user');

exports.users_get = (req, res) => {
  userModel.find({}, (err, users) => {
    res.render('users', { title: 'Users', users: users });
  });
}

exports.users_new_get = (req, res) => {
  res.render('users_new', { title: 'New User' });
}

exports.users_new_post = (req, res) => {
  const { username } = req.body;
  
  req.nexmo.createUser(username, (err, result) => {
    if (err) {
      console.log(err);
      req.flash('alert', err);
      res.redirect('/users');
    } else {
      const user = new userModel({
        user_id: result.id,
        href: result.href,
        username: username
      });

      user.save((err) => {
        if (err) {
          console.log(err);
          req.flash('alert', err);
          res.redirect('/users');
        } else {
          req.flash('info', `User ${username} was successfully created.`)
          res.redirect('/users');
        }
      });
    };      
  })
}