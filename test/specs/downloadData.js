import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import searchPage from '../page-objects/searchPage.js'
// import hubPage from '../page-objects/hubPage.js'
import disambigurationPage from '../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'
/* run these locally in dev every release */
describe('download data function', () => {
  it('downloading hourly data', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.getStartNowBtn.click()
    // await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('Birmingham')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Oldbury Birmingham Road')
      .click()
    await monitoringStationPage.getDownloadAllPollutantsHourlyData.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )

    // Fetch browser logs
    const logs = await browser.getLogs('browser')

    // Look for the specific log entry
    const downloadLog = logs.find((log) =>
      log.message.includes('comes into getAPIstn_details1')
    )

    // Assert that the specific log entry exists
    expect(downloadLog).toBeDefined()

    await monitoringStationPage.getDownloadAllPollutantsDailyDataLink.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )

    // Fetch browser logs
    const dailyLogs = await browser.getLogs('browser')

    // Look for the specific log entry
    const dailydownloadLog = dailyLogs.find((log) =>
      log.message.includes('comes into getAPIstn_details1')
    )

    // Assert that the specific log entry exists
    expect(dailydownloadLog).toBeDefined()

    await monitoringStationPage.getDownloadAllPollutantsAnnualDataLink.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )

    // Fetch browser logs
    const annualLogs = await browser.getLogs('browser')

    // Look for the specific log entry
    const annualdownloadLog = annualLogs.find((log) =>
      log.message.includes('comes into getAPIstn_details1')
    )

    // Assert that the specific log entry exists
    expect(annualdownloadLog).toBeDefined()
  })
})
