var express = require('express');
var router = express.Router();

router.post('/answer', function(req, res) {
  res.json({});
});

router.post('/event/voice', function(req, res) {
  res.json({});
});

router.post('/event/rtc', function(req, res) {
  res.json({});
});

module.exports = router;