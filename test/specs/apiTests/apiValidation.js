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

// Persist coverage summary for reuse across tests in this file
let perPollutantCoverage = null
describe('API Testing', () => {
  it('monitoring station api availability and getting site id for one station', async () => {
    const apiKey = ''
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
    const apiKey = ''

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
    await expect(pollutants.length).toEqual(123)

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

  it('testing atom api and calculations for last 7 days average, data capture, and exceedances. AQD-1535,AQD-1550', async () => {
    // Exceedance thresholds (µg/m³), null where there is no legal limit.
    // Values count once they would round above the legal limit, matching
    // the existing daily/hourly exceedance tests:
    // PM10 daily limit 50, NO2 hourly limit 200,
    // sulphur dioxide daily limit 125 and hourly limit 350
    const pollutantDefs = [
      { key: 'PM10', code: 5, dailyThreshold: 50.5, hourlyThreshold: null },
      {
        key: 'PM2.5',
        code: 6001,
        dailyThreshold: null,
        hourlyThreshold: null
      },
      {
        key: 'Nitrogen dioxide',
        code: 8,
        dailyThreshold: null,
        hourlyThreshold: 200.4
      },
      { key: 'Ozone', code: 7, dailyThreshold: null, hourlyThreshold: null },
      {
        key: 'Sulphur dioxide',
        code: 1,
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

    // In the first week of January the window spans two yearly feeds
    const years = [
      ...new Set([windowStart.getFullYear(), windowEnd.getFullYear()])
    ]

    const parser = new xml2js.Parser({ explicitArray: false })
    let featureArray = []
    for (const year of years) {
      const urlAtom = `https://uk-air.defra.gov.uk/data/atom-dls/observations/auto/GB_FixedObservations_${year}_CLL2.xml`
      const response = await axios.get(urlAtom)
      const result = await parser.parseStringPromise(response.data)
      const featureMembers =
        result['gml:FeatureCollection']['gml:featureMember']
      featureArray = featureArray.concat(
        Array.isArray(featureMembers) ? featureMembers : [featureMembers]
      )
    }

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
            durationMs: Date.parse(fields[1]) - Date.parse(fields[0]),
            v: fields[4]
          }))
          .filter((r) => r.v !== undefined && r.v !== '-99')
      )

      // Some pollutants (e.g. sulphur dioxide) also have 15-minute readings in
      // the feed - keep hourly rows only so each hour is counted once
      const oneHourMs = 3600000
      const hourlyRows = rows.filter(
        (r) => isNaN(r.durationMs) || r.durationMs === oneHourMs
      )
      if (hourlyRows.length !== rows.length) {
        // eslint-disable-next-line no-console
        console.log(
          `[${pol.key}] ignored ${rows.length - hourlyRows.length} non-hourly rows (${matchingObservations.length} observations in feed)`
        )
      }

      // Keep only valid hours that fall inside the last 7 days,
      // once per hour in case the same hour appears more than once
      const seenHours = new Set()
      const parsed = hourlyRows
        .map((r) => ({ date: new Date(r.ts), value: Number(r.v) }))
        .filter((r) => !isNaN(r.date.getTime()) && !isNaN(r.value))
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
        code: pol.code,
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
        'Last 7 Days Averages (CLL2)',
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
    const pollutantsWithAverage = Object.values(results).filter(
      (r) => r.roundedAverage != null
    )
    await expect(pollutantsWithAverage.length).toBeGreaterThan(0)

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

    // Front-end elements for each pollutant, in summary table order
    const frontEndElements = {
      'PM2.5': {
        average: monitoringStationPage.getPM25AnnaulAverageST,
        dataCapture: monitoringStationPage.getPM25DataCapture,
        dailyExceedances: monitoringStationPage.getPM25DailyExceedence,
        hourlyExceedances: monitoringStationPage.getPM25HourlyExceedence
      },
      PM10: {
        average: monitoringStationPage.getPM10AnnaulAverageST,
        dataCapture: monitoringStationPage.getPM10DataCapture,
        dailyExceedances: monitoringStationPage.getPM10DailyExceedence,
        hourlyExceedances: monitoringStationPage.getPM10HourlyExceedence
      },
      'Nitrogen dioxide': {
        average: monitoringStationPage.getNitrogenDioxideAnnaulAverageST,
        dataCapture: monitoringStationPage.getNODataCapture,
        dailyExceedances: monitoringStationPage.getNODailyExceedence,
        hourlyExceedances: monitoringStationPage.getNOHourlyExceedence
      },
      Ozone: {
        average: monitoringStationPage.getOzoneAnnaulAverageST,
        dataCapture: monitoringStationPage.getOzoneDataCapture,
        dailyExceedances: monitoringStationPage.getOzoneDailyExceedence,
        hourlyExceedances: monitoringStationPage.getOzoneHourlyExceedence
      },
      'Sulphur dioxide': {
        average: monitoringStationPage.getSulphurDioxideAnnaulAverageST,
        dataCapture: monitoringStationPage.getSDDataCapture,
        dailyExceedances: monitoringStationPage.getSDDailyExceedence,
        hourlyExceedances: monitoringStationPage.getSDHourlyExceedence
      }
    }

    await monitoringStationPage.getPM25AnnaulAverageST.waitForExist({
      timeout: 5000
    })

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
      if (isExceedance && c.backEnd === null) {
        // No legal limit for this pollutant - the cell should say so
        await expect(c.frontEndText).toMatch(/no legal limit/i)
      } else {
        await expect(c.frontEnd).toEqual(c.backEnd)
      }
    }
  })
})
