// import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
// import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
// import common from '../page-objects/common.js'
// import headersObject from '../page-objects/header.js'
// import footer from '../page-objects/footer.js'

import axios from 'axios'
import xml2js from 'xml2js'

describe('API Testing', () => {
  it('monitoring station api availability and getting site id for one station', async () => {
    const apiKey = '3iOuroIeOp8Xwoho9IGEvVddtM0Y75I2'
    const url =
      'https://ephemeral-protected.api.dev.cdp-int.defra.cloud/aqie-back-end/measurements?localSiteID=DESA'

    const data = await browser.call(async () => {
      const res = await axios.get(url, {
        headers: {
          'x-api-key': apiKey
        },
        decompress: false
      })
      return res.data
    })

    const filteredStation = data.measurements.filter(
      (item) => item.name === 'London Bloomsbury'
    )
    // eslint-disable-next-line no-console
    console.log(filteredStation)
    const LocalSiteID =
      filteredStation.length > 0 ? filteredStation[0].localSiteID : null
    // eslint-disable-next-line no-console
    console.log('monitoring station api working')
    // eslint-disable-next-line no-console
    console.log('site ID: ' + LocalSiteID)
  })
  it('testing atom api and calculations and data presented on front end', async () => {
    // checking atom api for data based on local site id in previous api
    /* const pm10 = 5
    const pm25 = 6001
    const nitrogenDioxide = 8
    const ozone = 7
    const sulphurDioxide = 1 */

    // const pollutants = [pm10, pm25, nitrogenDioxide, ozone, sulphurDioxide]

    const urlAtom =
      'https://uk-air.defra.gov.uk/data/atom-dls/observations/auto/GB_FixedObservations_2024_CLL2.xml'
    // const pollutantCode = '1' // e.g. "1" for sulphur dioxide

    const response = await axios.get(urlAtom)
    const xml = response.data

    const parser = new xml2js.Parser({ explicitArray: false })
    const result = await parser.parseStringPromise(xml)
    // hourly average
    // 1. Get all feature members
    const featureMembers = result['gml:FeatureCollection']['gml:featureMember']
    const featureArray = Array.isArray(featureMembers)
      ? featureMembers
      : [featureMembers]

    // 2. Find OM_Observation entries for the pollutant
    const matchingObservations = featureArray.filter((member) => {
      const obs = member['om:OM_Observation']
      if (!obs) return false
      const observedProperty = obs['om:observedProperty']
      return (
        observedProperty &&
        observedProperty.$ &&
        observedProperty.$['xlink:href'] &&
        observedProperty.$['xlink:href'].endsWith(`/pollutant/${5}`)
      )
    })

    // 3. Extract swe:values for each matching observation
    const values = matchingObservations.map((obsMember) => {
      const obs = obsMember['om:OM_Observation']
      return obs['om:result']['swe:DataArray']['swe:values']
    })
    // console.log(values); // Array of data strings for the pollutant

    const allValues = values.flatMap((valStr) =>
      valStr
        .split('@@')
        .map((row) => row.split(',')[4])
        .filter((v) => v !== undefined && v !== '-99')
    )

    // console.log(allValues); // Array of values, excluding -99

    const numericValues = allValues.map(Number).filter((v) => !isNaN(v))
    const average =
      numericValues.length > 0
        ? numericValues.reduce((sum, v) => sum + v, 0) / numericValues.length
        : null

    // eslint-disable-next-line no-console
    console.log('Hourly Average:', average)

    // daily average

    // annual average
  })
})
