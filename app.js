require('dotenv').config();

// init server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

// create a Nexmo client
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY 
}, {debug: true});

// if you're using an existing app, you can provide its name and type as defaults here
var last_app_settings;

// the client calls this to create a new application and set it as the application for this client,
// passing the app name, type, answer URL, and event URL
app.post('/createApp', function(req, res) {
  last_app_settings = {
    name: req.body.app_name,
    type: req.body.app_type
  };
  nexmo.applications.create(
    req.body.app_name, 
    req.body.app_type, 
    req.body.answer_url, 
    req.body.event_url, 
    {}, 
    (error, response) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      }
      process.env.APP_ID = response.id;
      process.env.PRIVATE_KEY = response.keys.private_key;
      res.sendStatus(200);
    });
});

// the client calls this to update the answer and event URLs of the current application
app.post('/assignUrls', function(req, res) {
  if (last_app_settings) {
    nexmo.app.update(
      process.env.APP_ID,
      last_app_settings.name, 
      last_app_settings.type, 
      req.body.answer_url, 
      req.body.event_url, 
      {}, 
      function(error, response) {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        }
        res.sendStatus(200);
      });
  }
});

// the client calls this endpoint to request a JWT, passing it a username
app.post('/getJWT', function(req, res) {
  const jwt = nexmo.generateJwt({
    application_id: process.env.APP_ID,
    sub: req.body.name,
    exp: Math.round(new Date().getTime()/1000)+3600,
    acl: {
      "paths": {
        "/v1/users/**":{},
        "/v1/conversations/**":{},
        "/v1/sessions/**":{},
        "/v1/devices/**":{},
        "/v1/image/**":{},
        "/v3/media/**":{},
        "/v1/applications/**":{},
        "/v1/push/**":{},
        "/v1/knocking/**":{}
      }
    }
  });
  res.send({jwt: jwt});
});

// the client calls this endpoint to get a list of all users in the Nexmo application
app.get('/getUsers', function(req, res) {
  const users = nexmo.users.get({}, (err, response) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      let realUsers = response.filter(user => user.name.substring(0,4) !== 'NAM-');
      res.send({users: realUsers});
    }
  });
});

// the client calls this endpoint to create a new user in the Nexmo application,
// passing it a username and optional display name
app.post('/createUser', function(req, res) {
  nexmo.users.create({
    name: req.body.name,
    display_name: req.body.display_name || req.body.name
  },(err, response) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send({id: response.id});
    }
  });
});

// this endpoint "answers" an incoming call
app.get('/answer', function(req, res) {
  const ncco = [
    {
      action: 'talk',
      voiceName: 'Ivy',
      text: 'Thank you for calling, your lucky number is ' + parseInt(Math.random() * 100) + '. Goodbye.'
    }
  ];
  res.send(ncco);
});

// this endpoint is triggered by call events and will log data about them
app.post('/event', function(req, res) {
  console.log(req.body);
  res.status(204);
});

app.listen(process.env.PORT || '3000');