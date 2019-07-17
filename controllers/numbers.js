const applicationModel = require('../models/application');

exports.numbers_get = (req, res) => {
  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app/setup');
    } else if (application === null) {
      res.redirect('/app/setup');
    } else {
      req.nexmo.getNumbers((err, result) => {
        const { numbers } = result;
        if (err) {
          req.flash('alert', err);
          res.redirect('/app');
        } else {
          res.render('numbers', { 
            title: 'Numbers', 
            app: application,
            numbers: numbers
          });
        }
      });
    }
  });
}

exports.number_add_get = (req, res) => {
  const { country, msisdn } = req.params;

  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app/setup');
    } else if (application === null) {
      res.redirect('/app/setup');
    } else {
      req.nexmo.linkNumber(country, msisdn, application.app_id, (err) => {
        if (err) {
          req.flash('alert', err);
          res.redirect('/app');
        } else {
          application.number_msisdn = msisdn;
          application.number_country = country;
          application.save((err) => {
            if (err) {
              req.flash('alert', err);
              res.redirect('/numbers');
            } else {
              req.flash('info', ` ${msisdn} was successfully assigned to the app.`);
              res.redirect('/numbers');
            }
          });
        }
      });
    }
  });
};

exports.number_remove_get = (req, res) => {
  const { country, msisdn } = req.params;

  applicationModel.findOne({}, (err, application) => {
    if (err) {
      req.flash('alert', err);
      res.redirect('/app/setup');
    } else if (application === null) {
      res.redirect('/app/setup');
    } else {
      req.nexmo.unlinkNumber(country, msisdn, (err) => {
        if (err) {
          req.flash('alert', err);
          res.redirect('/app')
        } else {
          application.number_msisdn = '';
          application.number_country = '';
          application.save((err) => {
            if (err) {
              req.flash('alert', err);
              res.redirect('/numbers');
            } else {
              req.flash('info', ` ${msisdn} was successfully removed from the app.`);
              res.redirect('/numbers');
            }
          });
        }
      });
    }
  });
};

exports.numbers_search_post = (req, res) => {
  const { country } = req.body;

  req.nexmo.searchNumbers(country, (err, result) => {
    const { numbers } = result;
    if (err) {
      req.flash('alert', err);
      res.redirect('/numbers');
    } else {
      res.render('numbers_search', { title: 'Numbers', numbers: numbers, country: country });
    }
  });
}

exports.numbers_buy_post = (req, res) => {
  const { country, msisdn } = req.body;

  req.nexmo.buyNumber(country, msisdn, (err) => {
    if (err) {
      req.flash('alert', err);
    } else {
      req.flash('info', ` ${msisdn} was successfully purchased.`);
    }
    res.redirect('/numbers');
  });
}