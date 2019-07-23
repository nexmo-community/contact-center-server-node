const express = require('express');
const router = express.Router();

const webhooksController = require('../controllers/webhooks');

/**
 * Webhooks Routes
 */

// GET webhooks answer
router.get('/answer', webhooksController.webhooks_answer_get);

// POST webhooks event
router.post('/event', webhooksController.webhooks_event_post);

// POST webhooks dtmf
router.post('/dtmf', webhooksController.webhooks_dtmf_post);

module.exports = router;