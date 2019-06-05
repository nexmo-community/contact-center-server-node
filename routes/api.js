var express = require('express');
var router = express.Router();

router.post('/jwt', function(req, res) {
  res.json({'jwt': 'json.web.token'});
});

module.exports = router;