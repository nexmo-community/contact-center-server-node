var express = require('express');
var router = express.Router();

var numbersController = require('../controllers/numbers');

/**
 * Numbers Routes
 */

// GET numbers
router.get('/numbers', numbersController.numbers_get);

module.exports = router;