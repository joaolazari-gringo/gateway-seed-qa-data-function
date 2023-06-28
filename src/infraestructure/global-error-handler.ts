import { ErrorRequestHandler } from 'express'

import logger from '../config/logger'
import { InvalidParamError } from '../errors/invalid-param'

const log = logger({ context: 'GlobalErrorHandler' })

export const globalErrorHandler: ErrorRequestHandler = async (err, _req, res, _next) => {
  log.error(err.message)
  let statusCode = 500

  switch (err.constructor) {
    case InvalidParamError:
      statusCode = 400
      break
  }

  return res.status(statusCode).json({ error: err.message })
}
