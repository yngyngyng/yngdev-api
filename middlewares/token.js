function checkToken(req, res, next) {
  if (req.get('token') != process.env.UUID_TOKEN) {
    res.status(401)
    const error = new Error(`🔍 - Not Authorized - ${req.originalUrl}`)
    next(error)
  } else {
    next()
  }
}

module.exports = {
  checkToken
}
