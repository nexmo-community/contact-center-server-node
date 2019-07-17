const express = require('express');
const router = express.Router();

const numbersController = require('../controllers/numbers');

/**
 * Numbers Routes
 */

// GET numbers
router.get('/', numbersController.numbers_get);

// GET add number
router.get('/add/:country/:msisdn', numbersController.number_add_get);

// GET remove number
router.get('/remove/:country/:msisdn', numbersController.number_remove_get);

// POST numbers search
router.post('/search', numbersController.numbers_search_post);

// POST numbers buy
router.post('/buy', numbersController.numbers_buy_post);

module.exports = router;