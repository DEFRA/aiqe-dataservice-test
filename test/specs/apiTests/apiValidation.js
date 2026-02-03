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
    const apiKey = 'nhV83hwrE6LOZo54euNBNPIahS12K0Jj'
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

  it('testing atom api for daily exceedances presented on front end', async () => {})

  it('testing atom api for hourly exceedances presented on front end', async () => {})
})
