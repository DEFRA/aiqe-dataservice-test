import startNowPage from '../../page-objects/startnowpage.js'
import { expect } from '@wdio/globals'
import searchPage from '../../page-objects/searchPage.js'
// import hubPage from '../page-objects/hubPage.js'
import disambigurationPage from '../../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../../page-objects/monitoringStationPage.js'
import axios from 'axios'

/* run these locally in dev every release, uncomment disable javascript capability in local.conf */
describe('No Javascript Happy Path', () => {
  it('no javascript search by location flow and download', async () => {
    const baseUrl =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/'
    await browser.url(baseUrl)
    await browser.maximizeWindow()
    await startNowPage.getStartNowBtn.click()
    // await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('Birmingham')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham Ladywood')
      .click()
    // Validate Hourly download link resolves and is accessible
    const hourlyHref =
      await monitoringStationPage.getDownloadAllPollutantsHourlyData.getAttribute(
        'href'
      )
    expect(hourlyHref).toBeDefined()
    const hourlyUrl = new URL(hourlyHref || '', baseUrl).toString()
    const hourlyResp = await axios.get(hourlyUrl, {
      responseType: 'stream',
      validateStatus: (s) => s >= 200 && s < 400
    })
    expect(hourlyResp.status).toBeGreaterThanOrEqual(200)
    expect(hourlyResp.status).toBeLessThan(400)

    // Validate Daily download link resolves and is accessible
    const dailyHref =
      await monitoringStationPage.getDownloadAllPollutantsDailyDataLink.getAttribute(
        'href'
      )
    expect(dailyHref).toBeDefined()
    const dailyUrl = new URL(dailyHref || '', baseUrl).toString()
    const dailyResp = await axios.get(dailyUrl, {
      responseType: 'stream',
      validateStatus: (s) => s >= 200 && s < 400
    })
    expect(dailyResp.status).toBeGreaterThanOrEqual(200)
    expect(dailyResp.status).toBeLessThan(400)

    // Validate Annual download link resolves and is accessible
    const annualHref =
      await monitoringStationPage.getDownloadAllPollutantsAnnualDataLink.getAttribute(
        'href'
      )
    expect(annualHref).toBeDefined()
    const annualUrl = new URL(annualHref || '', baseUrl).toString()
    const annualResp = await axios.get(annualUrl, {
      responseType: 'stream',
      validateStatus: (s) => s >= 200 && s < 400
    })
    expect(annualResp.status).toBeGreaterThanOrEqual(200)
    expect(annualResp.status).toBeLessThan(400)
  })
  it('no javascript toggle tips', async () => {
    await monitoringStationPage.getPM25AnnualAverageToggleTip.isClickable()
    await monitoringStationPage.getPM25AnnualAverageToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText.isDisplayed()

    await monitoringStationPage.getPM10DailyExceedenceToggleTip.isClickable()
    await monitoringStationPage.getPM10DailyExceedenceToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    await monitoringStationPage.getPM10DailyExceedenceToggleTipInfoText.isDisplayed()

    await monitoringStationPage.getSDHourlyExceedenceToggleTip.isClickable()
    await monitoringStationPage.getSDHourlyExceedenceToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    await monitoringStationPage.getSDHourlyExceedenceToggleTipInfoText.isDisplayed()
  })
})
