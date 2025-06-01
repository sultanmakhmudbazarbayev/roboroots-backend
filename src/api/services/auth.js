// const authRepository = require('./repository');
// const passwords = require('../utils/passwords');
// const AppError = require('../utils/errors/appError');

// exports.getTokens = async (receivedUserData) => {
//   /// Get user info based on email
//   const userInfo = await authRepository.getCurrentUserInfoByEmail(
//     receivedUserData.email
//   );

//   console.log(userInfo);

//   if (!userInfo) {
//     throw new AppError('Invalid login or password.', 403);
//   }

//   /// Check if passwords match
//   const match = await passwords.comparePasswords(
//     receivedUserData.password,
//     userInfo.password
//   );
//   if (!match) {
//     throw new AppError('Invalid login or password.', 403);
//   }

//   /// Delete password from UserInfo
//   delete userInfo.password;
//   /// Get access and refresh tokens
//   const accessToken = authRepository.getAccessToken(userInfo);

//   if (!accessToken) {
//     throw new AppError('Error occured when generating jwt tokens.', 500);
//   }

//   return {
//     accessToken
//   };
// };