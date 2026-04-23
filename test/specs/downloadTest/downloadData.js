import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
import fs from 'node:fs'
import path from 'node:path'
// import createLogger from 'helpers/logger'
import searchPage from '../../page-objects/searchPage.js'
import hubPage from '../../page-objects/hubPage.js'
import disambigurationPage from '../../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../../page-objects/monitoringStationPage.js'

const downloadsDir = path.resolve(process.cwd(), 'downloads')

const waitForDownload = async (filenamePattern, timeoutMs = 15000) => {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const files = fs.existsSync(downloadsDir)
      ? fs.readdirSync(downloadsDir)
      : []
    const match = files.find(
      (f) => filenamePattern.test(f) && !f.endsWith('.crdownload')
    )
    if (match) return match
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  return null
}

/* run these locally in dev every release */
describe('download data function', () => {
  it('downloading hourly data', async () => {
    // clear downloads folder before test
    if (fs.existsSync(downloadsDir)) {
      fs.readdirSync(downloadsDir).forEach((f) =>
        fs.rmSync(path.join(downloadsDir, f))
      )
    }

    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.getStartNowBtn.click()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('Birmingham')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Oldbury Birmingham Road')
      .click()

    await monitoringStationPage.getDownloadAllPollutantsHourlyData.click()
    const hourlyFile = await waitForDownload(/Hourly/i)
    // eslint-disable-next-line no-console
    console.log(`Hourly download: ${hourlyFile}`)
    await expect(hourlyFile).not.toBeNull()

    await monitoringStationPage.getDownloadAllPollutantsDailyDataLink.click()
    const dailyFile = await waitForDownload(/Daily/i)
    // eslint-disable-next-line no-console
    console.log(`Daily download: ${dailyFile}`)
    await expect(dailyFile).not.toBeNull()

    await monitoringStationPage.getDownloadAllPollutantsAnnualDataLink.click()
    const annualFile = await waitForDownload(/Annual/i)
    // eslint-disable-next-line no-console
    console.log(`Annual download: ${annualFile}`)
    await expect(annualFile).not.toBeNull()
  })
})
