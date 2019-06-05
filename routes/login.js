var express = require('express');
var router = express.Router();

var loginController = require('../controllers/login');

/**
 * Login Routes
 */

// GET login
router.get('/', loginController.login_get);

// POST login
router.post('/', loginController.login_post);

module.exports = router;