const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event');

/**
 * App Event Routes
 */

// GET events
router.get('/', eventController.app_events_get);

module.exports = router;