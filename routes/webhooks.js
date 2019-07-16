var express = require('express');
var router = express.Router();

var webhooksController = require('../controllers/webhooks');

/**
 * Webhooks Routes
 */

// GET webhooks answer
router.get('/answer', webhooksController.webhooks_answer_get);

// POST webhooks event
router.post('/event', webhooksController.webhooks_event_post);

// GET webhooks dtmf
router.get('/dtmf', webhooksController.webhooks_dtmf_get);

module.exports = router;