const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user')
const moment = require('moment');
const { User } = require('../../db/models/index');
const notificationService = require('../services/notification')



// ✅ v5 packages
const Avatars = require('@dicebear/avatars').default;
const style = require('@dicebear/avatars-initials-sprites').default;

exports.generateAvatar = async (fullName) => {
  const backgroundColors = ['#fcd34d', '#f87171', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];
  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  
  const avatar = new Avatars(style, {
    background: randomColor,
  });
  const svg = avatar.create(fullName); // ← pass full name here

  const outputDir = path.resolve(__dirname, '../../../public/images/user-avatars');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filename = `${randomUUID()}.png`;
  const outputPath = path.join(outputDir, filename);

  await sharp(Buffer.from(svg))
    .png()
    .resize(128, 128)
    .toFile(outputPath);

  console.log(`✅ Avatar saved to ${outputPath}`);
  return filename;
};

exports.comparePasswords = async (receivedPassword, userPasswordHash) => {
  const match = await bcrypt.compare(receivedPassword, userPasswordHash);

  return match;
};

exports.encryptPassword = async (password) => {
  const hash = bcrypt.hashSync(password, +process.env.BCRYPT_SALTROUNDS);
  return hash;
};

exports.generateJwtAccessToken = async (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '100d' });
};

exports.getUserInfo = async (id) => {
  const userInfo = await userRepo.getFullUserInfoById(id);
  const avatarPath = `/images/user-avatars/${userInfo.image}`;

  delete userInfo.password_hash
  userInfo.image = avatarPath;

  return userInfo;

};

exports.checkStrike = async (userId) => {
  const user = await User.findByPk(userId);
  const today = moment().format('YYYY-MM-DD');
  const lastActive = user.last_active_date;

  if (lastActive === today) {
    // Already checked today
    return user.strike_days_count;
  }

  const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

  let message = '';
  if (lastActive === yesterday) {
    user.strike_days_count += 1;
    message = `🔥 You're on a ${user.strike_days_count}-day streak! Keep going!`;
  } else {
    user.strike_days_count = 1;
    message = `🎯 New strike started today! Come back every day to build your streak.`;
  }

  user.last_active_date = today;
  await user.save();

  // ✅ Send notification
  await notificationService.addNotification({
    title: '🔥 Daily Streak',
    body: message,
    userId
  });

  return user.strike_days_count;
};