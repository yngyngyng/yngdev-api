module.exports = function (opts) {
  if (!opts) {
    opts = {}
  }

  let failCodes = opts['failCodes']
  if (!failCodes || !(failCodes instanceof Array)) {
    failCodes = [400, 401, 403, 404]
  }

  let statusCodeKey = opts['statusCodeKey']
  if (!statusCodeKey || typeof statusCodeKey !== 'string') {
    statusCodeKey = 'statusCode'
  }

  let errorProps = opts['errorProps']
  if (!errorProps || errorProps === null || typeof errorProps !== 'object') {
    errorProps = {
      message: 'An unknown error occurred'
    }
  }

  return function (req, res, next) {
    res.apiSuccess = function (response) {
      res.status(200)
      res.json({
        success: true,
        data: response
      })
    }

    res.apiError = function (status, response) {
      res.status(status)
      res.json({
        success: false,
        message: response
      })
    }

    res.apiInternalError = function (err) {
      const response = {}

      const validErr = err instanceof Error

      for (const key in errorProps) {
        if (validErr && err.hasOwnProperty(key)) {
          response[key] = err[key]
        } else if (errorProps.hasOwnProperty(key)) {
          response[key] = errorProps[key]
        } else {
          response[key] = null
        }
      }

      let statusCode = 500
      if (
        validErr &&
        err.hasOwnProperty(statusCodeKey) &&
        typeof err[statusCodeKey] === 'number'
      ) {
        statusCode = err[statusCodeKey]
      }

      const failed = failCodes.indexOf(statusCode) >= 0
      response.status = failed ? 'fail' : 'error'

      res.status(statusCode)
      res.json(response)
    }

    next()
  }
}
