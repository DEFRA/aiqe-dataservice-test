import pino from 'pino'

import loggerOptions from './logger-options'

function createLogger() {
  return pino(loggerOptions)
}

module.exports = createLogger
