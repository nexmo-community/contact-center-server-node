const express = require('express');
const router = express.Router();

const setupController = require('../controllers/setup');

/**
 * Setup Routes
 */

// GET app setup
router.get('/', setupController.app_setup_get);

// POST app setup
router.post('/', setupController.app_setup_post);

module.exports = router;