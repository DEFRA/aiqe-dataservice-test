import pino from 'pino'

import loggerOptions from './helpers/logger-options.js'

function createLogger() {
  return pino(loggerOptions)
}

export default createLogger
