const express = require('express');
const router = express.Router();

const appController = require('../controllers/app');

/**
 * App Routes
 */

// GET app
router.get('/', appController.app_get);

// GET app reset
router.get('/reset', appController.app_reset_get);

// GET app download private key
router.get('/private-key', appController.app_download_private_key);

// GET app download public key
router.get('/public-key', appController.app_download_public_key);

// GET app edit
router.get('/edit', appController.app_edit_get);

// POST app edit
router.post('/edit', appController.app_edit_post);

// GET app users
router.get('/users', appController.app_users_get);

// GET app ncco
router.get('/ncco/:type', appController.app_ncco);

module.exports = router;