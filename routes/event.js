const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event');

/**
 * App Event Routes
 */

// GET events voice
router.get('/voice', eventController.app_events_voice_get);

// GET events rtc
router.get('/rtc', eventController.app_events_rtc_get);

module.exports = router;