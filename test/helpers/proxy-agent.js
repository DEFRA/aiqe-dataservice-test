import { HttpsProxyAgent } from 'https-proxy-agent'
import { config } from './config.js'
import { URL } from 'url'

const proxyAgent = () => {
  const httpsProxy = config.get('httpsProxy')

  if (httpsProxy) {
    return null
  } else {
    const proxyUrl = new URL(httpsProxy)
    return {
      url: proxyUrl,
      agent: new HttpsProxyAgent(proxyUrl)
    }
  }
}

module.exports = proxyAgent
