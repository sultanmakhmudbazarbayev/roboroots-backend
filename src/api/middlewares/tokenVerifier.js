const jwt = require('jsonwebtoken')
const AppError = require('../utils/errors/appError')
const { tryCatch } = require('../utils/errors/tryCatch')

/// Verify user's token
exports.verifyUser = tryCatch(async (req, res, next) => {

  const bearerHeader = req.header('Authorization')

  if (!bearerHeader) {
    throw new AppError('Authorization header is required.', 401)
  }
  const bearer = bearerHeader.split(' ')
  const token = bearer[1]

  if (!token) {
    throw new AppError('Access token is missing or invalid.', 401)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  console.log('decodedToken', decodedToken)
  
  if (decodedToken) {
    req.user = decodedToken
    next()
  }
})
