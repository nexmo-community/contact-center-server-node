require('dotenv').config();
const Nexmo = require('nexmo');

exports.default = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY 
}, {debug: true});