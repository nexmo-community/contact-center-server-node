const express = require('express');
const router = express.Router();

const apiJwtController = require('../controllers/apiJwt');

/**
 * Api JWT Routes
 */

// GET api jwt
router.get('/', apiJwtController.api_jwt_get);

module.exports = router;