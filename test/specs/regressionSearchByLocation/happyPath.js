import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import searchPage from '../../page-objects/searchPage.js'
// import resultsPage from '../page-objects/resultsPage.js'
// import monitoringStationPage from '../page-objects/monitoringStationPage.js'
import headersObject from '../../page-objects/header.js'
import footer from '../../page-objects/footer.js'
import createLogger from '../../helpers/logger.js'
import disambigurationPage from '../../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../../page-objects/monitoringStationPage.js'
// import hubPage from '../page-objects/hubPage.js'

const logger = createLogger()
describe('happyPath', () => {
  it('simple test', async () => {
    logger.info('---happyPath StartScenario--------')
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()

    // startnow-block
    const isHeaderOverallDisplayedSB =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayedSB =
      await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayedSB).toBe(true)
    await expect(isFooterOverallDisplayedSB).toBe(true)
    const startNowHeading = 'Get air pollution data'
    const getStartNowHeading =
      await startNowPage.getStartNowPageHeading.getText()
    await expect(startNowHeading).toMatch(getStartNowHeading)
    await startNowPage.startNowBtnClick()
    // await hubPage.getFindMonitoringStationsByLocation.click()

    // search block
    const isHeaderOverallDisplayedSearch =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayedSearch =
      await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayedSearch).toBe(true)
    await expect(isFooterOverallDisplayedSearch).toBe(true)
    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()

    // results block
    const isHeaderOverallDisplayedResults =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayedResults =
      await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayedResults).toBe(true)
    await expect(isFooterOverallDisplayedResults).toBe(true)
    await disambigurationPage.locationLinkClick('Birmingham')

    // monitor station list
    const isHeaderOverallDisplayedStationList =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayedStationList =
      await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayedStationList).toBe(true)
    await expect(isFooterOverallDisplayedStationList).toBe(true)
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham A4540 Roadside')
      .click()

    // monitoring station page
    const isHeaderOverallDisplayedMonitoringStation =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayedMonitoringStation =
      await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayedMonitoringStation).toBe(true)
    await expect(isFooterOverallDisplayedMonitoringStation).toBe(true)
    const getCurrentURLOfA450Roadside = await browser.getUrl()
    const expectedURLOfA450Roadside = '/stationdetails/BirminghamA4540Roadside'
    await expect(getCurrentURLOfA450Roadside).toMatch(expectedURLOfA450Roadside)
    const getMonitoringPageHeading =
      await monitoringStationPage.getMonitoringPageHeading.getText()
    const expectedMonitoringPageHeading = 'Birmingham A4540 Roadside'
    await expect(getMonitoringPageHeading).toMatch(
      expectedMonitoringPageHeading
    )
  })
})
