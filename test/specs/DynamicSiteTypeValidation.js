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
import disambigurationPage from '../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'

describe('site type tests', () => {
  it('dynamic site type, AQD-735', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await startNowPage.startNowBtnClick()
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Southwark A2 Old Kent Road')
      .click()

    await monitoringStationPage.getSiteTypeToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const getUTSiteTypeText =
      await monitoringStationPage.getSiteTypeToggleTipInfoText.getText()
    const expectedUTSiteTypeText = `This monitoring site is in a city or town close to roads, motorways or highways.`
    await expect(getUTSiteTypeText).toMatch(expectedUTSiteTypeText)
    await browser.back()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Harlington')
      .click()
    await monitoringStationPage.getSiteTypeToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const getUISiteTypeText =
      await monitoringStationPage.getSiteTypeToggleTipInfoText.getText()
    const expectedUISiteTypeText = `This monitoring site is in a city or town, downwind of an industrial source.`
    await expect(getUISiteTypeText).toMatch(expectedUISiteTypeText)
    await browser.back()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('Horley')
      .click()
    await monitoringStationPage.getSiteTypeToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const getSISiteTypeText =
      await monitoringStationPage.getSiteTypeToggleTipInfoText.getText()
    const expectedSISiteTypeText = `This monitoring site is on the outskirts of an urban area (or in an area of its own), downwind of an industrial source.`
    await expect(getSISiteTypeText).toMatch(expectedSISiteTypeText)
    await browser.back()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bexley')
      .click()
    await monitoringStationPage.getSiteTypeToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const getSBSiteTypeText =
      await monitoringStationPage.getSiteTypeToggleTipInfoText.getText()
    const expectedSBSiteTypeText = `This monitoring site is on the outskirts of an urban area or in an area of its own. It is located so pollutant measurements do not come from one specific source.`
    await expect(getSBSiteTypeText).toMatch(expectedSBSiteTypeText)
    await browser.back()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('Rochester Stoke')
      .click()
    await monitoringStationPage.getSiteTypeToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const getRBSiteTypeText =
      await monitoringStationPage.getSiteTypeToggleTipInfoText.getText()
    const expectedRBSiteTypeText = `This monitoring area is in small settlements or areas with natural ecosystems, forests or crops. It is located so pollutant measurements do not come from one specific source.`
    await expect(getRBSiteTypeText).toMatch(expectedRBSiteTypeText)
    await browser.back()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Westminster')
      .click()
    await monitoringStationPage.getSiteTypeToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const getUBSiteTypeText =
      await monitoringStationPage.getSiteTypeToggleTipInfoText.getText()
    const expectedUBSiteTypeText = `This monitoring area is in a city or town. It is located so pollutant measurements do not come from one specific source.`
    await expect(getUBSiteTypeText).toMatch(expectedUBSiteTypeText)
    await browser.back()
  })
})
