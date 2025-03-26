import createLogger from 'helpers/logger'
import proxyFetch from 'helpers/proxy-fetch'
const optionsJson = { method: 'GET', headers: { 'Content-Type': 'text/json' } }

/* eslint-disable */
const logger = createLogger()
async function pollutantSummaryUrl() {
  const homeUrl = config.get('homeUrl')
  logger.info(`forecastSummaryUrl: ${homeUrl}`)
  const response = await proxyFetch(homeUrl, optionsJson).catch((err) => {
    logger.info(`err ${JSON.stringify(err.message)}`)
  })
}
