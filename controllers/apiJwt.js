const userModel = require('../models/user');
const applicationModel = require('../models/application');
const NexmoApi = require('nexmo');

exports.api_jwt_post = (req, res) => {
  const { user_name, mobile_api_key } = req.body;
  let { expires_at } = req.body;

  if (typeof expires_at === 'undefined') {
    expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 1);
  } else {
    expires_at = new Date(expires_at);
  }

  if (typeof user_name !== 'string') {
    res.sendStatus(400);
  }

  if (typeof mobile_api_key !== 'string') {
    res.sendStatus(401);
  }

  userModel.findOne({username: user_name}, (err, user) => {
    if (err) {
      res.sendStatus(400);
    } else {
      applicationModel.findOne({}, (err, application) => {
        if (err) {
          res.sendStatus(400);
        } else {
          const aclPaths = {
            "paths": {
              "/*/users/**": {},
              "/*/conversations/**": {},
              "/*/sessions/**": {},
              "/*/devices/**": {},
              "/*/image/**": {},
              "/*/media/**": {},
              "/*/applications/**": {},
              "/*/push/**": {},
              "/*/knocking/**": {}
            }
          };

          const jwt = NexmoApi.generateJwt(Buffer.from(application.private_key, 'utf8'), {
            application_id: application.app_id,
            sub: user.username,
            exp: Math.round(expires_at/1000),
            acl: aclPaths
          });

          res.json({
            user_id: user.user_id,
            user_name: user.username,
            jwt: jwt,
            expires_at: expires_at
          });
        }
      });
    }
  });
}