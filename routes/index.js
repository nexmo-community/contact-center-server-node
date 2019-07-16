const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const authController = require('../controllers/auth');

/**
 * Index Routes
 */

// GET index
router.get('/', indexController.index);

/**
 * Auth Routes
 */

// GET login
router.get('/login', authController.login_get);

// POST login
router.post('/login', authController.login_post);

// GET logout
router.get('/logout', authController.logout_get);

module.exports = router;