import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import searchPage from '../../page-objects/searchPage.js'
// import resultsPage from '../page-objects/resultsPage.js'
import headersObject from '../../page-objects/header.js'
import footer from '../../page-objects/footer.js'
import disambigurationPage from '../../page-objects/disambigurationPage.js'
import common from '../../page-objects/common.js'
import locationMonitoringStationListPage from '../../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../../page-objects/monitoringStationPage.js'
import hubPage from '../../page-objects/hubPage.js'

describe('DAC tests ', () => {
  it('Tooltip content on hover not accessible or dismissible , AQD-662', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()
    const isHeaderOverallDisplayed =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayed = await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayed).toBe(true)
    await expect(isFooterOverallDisplayed).toBe(true)
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.get2024Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return true
      },
      { timeout: 3000 }
    )

    await monitoringStationPage.getPM25AnnualAverageToggleTip.click()
    await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText.waitForDisplayed(
      { timeout: 10000 }
    )
    const getPM25AnnualAverageToggleTipInfoTextAfterClick = [
      await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText
    ]

    const getPM25AnnualAverageToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM25AnnualAverageToggleTipInfoTextAfterClick) {
      const styles = await common.getStyles(
        element,
        getPM25AnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }

    await monitoringStationPage.getPM10AnnualAverageToggleTip.moveTo()
    await monitoringStationPage.getPM10AnnualAverageToggleTip.waitForExist({
      timeout: 5000
    })
    const getPM10AnnualAverageToggleTipInfoTextHover = [
      await monitoringStationPage.getPM10AnnualAverageToggleTipInfoText
    ]

    const getPM10AnnualAverageToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM10AnnualAverageToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getPM10AnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }

    const getPM25AnnualAverageToggleTipInfoTextHover2 = [
      await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText
    ]

    const getPM25AnnualAverageToggleTipInfoTextProperties2 = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM25AnnualAverageToggleTipInfoTextHover2) {
      const styles = await common.getStyles(
        element,
        getPM25AnnualAverageToggleTipInfoTextProperties2
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }

    await monitoringStationPage.getPM10AnnualAverageToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return true
      },
      { timeout: 3000 }
    )
    const getPM25AnnualAverageToggleTipInfoText = [
      await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText
    ]

    const getPM25AnnualAverageToggleTipInfoTextProperties3 = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM25AnnualAverageToggleTipInfoText) {
      const styles = await common.getStyles(
        element,
        getPM25AnnualAverageToggleTipInfoTextProperties3
      )
      expect(styles.visibility).toBe('hidden')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
  })
  it('Toggletips do not work via keyboard, AQD-640', async () => {
    await monitoringStationPage.get2025Button.click()
    await common.legalWait()
    await browser.keys('Tab')
    await browser.keys('Tab')
    await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getPM10AnnualAverageToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getPM10DailyExceedenceToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getNOHourlyExceedenceToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getOzoneAnnualAverageToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getSDDailyExceedenceToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
    await browser.keys('Tab')
    await monitoringStationPage.getSDHourlyExceedenceToggleTipInfoText.waitForDisplayed(
      { timeout: 7000 }
    )
  })

  it('Change aria-label for Site type toggletip, AQD-759', async () => {
    await common.getBackLink.click()
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Southwark A2 Old Kent Road')
      .click()
    const urbanTrafficSiteTypeToggleTipAriaLabel =
      await monitoringStationPage.getSiteTypeToggleTip.getAttribute(
        'aria-label'
      )
    expect(urbanTrafficSiteTypeToggleTipAriaLabel).toBe(
      'More information about Urban Traffic'
    )

    await common.getBackLink.click()
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Harlington')
      .click()
    const urbanIndustrialSiteTypeToggleTipAriaLabel =
      await monitoringStationPage.getSiteTypeToggleTip.getAttribute(
        'aria-label'
      )
    expect(urbanIndustrialSiteTypeToggleTipAriaLabel).toBe(
      'More information about Urban Industrial'
    )
    await common.getBackLink.click()
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bexley')
      .click()
    const suburbanBackgroundSiteTypeToggleTipAriaLabel =
      await monitoringStationPage.getSiteTypeToggleTip.getAttribute(
        'aria-label'
      )
    expect(suburbanBackgroundSiteTypeToggleTipAriaLabel).toBe(
      'More information about Suburban Background'
    )
    await common.getBackLink.click()
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    const urbanBackgroundSiteTypeToggleTipAriaLabel =
      await monitoringStationPage.getSiteTypeToggleTip.getAttribute(
        'aria-label'
      )
    expect(urbanBackgroundSiteTypeToggleTipAriaLabel).toBe(
      'More information about Urban Background'
    )
  })
})
