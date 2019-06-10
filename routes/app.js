var express = require('express');
var router = express.Router();

var appController = require('../controllers/app');

/**
 * App Routes
 */

// GET app
router.get('/', appController.app_get);

// GET app reset
router.get('/reset', appController.app_reset_get);

// GET app edit
router.get('/edit', appController.app_edit_get);

// GET app users
router.get('/users', appController.app_users_get);

// GET app number
router.get('/number', appController.app_number_get);

module.exports = router;