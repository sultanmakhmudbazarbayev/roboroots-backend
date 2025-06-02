const express = require('express');
const { verifyUser } = require('./middlewares/tokenVerifier');
const router = express.Router();

//  Chatbot
router.use('/chatbot', verifyUser, require('./routes/chatbot'));

/// Authentication and authorization
router.use('/auth', require('./routes/auth'));

// User related
router.use('/user', verifyUser, require('./routes/user'));

/// Manage courses
router.use('/course', verifyUser, require('./routes/courses'));

/// Manage courses
router.use('/lesson', verifyUser, require('./routes/lessons'));



module.exports = router;
