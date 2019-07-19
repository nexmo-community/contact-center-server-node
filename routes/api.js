const auth = require('../util/auth');
const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api');
const apiJwtController = require('../controllers/apiJwt');

/**
 * Api Routes
 */

// GET api
router.get('/', auth.secure(), apiController.api_get);

/**
 * Api JWT Routes
 */

// GET api jwt
router.post('/jwt', apiJwtController.api_jwt_post);

module.exports = router;