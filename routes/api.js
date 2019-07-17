const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api');

/**
 * Api Routes
 */

// GET api
router.get('/', apiController.api_get);

module.exports = router;