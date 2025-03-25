import ecsFormat from '@elastic/ecs-pino-format'
import config from '~/test/helpers/config.js'

const loggerOptions = {
  level: config.get('logLevel'),
  ...(config.get('isTest')
    ? { transport: { target: 'pino-pretty' } }
    : ecsFormat())
}

export default loggerOptions
