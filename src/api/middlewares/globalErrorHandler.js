module.exports = (error, req, res, next) => {
  if (error) {
    if (error.name === 'TokenExpiredError') {
      error.statusCode = 401
    }
    const statusCode = error.statusCode ?? 500

    return res.status(statusCode).send({
      msg: 'error',
      info: error.message,
    })
  }
}
