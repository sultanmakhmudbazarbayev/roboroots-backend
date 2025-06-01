const express = require('express');
const router = express.Router();
const tokenVerifier = require('../middlewares/tokenVerifier');
const controller = require('../controllers/user');

router.get('/', tokenVerifier.verifyUser, controller.getUserInfo);

router.get('/certificates', controller.getUserCertificates);

router.get('/check-strike', controller.checkStrike);

router.get('/notifications', controller.getUserNotifications);





module.exports = router;
