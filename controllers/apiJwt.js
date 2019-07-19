const userModel = require('../models/user');
const applicationModel = require('../models/application');
const NexmoApi = require('nexmo');

exports.api_jwt_post = (req, res) => {
  const { user_name, mobile_api_key, expires_at } = req.body;

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
              "/v1/users/**": {},
              "/v1/conversations/**": {},
              "/v1/sessions/**": {},
              "/v1/devices/**": {},
              "/v1/image/**": {},
              "/v3/media/**": {},
              "/v1/applications/**": {},
              "/v1/push/**": {},
              "/v1/knocking/**": {}
            }
          };

          const jwt = NexmoApi.generateJwt(Buffer.from(application.private_key, 'utf8'), {
            application_id: application.app_id,
            sub: user.username,
            exp: new Date(expires_at).getTime()/1000,
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