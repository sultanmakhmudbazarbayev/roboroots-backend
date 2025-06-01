const express = require('express');
const router = express.Router();

// const tokenVerifier = require('../middlewares/tokenVerifier');
const controller = require('../controllers/auth');

/// Login
router.post('/login', controller.login);

/// Register
router.post('/register', controller.register);


module.exports = router;
