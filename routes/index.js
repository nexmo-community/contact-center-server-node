var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index');

/**
 * Index Routes
 */

// GET index
router.get('/', indexController.index);

module.exports = router;