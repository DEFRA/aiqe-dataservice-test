import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import searchPage from '../page-objects/searchPage.js'
// import resultsPage from '../page-objects/resultsPage.js'
// import monitoringStationPage from '../page-objects/monitoringStationPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'

describe('happyPath', () => {
  it('simple test', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    console.log("teststarted")
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()

    // startnow-block
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    const startNowHeading = 'Get air pollution data'
    const getStartNowHeading =
      await startNowPage.getStartNowPageHeading.getText()
    await expect(startNowHeading).toMatch(getStartNowHeading)
    await startNowPage.startNowBtnClick()

    // search block
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()

    // results block
    // await headersObject.getHeaderOverall.isDisplayed()
    // await footer.getFooterOverall.isDisplayed()
    // await resultsPage.firstLinkClick()

    // monitor station
    // await headersObject.headerOverall.isDisplayed()
    // await footer.footerOverall.isDisplayed()
    // const monitoringStationHeader = 'Birmingham A4540 Roadside'
    // const getmonitoringStationHeader =
    //  await monitoringStationPage.getResultsPageHeaderText.getText()
    // await expect(monitoringStationHeader).toMatch(getmonitoringStationHeader)
  })
})
