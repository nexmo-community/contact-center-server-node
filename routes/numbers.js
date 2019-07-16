var express = require('express');
var router = express.Router();

var numbersController = require('../controllers/numbers');

/**
 * Numbers Routes
 */

// GET numbers
router.get('/', numbersController.numbers_get);

// POST numbers
router.post('/search', numbersController.numbers_search_post);

module.exports = router;