const bcrypt = require('bcrypt');

exports.comparePasswords = async (receivedPassword, userPassword) => {
  const match = await bcrypt.compare(receivedPassword, userPassword);

  return match;
};

exports.encryptPassword = async (password) => {
  const hash = bcrypt.hashSync(password, +process.env.BCRYPT_SALTROUNDS);
  return hash;
};
