exports.tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next)
  } catch (error) {
    console.error(error)
    return next(error)
  }
}
