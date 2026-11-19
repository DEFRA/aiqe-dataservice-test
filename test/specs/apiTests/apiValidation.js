import startNowPage from '../../page-objects/startnowpage.js'
import { browser, expect } from '@wdio/globals'
import searchPage from '../../page-objects/searchPage.js'
import disambigurationPage from '../../page-objects/disambigurationPage.js'
import common from '../../page-objects/common.js'
import locationMonitoringStationListPage from '../../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../../page-objects/monitoringStationPage.js'
import hubPage from '../../page-objects/hubPage.js'

import axios from 'axios'
import xml2js from 'xml2js'
import allure from '@wdio/allure-reporter'

// API key for the CDP ephemeral-protected gateway (aqie-back-end,
// aqie-historicaldata-backend). Set CDP_API_KEY in .env
const getCdpApiKey = () => {
  const apiKey = process.env.CDP_API_KEY
  if (!apiKey) {
    throw new Error('Set CDP_API_KEY in .env to call the CDP protected APIs')
  }
  return apiKey
}

// Persist coverage summary for reuse across tests in this file
let perPollutantCoverage = null
describe('API Testing', () => {
  it('monitoring station api availability and getting site id for one station', async () => {
    const apiKey = getCdpApiKey()
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
  it('testing atom api and calculations for hourly annual average data presented on front end', async () => {
    // checking atom api for data based on local site id in previous api
    const pollutantDefs = [
      { key: 'PM10', code: 5 },
      { key: 'PM2.5', code: 6001 },
      { key: 'Nitrogen dioxide', code: 8 },
      { key: 'Ozone', code: 7 },
      { key: 'Sulphur dioxide', code: 1 }
    ]

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

    // Iterate for each pollutant and compute filtered hourly average
    const results = {}
    for (const pol of pollutantDefs) {
      const matchingObservations = featureArray.filter((member) => {
        const obs = member['om:OM_Observation']
        if (!obs) return false
        const observedProperty = obs['om:observedProperty']
        return (
          observedProperty &&
          observedProperty.$ &&
          observedProperty.$['xlink:href'] &&
          observedProperty.$['xlink:href'].endsWith(`/pollutant/${pol.code}`)
        )
      })

      if (!matchingObservations.length) {
        // eslint-disable-next-line no-console
        console.log(`[${pol.key}] No observations matched in feed`)
        continue
      }

      const values = matchingObservations.map((obsMember) => {
        const obs = obsMember['om:OM_Observation']
        return obs['om:result']['swe:DataArray']['swe:values']
      })

      const rows = values.flatMap((valStr) =>
        valStr
          .split('@@')
          .map((row) => row.split(','))
          .map((fields) => ({
            ts:
              fields[0] && !isNaN(Date.parse(fields[0]))
                ? fields[0]
                : fields[1] && !isNaN(Date.parse(fields[1]))
                  ? fields[1]
                  : fields.find((f) => !isNaN(Date.parse(f))) || '',
            v: fields[4]
          }))
          .filter((r) => r.v !== undefined && r.v !== '-99')
      )

      const parsed = rows
        .map((r) => ({ date: new Date(r.ts), value: Number(r.v) }))
        .filter((r) => !isNaN(r.date.getTime()) && !isNaN(r.value))

      const byDay = new Map()
      for (const r of parsed) {
        // Group by local date to match front-end calculations
        const yyyy = r.date.getFullYear()
        const mm = String(r.date.getMonth() + 1).padStart(2, '0')
        const dd = String(r.date.getDate()).padStart(2, '0')
        const key = `${yyyy}-${mm}-${dd}`
        if (!byDay.has(key)) byDay.set(key, [])
        byDay.get(key).push(r.value)
      }

      const hoursInDay = 24
      const coverageThreshold = 0.75
      const minHours = Math.ceil(hoursInDay * coverageThreshold) // 18

      let acceptedValues = []
      let acceptedDays = 0
      let rejectedDays = 0
      for (const [, valuesForDay] of byDay) {
        if (valuesForDay.length >= minHours) {
          acceptedDays++
          acceptedValues = acceptedValues.concat(valuesForDay)
        } else {
          rejectedDays++
        }
      }

      const average =
        acceptedValues.length > 0
          ? acceptedValues.reduce((sum, v) => sum + v, 0) /
            acceptedValues.length
          : null
      const roundedAverage = average != null ? Math.round(average) : null

      const validHoursCount = parsed.length

      // Store per-pollutant results so we can match/compare later
      results[pol.key] = {
        code: pol.code,
        rawAverage: average,
        roundedAverage,
        acceptedDays,
        rejectedDays,
        validHoursCount
      }
    }

    // Expose convenient constants for matching in subsequent checks
    // Also expose accepted/rejected day counts per pollutant for reporting and reuse
    const coverageSummaryArray = Object.entries(results).map(([key, r]) => ({
      pollutant: key,
      acceptedDays: r.acceptedDays,
      rejectedDays: r.rejectedDays
    }))
    // Build a keyed object for easier lookup in subsequent tests
    const coverageSummaryObject = Object.fromEntries(
      Object.entries(results).map(([key, r]) => [
        key,
        {
          acceptedDays: r.acceptedDays,
          rejectedDays: r.rejectedDays,
          validHoursCount: r.validHoursCount
        }
      ])
    )
    // Persist globally for the next test
    perPollutantCoverage = coverageSummaryObject
    // Attach to Allure for reporting
    try {
      const json = JSON.stringify(coverageSummaryArray, null, 2)
      allure.addAttachment(
        'Accepted-Rejected Days Summary',
        json,
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    const pm10Average = results.PM10?.roundedAverage ?? null
    const pm25Average = results['PM2.5']?.roundedAverage ?? null
    const nitrogenDioxideAverage =
      results['Nitrogen dioxide']?.roundedAverage ?? null
    const ozoneAverage = results.Ozone?.roundedAverage ?? null
    const sulphurDioxideAverage =
      results['Sulphur dioxide']?.roundedAverage ?? null

    const backEndPm10Average = common.parseNumber(pm10Average)
    const backEndPm25Average = common.parseNumber(pm25Average)
    const backEndNitrogenDioxideAverage = common.parseNumber(
      nitrogenDioxideAverage
    )
    const backEndOzoneAverage = common.parseNumber(ozoneAverage)
    const backEndSulphurDioxideAverage = common.parseNumber(
      sulphurDioxideAverage
    )

    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.get2024Button.click()
    await common.legalWait()
    await monitoringStationPage.get2024Button.click()
    await common.legalWait()

    await monitoringStationPage.getPM25AnnaulAverageST.waitForExist({
      timeout: 5000
    })
    const pm25FrontEndHourlyAnnualAverage = common.parseNumber(
      await monitoringStationPage.getPM25AnnaulAverageST.getText()
    )
    await monitoringStationPage.getPM10AnnaulAverageST.waitForExist({
      timeout: 5000
    })
    const pm10FrontEndHourlyAnnualAverage = common.parseNumber(
      await monitoringStationPage.getPM10AnnaulAverageST.getText()
    )
    await monitoringStationPage.getNitrogenDioxideAnnaulAverageST.waitForExist({
      timeout: 5000
    })
    const ndFrontEndHourlyAnnualAverage = common.parseNumber(
      await monitoringStationPage.getNitrogenDioxideAnnaulAverageST.getText()
    )
    await monitoringStationPage.getOzoneAnnaulAverageST.waitForExist({
      timeout: 5000
    })
    const ozoneFrontEndHourlyAnnualAverage = common.parseNumber(
      await monitoringStationPage.getOzoneAnnaulAverageST.getText()
    )
    await monitoringStationPage.getSulphurDioxideAnnaulAverageST.waitForExist({
      timeout: 5000
    })
    const sdFrontEndHourlyAnnualAverage = common.parseNumber(
      await monitoringStationPage.getSulphurDioxideAnnaulAverageST.getText()
    )
    await expect(backEndPm10Average).toEqual(pm10FrontEndHourlyAnnualAverage)
    await expect(backEndPm25Average).toEqual(pm25FrontEndHourlyAnnualAverage)
    await expect(backEndNitrogenDioxideAverage).toEqual(
      ndFrontEndHourlyAnnualAverage
    )
    await expect(backEndOzoneAverage).toEqual(ozoneFrontEndHourlyAnnualAverage)
    await expect(backEndSulphurDioxideAverage).toEqual(
      sdFrontEndHourlyAnnualAverage
    )
    // eslint-disable-next-line no-console
    console.log(
      'hourly annual average backend calculations and front end values match'
    )
  })

  it('testing atom api and calculations for data capture percentage presented on front end', async () => {
    // Use the persisted coverage data from the previous test
    const coverage = perPollutantCoverage
    await expect(coverage).toBeDefined()
    // Example: re-attach for visibility in this test's report
    try {
      const json = JSON.stringify(coverage, null, 2)
      allure.addAttachment(
        'Coverage Summary (for capture % calc)',
        json,
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }
    // Further calculations/assertions can now use `coverage[<pollutant>].acceptedDays/rejectedDays`

    // Determine reporting year (we're on 2024 in this flow)
    const year = 2024
    const isLeap = (y) => new Date(y, 1, 29).getMonth() === 1
    const daysInYear = isLeap(year) ? 366 : 365

    // Compute capture % as proportion of valid hourly measurements over total possible hours
    const totalHoursInYear = daysInYear * 24
    const computeCapturePercentHours = (validHoursCount) =>
      Math.round((validHoursCount / totalHoursInYear) * 100)

    const captureBackend = {
      PM10: computeCapturePercentHours(coverage.PM10?.validHoursCount ?? 0),
      'PM2.5': computeCapturePercentHours(
        coverage['PM2.5']?.validHoursCount ?? 0
      ),
      'Nitrogen dioxide': computeCapturePercentHours(
        coverage['Nitrogen dioxide']?.validHoursCount ?? 0
      ),
      Ozone: computeCapturePercentHours(coverage.Ozone?.validHoursCount ?? 0),
      'Sulphur dioxide': computeCapturePercentHours(
        coverage['Sulphur dioxide']?.validHoursCount ?? 0
      )
    }

    // Attach backend capture summary
    try {
      allure.addAttachment(
        'Backend Capture % (days-based)',
        JSON.stringify(captureBackend, null, 2),
        'application/json'
      )
    } catch {}

    // Fetch front-end capture values
    await monitoringStationPage.getPM25AnnaulAverageST.waitForExist({
      timeout: 5000
    })
    const pm25FrontEndCapture = common.parseNumber(
      await monitoringStationPage.getPM25DataCapture.getText()
    )
    const pm10FrontEndCapture = common.parseNumber(
      await monitoringStationPage.getPM10DataCapture.getText()
    )
    const no2FrontEndCapture = common.parseNumber(
      await monitoringStationPage.getNODataCapture.getText()
    )
    const ozoneFrontEndCapture = common.parseNumber(
      await monitoringStationPage.getOzoneDataCapture.getText()
    )
    const so2FrontEndCapture = common.parseNumber(
      await monitoringStationPage.getSDDataCapture.getText()
    )

    // Assert backend (days-based) capture % matches front-end presentation
    await expect(captureBackend['PM2.5']).toEqual(pm25FrontEndCapture)
    await expect(captureBackend.PM10).toEqual(pm10FrontEndCapture)
    await expect(captureBackend['Nitrogen dioxide']).toEqual(no2FrontEndCapture)
    await expect(captureBackend.Ozone).toEqual(ozoneFrontEndCapture)
    await expect(captureBackend['Sulphur dioxide']).toEqual(so2FrontEndCapture)
    // eslint-disable-next-line no-console
    console.log(
      'Data capture % backend calculations and front end values match'
    )
  })

  it('testing atom api for daily exceedances presented on front end for PM10', async () => {
    // Backend: compute PM10 daily exceedances (> 50 µg/m³) for 2022 at CLL2
    const urlAtom2022 =
      'https://uk-air.defra.gov.uk/data/atom-dls/observations/auto/GB_FixedObservations_2022_CLL2.xml'
    const response = await axios.get(urlAtom2022)
    const xml = response.data

    const parser = new xml2js.Parser({ explicitArray: false })
    const result = await parser.parseStringPromise(xml)

    const featureMembers = result['gml:FeatureCollection']['gml:featureMember']
    const featureArray = Array.isArray(featureMembers)
      ? featureMembers
      : [featureMembers]

    // PM10 pollutant code = 5
    const matchingObservations = featureArray.filter((member) => {
      const obs = member['om:OM_Observation']
      if (!obs) return false
      const observedProperty = obs['om:observedProperty']
      return (
        observedProperty &&
        observedProperty.$ &&
        observedProperty.$['xlink:href'] &&
        observedProperty.$['xlink:href'].endsWith('/pollutant/5')
      )
    })

    if (!matchingObservations.length) {
      throw new Error('No PM10 observations found in 2022 feed for CLL2')
    }

    const values = matchingObservations.map((obsMember) => {
      const obs = obsMember['om:OM_Observation']
      return obs['om:result']['swe:DataArray']['swe:values']
    })

    const rows = values.flatMap((valStr) =>
      valStr
        .split('@@')
        .map((row) => row.split(','))
        .map((fields) => ({
          ts:
            fields[0] && !isNaN(Date.parse(fields[0]))
              ? fields[0]
              : fields[1] && !isNaN(Date.parse(fields[1]))
                ? fields[1]
                : fields.find((f) => !isNaN(Date.parse(f))) || '',
          v: fields[4]
        }))
        .filter((r) => r.v !== undefined && r.v !== '-99')
    )

    const parsed = rows
      .map((r) => ({ date: new Date(r.ts), value: Number(r.v) }))
      .filter((r) => !isNaN(r.date.getTime()) && !isNaN(r.value))

    // Group by local day and compute daily means where coverage >= 75% (>= 18 hours)
    const byDay = new Map()
    for (const r of parsed) {
      const yyyy = r.date.getFullYear()
      const mm = String(r.date.getMonth() + 1).padStart(2, '0')
      const dd = String(r.date.getDate()).padStart(2, '0')
      const key = `${yyyy}-${mm}-${dd}`
      if (!byDay.has(key)) byDay.set(key, [])
      byDay.get(key).push(r.value)
    }

    const minHours = 18
    let exceedanceDays = 0
    const dailyMeans = []
    for (const [day, valuesForDay] of byDay) {
      if (valuesForDay.length >= minHours) {
        const mean =
          valuesForDay.reduce((s, v) => s + v, 0) / valuesForDay.length
        dailyMeans.push({ day, mean, hours: valuesForDay.length })
        // Scientific threshold: count days strictly above 50.5 µg/m³
        if (mean > 50.5) exceedanceDays++
      }
    }

    try {
      allure.addAttachment(
        'PM10 Daily Means (2022 CLL2)',
        JSON.stringify(dailyMeans.slice(0, 20), null, 2),
        'application/json'
      )
      allure.addAttachment(
        'PM10 Daily Exceedances Count (2022)',
        JSON.stringify({ exceedanceDays }, null, 2),
        'application/json'
      )
    } catch {}

    // Front-end: navigate and assert PM10 daily exceedances for 2022
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.get2022Button.click()
    await common.legalWait()
    await monitoringStationPage.get2022Button.click()
    await common.legalWait()

    await monitoringStationPage.getPM10DailyExceedence.waitForExist({
      timeout: 6000
    })
    const pm10DailyExceedanceFrontEnd = common.parseNumber(
      await monitoringStationPage.getPM10DailyExceedence.getText()
    )

    await expect(exceedanceDays).toEqual(pm10DailyExceedanceFrontEnd)
  })

  it('testing atom api for daily exceedances presented on front end for sulphur dioxide', async () => {
    // Backend: compute sulphur dioxide daily exceedances (> 125.4 µg/m³) for 2022 at CLL2
    const urlAtom2022 =
      'https://uk-air.defra.gov.uk/data/atom-dls/observations/auto/GB_FixedObservations_2022_CLL2.xml'
    const response = await axios.get(urlAtom2022)
    const xml = response.data

    const parser = new xml2js.Parser({ explicitArray: false })
    const result = await parser.parseStringPromise(xml)

    const featureMembers = result['gml:FeatureCollection']['gml:featureMember']
    const featureArray = Array.isArray(featureMembers)
      ? featureMembers
      : [featureMembers]

    // Sulphur dioxide pollutant code = 1
    const matchingObservations = featureArray.filter((member) => {
      const obs = member['om:OM_Observation']
      if (!obs) return false
      const observedProperty = obs['om:observedProperty']
      return (
        observedProperty &&
        observedProperty.$ &&
        observedProperty.$['xlink:href'] &&
        observedProperty.$['xlink:href'].endsWith('/pollutant/1')
      )
    })

    if (!matchingObservations.length) {
      throw new Error(
        'No sulphur dioxide observations found in 2022 feed for CLL2'
      )
    }

    const values = matchingObservations.map((obsMember) => {
      const obs = obsMember['om:OM_Observation']
      return obs['om:result']['swe:DataArray']['swe:values']
    })

    const rows = values.flatMap((valStr) =>
      valStr
        .split('@@')
        .map((row) => row.split(','))
        .map((fields) => ({
          ts:
            fields[0] && !isNaN(Date.parse(fields[0]))
              ? fields[0]
              : fields[1] && !isNaN(Date.parse(fields[1]))
                ? fields[1]
                : fields.find((f) => !isNaN(Date.parse(f))) || '',
          v: fields[4]
        }))
        .filter((r) => r.v !== undefined && r.v !== '-99')
    )

    const parsed = rows
      .map((r) => ({ date: new Date(r.ts), value: Number(r.v) }))
      .filter((r) => !isNaN(r.date.getTime()) && !isNaN(r.value))

    // Group by local day and compute daily means where coverage >= 75% (>= 18 hours)
    const byDay = new Map()
    for (const r of parsed) {
      const yyyy = r.date.getFullYear()
      const mm = String(r.date.getMonth() + 1).padStart(2, '0')
      const dd = String(r.date.getDate()).padStart(2, '0')
      const key = `${yyyy}-${mm}-${dd}`
      if (!byDay.has(key)) byDay.set(key, [])
      byDay.get(key).push(r.value)
    }

    const minHours = 18
    let exceedanceDays = 0
    const dailyMeans = []
    for (const [day, valuesForDay] of byDay) {
      if (valuesForDay.length >= minHours) {
        const mean =
          valuesForDay.reduce((s, v) => s + v, 0) / valuesForDay.length
        dailyMeans.push({ day, mean, hours: valuesForDay.length })
        // Scientific threshold: count days strictly above 125.4 µg/m³
        if (mean > 125.4) exceedanceDays++
      }
    }

    try {
      allure.addAttachment(
        'Sulphur dioxide Daily Means (2022 CLL2)',
        JSON.stringify(dailyMeans.slice(0, 20), null, 2),
        'application/json'
      )
      allure.addAttachment(
        'Sulphur dioxide Daily Exceedances Count (2022)',
        JSON.stringify({ exceedanceDays }, null, 2),
        'application/json'
      )
    } catch {}

    // Front-end: navigate and assert sulphur dioxide daily exceedances for 2022
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.get2022Button.click()
    await common.legalWait()
    await monitoringStationPage.get2022Button.click()
    await common.legalWait()

    await monitoringStationPage.getSDDailyExceedence.waitForExist({
      timeout: 5000
    })
    const sulphurDioxideDailyExceedanceFrontEnd = common.parseNumber(
      await monitoringStationPage.getSDDailyExceedence.getText()
    )

    await expect(exceedanceDays).toEqual(sulphurDioxideDailyExceedanceFrontEnd)
  })

  it('testing atom api for hourly exceedances for nitrogen dioxide presented on front end', async () => {
    // API endpoint for London Marylebone Road 2018 data
    const urlAtom =
      'https://uk-air.defra.gov.uk/data/atom-dls/observations/auto/GB_FixedObservations_2018_MY1.xml'

    // Nitrogen dioxide pollutant code
    const nitrogenDioxideCode = 8
    const exceedanceThreshold = 200.4

    // Fetch the XML data
    const response = await axios.get(urlAtom)
    const xml = response.data

    // Parse XML
    const parser = new xml2js.Parser({ explicitArray: false })
    const result = await parser.parseStringPromise(xml)

    // Get all feature members
    const featureMembers = result['gml:FeatureCollection']['gml:featureMember']
    const featureArray = Array.isArray(featureMembers)
      ? featureMembers
      : [featureMembers]

    // Filter observations for nitrogen dioxide (pollutant code 8)
    const nitrogenDioxideObservations = featureArray.filter((member) => {
      const obs = member['om:OM_Observation']
      if (!obs) return false
      const observedProperty = obs['om:observedProperty']
      return (
        observedProperty &&
        observedProperty.$ &&
        observedProperty.$['xlink:href'] &&
        observedProperty.$['xlink:href'].endsWith(
          `/pollutant/${nitrogenDioxideCode}`
        )
      )
    })

    // Extract values from matching observations
    const values = nitrogenDioxideObservations.map((obsMember) => {
      const obs = obsMember['om:OM_Observation']
      return obs['om:result']['swe:DataArray']['swe:values']
    })

    // Parse the data rows
    const rows = values.flatMap((valStr) =>
      valStr
        .split('@@')
        .map((row) => row.split(','))
        .map((fields) => ({
          value: fields[4]
        }))
        .filter((r) => r.value !== undefined && r.value !== '-99')
    )

    // Count exceedances (values over 200)
    let exceedanceCount = 0
    for (const row of rows) {
      const value = Number(row.value)
      if (!isNaN(value) && value > exceedanceThreshold) {
        exceedanceCount++
      }
    }

    // eslint-disable-next-line no-console
    console.log(
      `Total nitrogen dioxide exceedances (>${exceedanceThreshold}): ${exceedanceCount}`
    )

    // Verify there are 29 exceedances
    await expect(exceedanceCount).toBe(29)

    // Front-end: navigate and assert Nitrogen dioxide hourly exceedances for 2018
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Marylebone Road')
      .click()
    await monitoringStationPage.get2018Button.click()
    await common.legalWait()
    await monitoringStationPage.get2018Button.click()
    await common.legalWait()

    await monitoringStationPage.getNOHourlyExceedence.waitForExist({
      timeout: 5000
    })
    const nitrogenDioxideHourlyExceedanceFrontEnd = common.parseNumber(
      await monitoringStationPage.getNOHourlyExceedence.getText()
    )

    await expect(exceedanceCount).toEqual(
      nitrogenDioxideHourlyExceedanceFrontEnd
    )
  })

  it('testing atom api for hourly exceedances presented on front end for sulphur dioxide', async () => {
    // API endpoint for London Marylebone Road 2018 data
    const urlAtom =
      'https://uk-air.defra.gov.uk/data/atom-dls/observations/auto/GB_FixedObservations_2018_MY1.xml'

    // Sulphur dioxide pollutant code
    const sulphurDioxideCode = 1
    const exceedanceThreshold = 350.4

    // Fetch the XML data
    const response = await axios.get(urlAtom)
    const xml = response.data

    // Parse XML
    const parser = new xml2js.Parser({ explicitArray: false })
    const result = await parser.parseStringPromise(xml)

    // Get all feature members
    const featureMembers = result['gml:FeatureCollection']['gml:featureMember']
    const featureArray = Array.isArray(featureMembers)
      ? featureMembers
      : [featureMembers]

    // Filter observations for sulphur dioxide (pollutant code 1)
    const sulphurDioxideObservations = featureArray.filter((member) => {
      const obs = member['om:OM_Observation']
      if (!obs) return false
      const observedProperty = obs['om:observedProperty']
      return (
        observedProperty &&
        observedProperty.$ &&
        observedProperty.$['xlink:href'] &&
        observedProperty.$['xlink:href'].endsWith(
          `/pollutant/${sulphurDioxideCode}`
        )
      )
    })

    // Extract values from matching observations
    const values = sulphurDioxideObservations.map((obsMember) => {
      const obs = obsMember['om:OM_Observation']
      return obs['om:result']['swe:DataArray']['swe:values']
    })

    // Parse the data rows
    const rows = values.flatMap((valStr) =>
      valStr
        .split('@@')
        .map((row) => row.split(','))
        .map((fields) => ({
          value: fields[4]
        }))
        .filter((r) => r.value !== undefined && r.value !== '-99')
    )

    // Count exceedances (values over 350.4)
    let exceedanceCount = 0
    for (const row of rows) {
      const value = Number(row.value)
      if (!isNaN(value) && value > exceedanceThreshold) {
        exceedanceCount++
      }
    }

    // eslint-disable-next-line no-console
    console.log(
      `Total sulphur dioxide exceedances (>${exceedanceThreshold}): ${exceedanceCount}`
    )

    // Front-end: navigate and assert Sulphur dioxide hourly exceedances for 2018
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Marylebone Road')
      .click()
    await monitoringStationPage.get2018Button.click()
    await common.legalWait()
    await monitoringStationPage.get2018Button.click()
    await common.legalWait()

    await monitoringStationPage.getSDHourlyExceedence.waitForExist({
      timeout: 5000
    })
    const sulphurDioxideHourlyExceedanceFrontEnd = common.parseNumber(
      await monitoringStationPage.getSDHourlyExceedence.getText()
    )

    await expect(exceedanceCount).toEqual(
      sulphurDioxideHourlyExceedanceFrontEnd
    )
  })

  it('testing new api - count of all pollutants, listing pollutants with data sources', async () => {
    const urlAtomData =
      'https://ephemeral-protected.api.dev.cdp-int.defra.cloud/aqie-historicaldata-backend/AtomDataSelectionPollutantMaster'
    const apiKey = getCdpApiKey()

    const data = await browser.call(async () => {
      const res = await axios.get(urlAtomData, {
        headers: {
          'x-api-key': apiKey,
          'Accept-Encoding': '*'
        }
      })
      return res.data
    })

    const pollutants = data.value ?? data
    // eslint-disable-next-line no-console
    console.log(`Total pollutants returned: ${data.Count ?? pollutants.length}`)
    for (const pollutant of pollutants) {
      // eslint-disable-next-line no-console
      console.log(
        `ID: ${pollutant.pollutantID} | Name: ${pollutant.pollutantName} | Abbreviation: ${pollutant.pollutant_Abbreviation}`
      )
    }
    await expect(pollutants.length).toEqual(124)

    // extracting each pollutant with a data source
    const urlPollutantDataSource =
      'https://ephemeral-protected.api.dev.cdp-int.defra.cloud/aqie-historicaldata-backend/AtomDataSelectionPollutantDataSource'

    const standardSourcePollutants = []
    const ukeapSourcePollutants = []

    for (const pollutant of pollutants) {
      const sourceData = await browser.call(async () => {
        const res = await axios.post(
          urlPollutantDataSource,
          { pollutantID: pollutant.pollutantID },
          {
            headers: {
              'x-api-key': apiKey,
              'Accept-Encoding': '*'
            }
          }
        )
        return res.data
      })
      const sources = sourceData.value ?? sourceData
      const hasAurn = sources.includes(
        'Automatic Urban and Rural Network (AURN)'
      )
      const hasUkeap = sources.includes('UKEAP - Rural NO2 Network')

      if (hasAurn && hasUkeap) {
        ukeapSourcePollutants.push(
          `ID: ${pollutant.pollutantID} | ${pollutant.pollutantName}`
        )
      } else if (hasAurn) {
        standardSourcePollutants.push(
          `ID: ${pollutant.pollutantID} | ${pollutant.pollutantName}`
        )
      }
    }

    // eslint-disable-next-line no-console
    console.log(
      '\n--- Pollutants with Near real-time data from Defra + AURN ---'
    )
    for (const p of standardSourcePollutants) {
      // eslint-disable-next-line no-console
      console.log(p)
    }
    // eslint-disable-next-line no-console
    console.log(
      '\n--- Pollutants with Near real-time data from Defra + AURN + UKEAP - Rural NO2 Network ---'
    )
    for (const p of ukeapSourcePollutants) {
      // eslint-disable-next-line no-console
      console.log(p)
    }
  })

  // Below this data capture % the front end shows "Low data capture" and
  // does not calculate the average (it shows "-" instead)
  const lowDataCaptureThreshold = 75

  // UK-AIR API - the source aqie-back-end uses for the last 24 hours and
  // last 7 days views. Needs UK_AIR_API_TOKEN (set in .env) - a token from
  // "Login Check" in the API docs, which expires after 5 days
  const ukAirApiUrl = 'https://uk-air-api.staging.rcdo.co.uk/api'

  const getUkAirApiToken = () => {
    const token = process.env.UK_AIR_API_TOKEN
    if (!token) {
      throw new Error(
        'Set UK_AIR_API_TOKEN in .env to call the UK-AIR API (get one from "Login Check" at https://uk-air-api.staging.rcdo.co.uk/api/docs)'
      )
    }
    return token
  }

  // Measurements for one station and pollutant between two dates (YYYY-MM-DD).
  // The API only takes one pollutant per request
  const getPollutantMeasurements = async (
    stationId,
    pollutantName,
    startDate,
    endDate
  ) => {
    const token = getUkAirApiToken()
    const request = (page) =>
      axios.get(`${ukAirApiUrl}/pollutant_measurement_datas`, {
        params: {
          page,
          'station-id': stationId,
          'pollutant-name': pollutantName,
          'start-date': startDate,
          'end-date': endDate
        },
        headers: {
          accept: 'application/ld+json',
          Authorization: `Bearer ${token}`
        },
        // Check the status ourselves so the errors below say what went wrong
        validateStatus: () => true
      })
    // Longer ranges can come back over several pages
    let measurements = []
    for (let page = 1; ; page++) {
      const res = await request(page)
      if (String(res.data).includes('Zscaler')) {
        // Zscaler shows a "Pause before you continue" page for this site,
        // which has to be accepted in a browser before scripts can get through
        throw new Error(
          `Zscaler blocked the UK-AIR API (HTTP ${res.status}). Open ${ukAirApiUrl}/docs in your browser, click "Continue", then run the test again`
        )
      }
      if (res.status === 401) {
        throw new Error(
          'UK-AIR API token rejected (HTTP 401) - it has probably expired. Get a new one from "Login Check" in the API docs and update UK_AIR_API_TOKEN in .env'
        )
      }
      if (!Array.isArray(res.data?.member)) {
        throw new Error(
          `UK-AIR API did not return measurements for ${stationId} ${pollutantName} (HTTP ${res.status}): ${JSON.stringify(res.data).slice(0, 300)}`
        )
      }
      measurements = measurements.concat(res.data.member)
      if (!res.data.view?.next || !res.data.member.length) break
    }
    return measurements
  }

  // Works out last 7 days average, data capture and exceedances per pollutant
  // from the UK-AIR API for one station (e.g. 'UKA00211' London Bloomsbury,
  // 'UKA00963' Milton Keynes Civic Centre)
  const calculateLastSevenDays = async (stationId) => {
    // Exceedance thresholds (µg/m³), null where there is no legal limit.
    // Values count once they would round above the legal limit, matching
    // the existing daily/hourly exceedance tests:
    // PM10 daily limit 50, NO2 hourly limit 200,
    // sulphur dioxide daily limit 125 and hourly limit 350.
    // apiName is the pollutant-name the UK-AIR API expects
    const pollutantDefs = [
      {
        key: 'PM10',
        apiName: 'GE10',
        dailyThreshold: 50.5,
        hourlyThreshold: null
      },
      {
        key: 'PM2.5',
        apiName: 'PM25',
        dailyThreshold: null,
        hourlyThreshold: null
      },
      {
        key: 'Nitrogen dioxide',
        apiName: 'NO2',
        dailyThreshold: null,
        hourlyThreshold: 200.4
      },
      {
        key: 'Ozone',
        apiName: 'O3',
        dailyThreshold: null,
        hourlyThreshold: null
      },
      {
        key: 'Sulphur dioxide',
        apiName: 'SO2',
        dailyThreshold: 125.4,
        hourlyThreshold: 350.4
      }
    ]

    // Last 7 days = 7 full days before today (today - 7 up to and including yesterday),
    // matching the date range shown on the custom selections page (AQD-1604)
    const windowEnd = new Date()
    windowEnd.setHours(0, 0, 0, 0)
    const windowStart = new Date(windowEnd)
    windowStart.setDate(windowEnd.getDate() - 7)

    // Total possible hours in the window, normally 7 * 24 = 168
    // (worked out from the dates so clock-change weeks give 167 or 169)
    const totalHoursInWindow = Math.round((windowEnd - windowStart) / 3600000)

    // Ask for the day before the window too, so the whole window is covered
    // whatever the time zone. The API takes UTC dates
    const oneHourMs = 3600000
    const toApiDate = (d) => d.toISOString().slice(0, 10)
    const startDate = toApiDate(
      new Date(windowStart.getTime() - 24 * oneHourMs)
    )
    const endDate = toApiDate(new Date())

    const results = {}
    for (const pol of pollutantDefs) {
      const measurements = await getPollutantMeasurements(
        stationId,
        pol.apiName,
        startDate,
        endDate
      )

      if (!measurements.length) {
        // eslint-disable-next-line no-console
        console.log(`[${pol.key}] No measurements returned`)
        continue
      }

      // Keep only valid hours that fall inside the last 7 days, once per hour.
      // Sulphur dioxide also has 15-minute readings - keep hourly rows only so
      // each hour is counted once. Missing hours come back as -9999.
      // Each hour is placed by its startDateTime, so 23:00-24:00 counts on its own day
      const seenHours = new Set()
      const parsed = measurements
        .filter(
          (m) =>
            Date.parse(m.endDateTime) - Date.parse(m.startDateTime) ===
            oneHourMs
        )
        .map((m) => ({
          date: new Date(m.startDateTime),
          value: Number(m.value)
        }))
        .filter(
          (r) =>
            !isNaN(r.date.getTime()) && Number.isFinite(r.value) && r.value >= 0
        )
        .filter((r) => r.date >= windowStart && r.date < windowEnd)
        .filter((r) => {
          const hourKey = r.date.getTime()
          if (seenHours.has(hourKey)) return false
          seenHours.add(hourKey)
          return true
        })

      const byDay = new Map()
      for (const r of parsed) {
        // Group by local date to match front-end calculations
        const yyyy = r.date.getFullYear()
        const mm = String(r.date.getMonth() + 1).padStart(2, '0')
        const dd = String(r.date.getDate()).padStart(2, '0')
        const key = `${yyyy}-${mm}-${dd}`
        if (!byDay.has(key)) byDay.set(key, [])
        byDay.get(key).push(r.value)
      }

      const hoursInDay = 24
      const coverageThreshold = 0.75
      const minHours = Math.ceil(hoursInDay * coverageThreshold) // 18

      let acceptedValues = []
      const acceptedDays = []
      const rejectedDays = []
      const dailyMeans = []
      for (const [day, valuesForDay] of byDay) {
        if (valuesForDay.length >= minHours) {
          acceptedDays.push(day)
          acceptedValues = acceptedValues.concat(valuesForDay)
          dailyMeans.push({
            day,
            mean: valuesForDay.reduce((s, v) => s + v, 0) / valuesForDay.length
          })
        } else {
          rejectedDays.push(day)
        }
      }

      // Daily exceedances: days (with >= 75% coverage) whose mean is over the limit
      const dailyExceedances =
        pol.dailyThreshold != null
          ? dailyMeans.filter((d) => d.mean > pol.dailyThreshold).length
          : null

      // Hourly exceedances: valid hourly readings over the limit
      const hourlyExceedances =
        pol.hourlyThreshold != null
          ? parsed.filter((r) => r.value > pol.hourlyThreshold).length
          : null

      const average =
        acceptedValues.length > 0
          ? acceptedValues.reduce((sum, v) => sum + v, 0) /
            acceptedValues.length
          : null
      const roundedAverage = average != null ? Math.round(average) : null

      // Data capture % = valid hourly measurements / total possible hours,
      // same method as the annual data capture test
      const dataCapturePercent = Math.round(
        (parsed.length / totalHoursInWindow) * 100
      )

      results[pol.key] = {
        apiName: pol.apiName,
        rawAverage: average,
        roundedAverage,
        dataCapturePercent,
        dailyExceedances,
        hourlyExceedances,
        acceptedDays,
        rejectedDays,
        validHoursCount: parsed.length
      }

      // eslint-disable-next-line no-console
      console.log(
        `[${pol.key}] last 7 days average: ${roundedAverage} | data capture: ${dataCapturePercent}% (${parsed.length}/${totalHoursInWindow} hours) | daily exceedances: ${dailyExceedances ?? 'n/a'} | hourly exceedances: ${hourlyExceedances ?? 'n/a'} | accepted days: ${acceptedDays.length}, rejected days: ${rejectedDays.length}`
      )
    }

    try {
      allure.addAttachment(
        `Last 7 Days Averages (${stationId})`,
        JSON.stringify(
          {
            windowStart: windowStart.toISOString(),
            windowEnd: windowEnd.toISOString(),
            totalHoursInWindow,
            results
          },
          null,
          2
        ),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    // The window is 7 full days, so no pollutant can have more than 7 days
    // or more than 100% data capture
    for (const r of Object.values(results)) {
      await expect(
        r.acceptedDays.length + r.rejectedDays.length
      ).toBeLessThanOrEqual(7)
      await expect(r.dataCapturePercent).toBeLessThanOrEqual(100)
      // Can't exceed on more days than were accepted, or more hours than were valid
      if (r.dailyExceedances != null) {
        await expect(r.dailyExceedances).toBeLessThanOrEqual(
          r.acceptedDays.length
        )
      }
      if (r.hourlyExceedances != null) {
        await expect(r.hourlyExceedances).toBeLessThanOrEqual(r.validHoursCount)
      }
    }

    // The feed should contain recent data for at least one pollutant
    const pollutantsWithData = Object.values(results).filter(
      (r) => r.validHoursCount > 0
    )
    await expect(pollutantsWithData.length).toBeGreaterThan(0)

    return results
  }

  // Summary table row order on the station page when all five are measured
  const allSummaryTablePollutants = [
    'PM2.5',
    'PM10',
    'Nitrogen dioxide',
    'Ozone',
    'Sulphur dioxide'
  ]

  // Compares our last 7 days calculations with the station page currently open
  // (Last 7 days view). pollutantsOnPage lists the summary table rows in order,
  // for stations that only measure some pollutants.
  // Returns the comparison rows for any extra checks
  const compareLastSevenDaysWithFrontEnd = async (
    results,
    pollutantsOnPage = allSummaryTablePollutants
  ) => {
    await monitoringStationPage.getAverageCell(0).waitForExist({
      timeout: 5000
    })

    // The table should have exactly one row per pollutant we expect
    await expect(await monitoringStationPage.getAverageCells.length).toEqual(
      pollutantsOnPage.length
    )

    // Front-end elements for each pollutant, by its row in the summary table
    const frontEndElements = Object.fromEntries(
      pollutantsOnPage.map((pollutant, rowIndex) => [
        pollutant,
        {
          average: monitoringStationPage.getAverageCell(rowIndex),
          dataCapture: monitoringStationPage.getDataCaptureCell(rowIndex),
          dailyExceedances:
            monitoringStationPage.getDailyExceedanceCell(rowIndex),
          hourlyExceedances:
            monitoringStationPage.getHourlyExceedanceCell(rowIndex)
        }
      ])
    )

    // Read every front-end value first so all mismatches are reported together.
    // Cells with no number (e.g. no legal limit) parse to null, matching our null
    const comparisons = []
    for (const [pollutant, elements] of Object.entries(frontEndElements)) {
      const backEnd = results[pollutant] ?? {}
      const backEndValues = {
        average: backEnd.roundedAverage ?? null,
        dataCapture: backEnd.dataCapturePercent ?? null,
        dailyExceedances: backEnd.dailyExceedances ?? null,
        hourlyExceedances: backEnd.hourlyExceedances ?? null
      }
      for (const [measure, element] of Object.entries(elements)) {
        const frontEndText = await element.getText()
        comparisons.push({
          pollutant,
          measure,
          backEnd: backEndValues[measure],
          frontEnd: common.parseNumber(frontEndText),
          frontEndText
        })
      }
    }

    // eslint-disable-next-line no-console
    console.table(comparisons)
    try {
      allure.addAttachment(
        'Last 7 Days Back End vs Front End',
        JSON.stringify(comparisons, null, 2),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    for (const c of comparisons) {
      const isExceedance =
        c.measure === 'dailyExceedances' || c.measure === 'hourlyExceedances'
      const isLowDataCapture =
        results[c.pollutant]?.dataCapturePercent != null &&
        results[c.pollutant].dataCapturePercent < lowDataCaptureThreshold
      if (isExceedance && c.backEnd === null) {
        // No legal limit for this pollutant - the cell should say so
        await expect(c.frontEndText).toMatch(/no legal limit/i)
      } else if (c.measure === 'average' && isLowDataCapture) {
        // Low data capture - the average is not calculated and shows "-"
        await expect(c.frontEndText.trim()).toBe('-')
      } else {
        await expect(c.frontEnd).toEqual(c.backEnd)
      }
    }

    // Any pollutant under 75% data capture should show the "Low data capture" tag
    const anyLowDataCapture = Object.values(results).some(
      (r) =>
        r.dataCapturePercent != null &&
        r.dataCapturePercent < lowDataCaptureThreshold
    )
    if (anyLowDataCapture) {
      await expect(
        await monitoringStationPage.getLowDataCaptureFlag.isDisplayed()
      ).toBe(true)
      await expect(
        await monitoringStationPage.getLowDataCaptureFlag.getText()
      ).toMatch('Low data capture')
    }

    return comparisons
  }

  it('testing atom api and calculations for last 7 days average, data capture, and exceedances. AQD-1535,AQD-1550', async () => {
    const results = await calculateLastSevenDays('UKA00211')

    // comparing to the front end
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.getLastSevenDaysButton.click()
    await common.legalWait()

    await compareLastSevenDaysWithFrontEnd(results)
  })

  it('testing atom api and calculations for last 7 days with low data capture for Milton Keynes Civic Centre. AQD-1535,AQD-1550', async () => {
    const results = await calculateLastSevenDays('UKA00963')

    // This test covers the low data capture scenario - ozone at this site
    // should be under 75% data capture for the last 7 days
    await expect(results.Ozone).toBeDefined()
    await expect(results.Ozone.dataCapturePercent).toBeLessThan(
      lowDataCaptureThreshold
    )

    // comparing to the front end
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('milton keynes')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('Milton Keynes')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Milton Keynes Civic Centre')
      .click()
    await monitoringStationPage.getLastSevenDaysButton.click()
    await common.legalWait()

    // Milton Keynes Civic Centre only measures PM2.5, PM10 and ozone,
    // so the summary table only has these three rows
    const pollutantsOnPage = ['PM2.5', 'PM10', 'Ozone']
    await compareLastSevenDaysWithFrontEnd(results, pollutantsOnPage)

    // Ozone specifically: low data capture % matches, and no average is shown
    const ozoneRow = pollutantsOnPage.indexOf('Ozone')
    const ozoneDataCaptureFrontEnd = common.parseNumber(
      await monitoringStationPage.getDataCaptureCell(ozoneRow).getText()
    )
    await expect(ozoneDataCaptureFrontEnd).toEqual(
      results.Ozone.dataCapturePercent
    )
    const ozoneAverageFrontEnd = await monitoringStationPage
      .getAverageCell(ozoneRow)
      .getText()
    await expect(ozoneAverageFrontEnd.trim()).toBe('-')
  })

  // Works out the last 24 hours average, data capture and hourly exceedances
  // per pollutant from the UK-AIR API for one station (e.g. 'UKA00211' for
  // London Bloomsbury). The window is the latest available hour for the
  // station plus the 23 hours immediately before it (24 hourly timestamps)
  const calculateLastTwentyFourHours = async (stationId) => {
    // Hourly exceedance thresholds (µg/m³), null where there is no hourly
    // legal limit. Values count once they would round above the legal limit,
    // same as the last 7 days test: NO2 hourly limit 200, sulphur dioxide
    // hourly limit 350.
    // apiName is the pollutant-name the UK-AIR API expects
    const pollutantDefs = [
      { key: 'PM10', apiName: 'GE10', hourlyThreshold: null },
      { key: 'PM2.5', apiName: 'PM25', hourlyThreshold: null },
      { key: 'Nitrogen dioxide', apiName: 'NO2', hourlyThreshold: 200.4 },
      { key: 'Ozone', apiName: 'O3', hourlyThreshold: null },
      { key: 'Sulphur dioxide', apiName: 'SO2', hourlyThreshold: 350.4 }
    ]
    const hourlyThresholds = Object.fromEntries(
      pollutantDefs.map((pol) => [pol.key, pol.hourlyThreshold])
    )

    const oneHourMs = 3600000
    const hoursInWindow = 24

    // 3 days ago to today, so the window is covered whatever the latest hour is
    const toApiDate = (d) => d.toISOString().slice(0, 10)
    const now = new Date()
    const startDate = toApiDate(new Date(now.getTime() - 3 * 24 * oneHourMs))
    const endDate = toApiDate(now)

    // Valid hourly readings for each pollutant, once per hour.
    // Each reading is timed by its endDateTime
    const readingsByPollutant = {}
    for (const pol of pollutantDefs) {
      const measurements = await getPollutantMeasurements(
        stationId,
        pol.apiName,
        startDate,
        endDate
      )

      if (!measurements.length) {
        // eslint-disable-next-line no-console
        console.log(`[${pol.key}] No measurements returned`)
        continue
      }

      // Sulphur dioxide also has 15-minute readings - keep hourly rows only so
      // each hour is counted once. Missing hours come back as -9999
      const seenHours = new Set()
      readingsByPollutant[pol.key] = measurements
        .filter(
          (m) =>
            Date.parse(m.endDateTime) - Date.parse(m.startDateTime) ===
            oneHourMs
        )
        .map((m) => ({ date: new Date(m.endDateTime), value: Number(m.value) }))
        .filter(
          (r) =>
            !isNaN(r.date.getTime()) && Number.isFinite(r.value) && r.value >= 0
        )
        .filter((r) => {
          const hourKey = r.date.getTime()
          if (seenHours.has(hourKey)) return false
          seenHours.add(hourKey)
          return true
        })
    }

    // Latest available hour for the station, across all pollutants
    const allHours = Object.values(readingsByPollutant).flatMap((readings) =>
      readings.map((r) => r.date.getTime())
    )
    await expect(allHours.length).toBeGreaterThan(0)
    const latestHour = new Date(Math.max(...allHours))
    // 23 hours before the latest hour, so the window holds 24 hourly timestamps
    const windowStart = new Date(
      latestHour.getTime() - (hoursInWindow - 1) * oneHourMs
    )

    const results = {}
    for (const [pollutant, readings] of Object.entries(readingsByPollutant)) {
      const inWindow = readings.filter(
        (r) => r.date >= windowStart && r.date <= latestHour
      )

      const average =
        inWindow.length > 0
          ? inWindow.reduce((sum, r) => sum + r.value, 0) / inWindow.length
          : null
      const roundedAverage = average != null ? Math.round(average) : null

      // Valid hours out of the 24 in the window
      const dataCapturePercent = Math.round(
        (inWindow.length / hoursInWindow) * 100
      )

      // Hourly exceedances: valid hourly readings in the window over the limit
      const hourlyThreshold = hourlyThresholds[pollutant]
      const hourlyExceedances =
        hourlyThreshold != null
          ? inWindow.filter((r) => r.value > hourlyThreshold).length
          : null

      results[pollutant] = {
        rawAverage: average,
        roundedAverage,
        dataCapturePercent,
        hourlyExceedances,
        validHoursCount: inWindow.length
      }

      // eslint-disable-next-line no-console
      console.log(
        `[${pollutant}] last 24 hours average: ${roundedAverage} | data capture: ${dataCapturePercent}% (${inWindow.length}/${hoursInWindow} hours) | hourly exceedances: ${hourlyExceedances ?? 'n/a'}`
      )
    }

    // eslint-disable-next-line no-console
    console.log(
      `[${stationId}] last 24 hours window (API): ${windowStart.toISOString()} to ${latestHour.toISOString()}`
    )

    try {
      allure.addAttachment(
        `Last 24 Hours Averages (${stationId})`,
        JSON.stringify(
          {
            windowStart: windowStart.toISOString(),
            latestHour: latestHour.toISOString(),
            results
          },
          null,
          2
        ),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    // The window is 24 hours, so no pollutant can have more than 24 valid hours
    // or more than 100% data capture
    for (const r of Object.values(results)) {
      await expect(r.validHoursCount).toBeLessThanOrEqual(hoursInWindow)
      await expect(r.dataCapturePercent).toBeLessThanOrEqual(100)
      // Can't exceed in more hours than were valid
      if (r.hourlyExceedances != null) {
        await expect(r.hourlyExceedances).toBeLessThanOrEqual(r.validHoursCount)
      }
    }

    return results
  }

  // Compares our last 24 hours average, data capture and hourly exceedances
  // with the station page currently open
  // (Last 24 hours view). pollutantsOnPage lists the summary table rows in
  // order, for stations that only measure some pollutants.
  // Returns the comparison rows for any extra checks
  const compareLastTwentyFourHoursWithFrontEnd = async (
    results,
    pollutantsOnPage = allSummaryTablePollutants
  ) => {
    await monitoringStationPage.getAverageCell(0).waitForExist({
      timeout: 5000
    })

    // The table should have exactly one row per pollutant we expect
    await expect(await monitoringStationPage.getAverageCells.length).toEqual(
      pollutantsOnPage.length
    )

    // Time period the front end says it is showing, to compare with our window
    const frontEndDuration =
      await monitoringStationPage.getLast24HoursTimeDuration.getText()
    // eslint-disable-next-line no-console
    console.log(`last 24 hours window (front end): ${frontEndDuration}`)

    // Front-end elements for each pollutant, by its row in the summary table.
    // The last 24 hours view has no daily exceedances column
    const frontEndElements = Object.fromEntries(
      pollutantsOnPage.map((pollutant, rowIndex) => [
        pollutant,
        {
          average: monitoringStationPage.getAverageCell(rowIndex),
          dataCapture: monitoringStationPage.getDataCaptureCell(rowIndex),
          hourlyExceedances:
            monitoringStationPage.getHourlyExceedanceCell(rowIndex)
        }
      ])
    )

    // Read every front-end value first so all mismatches are reported together.
    // Cells with no number (e.g. no legal limit) parse to null, matching our null
    const comparisons = []
    for (const [pollutant, elements] of Object.entries(frontEndElements)) {
      const backEnd = results[pollutant] ?? {}
      const backEndValues = {
        average: backEnd.roundedAverage ?? null,
        dataCapture: backEnd.dataCapturePercent ?? null,
        hourlyExceedances: backEnd.hourlyExceedances ?? null
      }
      for (const [measure, element] of Object.entries(elements)) {
        const frontEndText = await element.getText()
        comparisons.push({
          pollutant,
          measure,
          backEnd: backEndValues[measure],
          frontEnd: common.parseNumber(frontEndText),
          frontEndText
        })
      }
    }

    // eslint-disable-next-line no-console
    console.table(comparisons)
    try {
      allure.addAttachment(
        'Last 24 Hours Back End vs Front End',
        JSON.stringify(comparisons, null, 2),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    for (const c of comparisons) {
      const isLowDataCapture =
        results[c.pollutant]?.dataCapturePercent != null &&
        results[c.pollutant].dataCapturePercent < lowDataCaptureThreshold
      if (c.measure === 'hourlyExceedances' && c.backEnd === null) {
        // No hourly legal limit for this pollutant - the cell should say so
        await expect(c.frontEndText).toMatch(/no legal limit/i)
      } else if (c.measure === 'average' && isLowDataCapture) {
        // Low data capture - the average is not calculated and shows "-"
        await expect(c.frontEndText.trim()).toBe('-')
      } else {
        await expect(c.frontEnd).toEqual(c.backEnd)
      }
    }

    // Any pollutant under 75% data capture should show the "Low data capture" tag
    const anyLowDataCapture = Object.values(results).some(
      (r) =>
        r.dataCapturePercent != null &&
        r.dataCapturePercent < lowDataCaptureThreshold
    )
    if (anyLowDataCapture) {
      await expect(
        await monitoringStationPage.getLowDataCaptureFlag.isDisplayed()
      ).toBe(true)
      await expect(
        await monitoringStationPage.getLowDataCaptureFlag.getText()
      ).toMatch('Low data capture')
    }

    return comparisons
  }

  it('testing api and calculations for last 24 hours average, data capture, and exceedances. AQD-1534', async () => {
    const results = await calculateLastTwentyFourHours('UKA00211')

    // comparing to the front end
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.getLast24HoursButton.click()
    await common.legalWait()

    await compareLastTwentyFourHoursWithFrontEnd(results)
  })

  // Works out the Daily Air Quality Index averages per pollutant from the
  // UK-AIR API for one station (e.g. 'UKA00211' for London Bloomsbury).
  // Each pollutant uses its own DAQI averaging period, all ending at the
  // latest available hour for the station:
  //   PM2.5, PM10 - 24 hour average
  //   Nitrogen dioxide - hourly average (latest hour)
  //   Ozone - 8 hour rolling average (latest 8 hours)
  //   Sulphur dioxide - 15 minute concentration (latest 15 minutes)
  const calculateAverages = async (stationId) => {
    const oneHourMs = 3600000
    const fifteenMinutesMs = 900000

    // apiName is the pollutant-name the UK-AIR API expects.
    // readingMs is the length of reading to use (hourly or 15-minute rows),
    // windowHours is how many hours the average covers
    const pollutantDefs = [
      {
        key: 'PM2.5',
        apiName: 'PM25',
        method: '24 hour average',
        readingMs: oneHourMs,
        windowHours: 24
      },
      {
        key: 'PM10',
        apiName: 'GE10',
        method: '24 hour average',
        readingMs: oneHourMs,
        windowHours: 24
      },
      {
        key: 'Nitrogen dioxide',
        apiName: 'NO2',
        method: 'hourly average',
        readingMs: oneHourMs,
        windowHours: 1
      },
      {
        key: 'Ozone',
        apiName: 'O3',
        method: '8 hour rolling average',
        readingMs: oneHourMs,
        windowHours: 8
      },
      {
        key: 'Sulphur dioxide',
        apiName: 'SO2',
        method: '15 minute concentration',
        readingMs: fifteenMinutesMs,
        windowHours: 0.25
      }
    ]

    // 3 days ago to today, so every window is covered whatever the latest hour is
    const toApiDate = (d) => d.toISOString().slice(0, 10)
    const now = new Date()
    const startDate = toApiDate(new Date(now.getTime() - 3 * 24 * oneHourMs))
    const endDate = toApiDate(now)

    // Valid readings for each pollutant, once per timestamp, of the reading
    // length that pollutant uses. Each reading is timed by its endDateTime
    const readingsByPollutant = {}
    for (const pol of pollutantDefs) {
      const measurements = await getPollutantMeasurements(
        stationId,
        pol.apiName,
        startDate,
        endDate
      )

      if (!measurements.length) {
        // eslint-disable-next-line no-console
        console.log(`[${pol.key}] No measurements returned`)
        continue
      }

      // Sulphur dioxide has both hourly and 15-minute rows - keep only the
      // length this pollutant uses. Missing readings come back as -9999
      const seenTimes = new Set()
      readingsByPollutant[pol.key] = measurements
        .filter(
          (m) =>
            Date.parse(m.endDateTime) - Date.parse(m.startDateTime) ===
            pol.readingMs
        )
        .map((m) => ({ date: new Date(m.endDateTime), value: Number(m.value) }))
        .filter(
          (r) =>
            !isNaN(r.date.getTime()) && Number.isFinite(r.value) && r.value >= 0
        )
        .filter((r) => {
          const timeKey = r.date.getTime()
          if (seenTimes.has(timeKey)) return false
          seenTimes.add(timeKey)
          return true
        })
    }

    // Latest available hour for the station, across the hourly pollutants
    const hourlyPollutants = pollutantDefs
      .filter((pol) => pol.readingMs === oneHourMs)
      .map((pol) => pol.key)
    const allHours = hourlyPollutants.flatMap((key) =>
      (readingsByPollutant[key] ?? []).map((r) => r.date.getTime())
    )
    await expect(allHours.length).toBeGreaterThan(0)
    const latestHour = new Date(Math.max(...allHours))

    const results = {}
    for (const pol of pollutantDefs) {
      const readings = readingsByPollutant[pol.key]
      if (!readings) continue

      // Window ends at the latest hour and goes back windowHours, e.g. the
      // 24 hour average covers the latest hour and the 23 hours before it,
      // the 15 minute concentration is the reading ending at the latest hour
      const windowStartExclusive = new Date(
        latestHour.getTime() - pol.windowHours * oneHourMs
      )
      const inWindow = readings.filter(
        (r) => r.date > windowStartExclusive && r.date <= latestHour
      )
      const expectedReadings = Math.round(
        (pol.windowHours * oneHourMs) / pol.readingMs
      )

      const average =
        inWindow.length > 0
          ? inWindow.reduce((sum, r) => sum + r.value, 0) / inWindow.length
          : null
      const roundedAverage = average != null ? Math.round(average) : null

      results[pol.key] = {
        method: pol.method,
        rawAverage: average,
        roundedAverage,
        validReadingsCount: inWindow.length,
        expectedReadings
      }

      // eslint-disable-next-line no-console
      console.log(
        `[${pol.key}] ${pol.method}: ${roundedAverage} (${inWindow.length}/${expectedReadings} readings)`
      )
    }

    // eslint-disable-next-line no-console
    console.log(
      `[${stationId}] DAQI averages up to latest hour (API): ${latestHour.toISOString()}`
    )

    try {
      allure.addAttachment(
        `DAQI Averages (${stationId})`,
        JSON.stringify(
          { latestHour: latestHour.toISOString(), results },
          null,
          2
        ),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    // No window can hold more readings than it has time slots for
    for (const r of Object.values(results)) {
      await expect(r.validReadingsCount).toBeLessThanOrEqual(r.expectedReadings)
    }

    return results
  }

  // Compares our DAQI averages with the station page currently open
  // (Daily Air Quality Index tab). Returns the comparison rows for any
  // extra checks
  const compareAveragesWithFrontEnd = async (results) => {
    await monitoringStationPage.getPM10DaqiAverageValue.waitForExist({
      timeout: 5000
    })

    // Front-end average for each pollutant. The DAQI table lists PM10 first
    const frontEndElements = {
      PM10: monitoringStationPage.getPM10DaqiAverageValue,
      'PM2.5': monitoringStationPage.getPM25DaqiAverageValue,
      'Nitrogen dioxide':
        monitoringStationPage.getNitrogenDioxideDaqiAverageValue,
      Ozone: monitoringStationPage.getOzoneDaqiAverageValue,
      'Sulphur dioxide': monitoringStationPage.getSulphurDioxideDaqiAverageValue
    }

    // Read every front-end value first so all mismatches are reported together
    const comparisons = []
    for (const [pollutant, element] of Object.entries(frontEndElements)) {
      const frontEndText = await element.getText()
      comparisons.push({
        pollutant,
        method: results[pollutant]?.method ?? null,
        backEnd: results[pollutant]?.roundedAverage ?? null,
        frontEnd: common.parseNumber(frontEndText),
        frontEndText
      })
    }

    // eslint-disable-next-line no-console
    console.table(comparisons)
    try {
      allure.addAttachment(
        'DAQI Averages Back End vs Front End',
        JSON.stringify(comparisons, null, 2),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    for (const c of comparisons) {
      await expect(c.frontEnd).toEqual(c.backEnd)
    }

    return comparisons
  }

  // DAQI index bands (µg/m³) per pollutant - the upper limit of each index
  // from 1 to 9. Anything above the index 9 limit is index 10
  const daqiUpperLimits = {
    'Nitrogen dioxide': [67, 134, 200, 267, 334, 400, 467, 534, 600],
    Ozone: [33, 66, 100, 120, 140, 160, 187, 213, 240],
    'Sulphur dioxide': [88, 177, 266, 354, 443, 532, 710, 887, 1064],
    'PM2.5': [11, 23, 35, 41, 47, 53, 58, 64, 70],
    PM10: [16, 33, 50, 58, 66, 75, 83, 91, 100]
  }

  // Index 1-3 Low, 4-6 Moderate, 7-9 High, 10 Very High
  const getDaqiBand = (index) => {
    if (index == null) return null
    if (index <= 3) return 'Low'
    if (index <= 6) return 'Moderate'
    if (index <= 9) return 'High'
    return 'Very High'
  }

  // Works out the DAQI index and band for each pollutant from its rounded
  // average (from calculateAverages)
  const calculateDaqi = (results) => {
    const daqiResults = {}
    for (const [pollutant, upperLimits] of Object.entries(daqiUpperLimits)) {
      const average = results[pollutant]?.roundedAverage ?? null
      let index = null
      if (average != null) {
        const bandPosition = upperLimits.findIndex((limit) => average <= limit)
        index = bandPosition === -1 ? 10 : bandPosition + 1
      }
      daqiResults[pollutant] = {
        average,
        index,
        band: getDaqiBand(index)
      }

      // eslint-disable-next-line no-console
      console.log(
        `[${pollutant}] average: ${average} | DAQI index: ${index} (${getDaqiBand(index)})`
      )
    }

    try {
      allure.addAttachment(
        'DAQI Index',
        JSON.stringify(daqiResults, null, 2),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    return daqiResults
  }

  // Compares our DAQI index for each pollutant with the station page
  // currently open (Daily Air Quality Index tab). Returns the comparison rows
  // for any extra checks
  const compareDaqiWithFrontEnd = async (daqiResults) => {
    await monitoringStationPage.getPM10DaqiIndex.waitForExist({
      timeout: 5000
    })

    const frontEndElements = {
      'PM2.5': monitoringStationPage.getPM25DaqiIndex,
      PM10: monitoringStationPage.getPM10DaqiIndex,
      'Nitrogen dioxide': monitoringStationPage.getNitrogenDioxideDaqiIndex,
      Ozone: monitoringStationPage.getOzoneDaqiIndex,
      'Sulphur dioxide': monitoringStationPage.getSulphurDioxideDaqiIndex
    }

    // Read every front-end value first so all mismatches are reported together
    const comparisons = []
    for (const [pollutant, element] of Object.entries(frontEndElements)) {
      const frontEndText = await element.getText()
      comparisons.push({
        pollutant,
        average: daqiResults[pollutant]?.average ?? null,
        backEndIndex: daqiResults[pollutant]?.index ?? null,
        backEndBand: daqiResults[pollutant]?.band ?? null,
        frontEndIndex: common.parseNumber(frontEndText),
        frontEndText
      })
    }

    // eslint-disable-next-line no-console
    console.table(comparisons)
    try {
      allure.addAttachment(
        'DAQI Index Back End vs Front End',
        JSON.stringify(comparisons, null, 2),
        'application/json'
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Allure attachment failed:', e.message)
    }

    for (const c of comparisons) {
      await expect(c.frontEndIndex).toEqual(c.backEndIndex)
      // If the cell also shows the band (e.g. "3 Low"), check that too
      if (/[a-z]/i.test(c.frontEndText) && c.backEndBand) {
        await expect(c.frontEndText).toMatch(new RegExp(c.backEndBand, 'i'))
      }
    }

    return comparisons
  }

  it('AQD-1533, Daily Air Quality Index tab, testing calculations for average, daqi range and comparing to front end', async () => {
    const results = await calculateAverages('UKA00211')

    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.getDaqiTab.click()
    await common.legalWait()

    await compareAveragesWithFrontEnd(results)

    // daqi index
    const daqiResults = calculateDaqi(results)
    await compareDaqiWithFrontEnd(daqiResults)
  })
})
