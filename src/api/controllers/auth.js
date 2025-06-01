const { tryCatch } = require('../utils/errors/tryCatch');
const userService = require('../services/user')
const userRepo = require('../repositories/user')

/// Login user
exports.login = tryCatch(async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await userRepo.getByEmail(data.email);

  if (!user) {
    return res.status(401).send({
      status: 'FAIL',
      message: 'Invalid email or password',
    });
  }

  const isPasswordValid = await userService.comparePasswords(data.password, user.password_hash);

  if (!isPasswordValid) {
    return res.status(401).send({
      status: 'FAIL',
      message: 'Invalid email or password',
    });
  }

  delete user.password_hash;

  const access_token = await userService.generateJwtAccessToken(user);

  return res.status(200).send({
    status: 'OK',
    data: {
      access_token,
    },
  });
});


/// Register user
exports.register = tryCatch(async (req, res) => {

  const data = {
    email: req.body.email,
    full_name: req.body.full_name,
    password: req.body.password,
    role: req.body.role,
  }

  data.image = await userService.generateAvatar(data.full_name);
  data.password_hash = await userService.encryptPassword(data.password);
  
  delete data.password;

  const createdUserData = await userRepo.store(data)

  const access_token = await userService.generateJwtAccessToken(createdUserData);

  return res.status(200).send({
    status: "OK",
    data: {
      access_token: access_token
    }
  });

});
