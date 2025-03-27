import pino from 'pino'

import loggerOptions from '~/test/helpers/logger-options.js'

function createLogger() {
  return pino(loggerOptions)
}

export default createLogger
