const { tryCatch } = require('../utils/errors/tryCatch');
const userService = require('../services/user');
const { Certificate, Course } = require('../../db/models');
const notificationService = require('../services/notification')


exports.getUserInfo = tryCatch(async (req, res) => {
  const userId = req.user.id;

  const userData = await userService.getUserInfo(userId)

  return res.status(200).send({
    status: 'OK',
    data: {
        userData,
    },
  });

});


exports.getUserCertificates = tryCatch(async (req, res) => {
  const userId = req.user.id;

  const certificates = await Certificate.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Course,
        attributes: ['id','name'],
      }
    ],
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({
    message: 'OK',
    data: { data: certificates },
  });
});


exports.checkStrike = tryCatch(async (req, res) => {
  const userId = req.user.id;

  const strikeDaysCount = await userService.checkStrike(userId);

  return res.status(200).json({
    message: 'OK',
    data: { strikeDaysCount },
  });
});


exports.getUserNotifications = tryCatch(async (req, res) => {
  const userId = req.user.id;

  const notifications = await notificationService.getUserNotifications(userId);

  await notificationService.markNotificationsAsRead(userId);

  return res.status(200).json({
    message: 'OK',
    data: { data: notifications },
  });
});