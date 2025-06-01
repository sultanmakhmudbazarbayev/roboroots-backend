const { Notification } = require('../../db/models/index');
const moment = require('moment');

exports.addNotification = async ({ title, body, userId }) => {
  return await Notification.create({
    title,
    body,
    user_id: userId,
    sent_at: moment().toDate()
  });
};

exports.getUserNotifications = async (userId) => {
  return await Notification.findAll({
    where: { user_id: userId },
    order: [['createdAt', 'DESC']],
    limit: 100 // optional: limit to recent 100
  });
};

exports.markNotificationsAsRead = async (userId) => {
    await Notification.update(
      { is_read: true },
      { where: { user_id: userId, is_read: false } }
    );
  };