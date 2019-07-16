const express = require('express');
const router = express.Router();

router.post('/jwt', (req, res) => {
  res.json({'jwt': 'json.web.token'});
});

module.exports = router;