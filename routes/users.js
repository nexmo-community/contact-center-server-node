const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

/**
 * Users Routes
 */

// GET users
router.get('/', usersController.users_get);

// GET users new
router.get('/new', usersController.users_new_get);

// POST users new
router.post('/new', usersController.users_new_post);

module.exports = router;