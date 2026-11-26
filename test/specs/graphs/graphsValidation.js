// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
// import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
// import mapsPage from '../../page-objects/mapsPage.js'
// import cookiesBanner from '../../page-objects/cookiesBanner.js'
import startNowPage from '../../page-objects/startnowpage.js'
import searchPage from '../../page-objects/searchPage.js'
import disambigurationPage from '../../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../../page-objects/locationMonitoringStationListPage.js'
import hubPage from '../../page-objects/hubPage.js'
import monitoringStationPage from '../../page-objects/monitoringStationPage.js'
import graphsPage from '../../page-objects/graphsPage.js'

describe('graphs Validation', () => {
  it('AQD-1620, view graph page button content, styling, displayed for each summary table tab', async () => {
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

    const graphButton = await monitoringStationPage.getGraphButton.getText()
    expect(graphButton).toBe('View graph and pollutant summary')

    const graphButtonStyles = [await monitoringStationPage.getGraphButton]

    const graphButtonProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'color',
      'font-weight',
      'margin',
      'padding',
      'margin-bottom'
    ]

    for (const element of graphButtonStyles) {
      const styles = await common.getStyles(element, graphButtonProperties)
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles['box-shadow']).toBe('none')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('0px')
    }

    // is the View graph and pollutant summary button present for each tab
    const TabsToCheck = [
      await monitoringStationPage.getDaqiTab,
      await monitoringStationPage.getLast24HoursButton,
      await monitoringStationPage.getLastSevenDaysButton,
      await monitoringStationPage.get2026Button,
      await monitoringStationPage.get2025Button,
      await monitoringStationPage.get2024Button,
      await monitoringStationPage.get2023Button,
      await monitoringStationPage.get2022Button,
      await monitoringStationPage.get2021Button,
      await monitoringStationPage.get2020Button,
      await monitoringStationPage.get2019Button,
      await monitoringStationPage.get2018Button
    ]
    for (const tab of TabsToCheck) {
      await tab.click()
      await common.legalWait()
      await expect(monitoringStationPage.getGraphButton).toBeDisplayed()
    }
  })

  it('AQD-1620, view graph page button takes user to correct graph and pollutant summary page for each summary table tab', async () => {
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

    // When the user clicks the button, they are taken to the correct graph and pollutant summary page for the same monitoring station
    await monitoringStationPage.getLastSevenDaysButton.click()
    await common.legalWait()
    await monitoringStationPage.getGraphButton.click()
    await common.legalWait()
    const getlast7DaysGraphTitle = await graphsPage.getGraphsPageTitle.getText()
    expect(getlast7DaysGraphTitle).toBe('Last 7 days: London Bloomsbury')
    await common.getBackLink.click()

    const TabsToCheck2 = [
      await monitoringStationPage.getDaqiTab,
      await monitoringStationPage.getLast24HoursButton,
      await monitoringStationPage.get2026Button,
      await monitoringStationPage.get2025Button,
      await monitoringStationPage.get2024Button,
      await monitoringStationPage.get2023Button,
      await monitoringStationPage.get2022Button,
      await monitoringStationPage.get2021Button,
      await monitoringStationPage.get2020Button,
      await monitoringStationPage.get2019Button,
      await monitoringStationPage.get2018Button
    ]
    for (const tab of TabsToCheck2) {
      await tab.click()
      await common.legalWait()
      await monitoringStationPage.getGraphButton.click()
      await common.legalWait()
      const twentyFourHoursGraphTitle =
        await graphsPage.getGraphsPageTitle.getText()
      expect(twentyFourHoursGraphTitle).toBe('Last 24 hours: London Bloomsbury')
      await common.getBackLink.click()
    }
  })

  it('AQD-1621, Add View graph and pollutant summary page', async () => {
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
    await monitoringStationPage.getGraphButton.click()

    // The page heading reflects the selected time period and monitoring station
    const graphPageTitle = await graphsPage.getGraphsPageTitle.getText()
    expect(graphPageTitle).toBe('Last 24 hours: London Bloomsbury')

    const getLast24HoursDateRange = await graphsPage.getDateRange.getText()
    const today = await monitoringStationPage.getDaysAgoAsDayMonthString(0)
    const yesterday = await monitoringStationPage.getDaysAgoAsDayMonthString(1)
    const currentYear = await monitoringStationPage.getTodayAsYearString()
    const expectedDateRange = `${yesterday} to ${today} ${currentYear}`
    await expect(getLast24HoursDateRange).toMatch(expectedDateRange)

    await graphsPage.getLast7DaysTab.click()
    await common.legalWait()
    const last7DaysGraphTitle = await graphsPage.getGraphsPageTitle.getText()
    expect(last7DaysGraphTitle).toBe('Last 7 days: London Bloomsbury')

    const getLastSevenDaysDateRangeText =
      await graphsPage.getDateRange.getText()
    const sevenDaysAgoDate =
      await monitoringStationPage.getDaysAgoAsDayMonthString(7)
    const todaysDate = await monitoringStationPage.getDaysAgoAsDayMonthString(0)
    const expectedgetLastSevenDaysTimeDurationText = `${sevenDaysAgoDate} to ${todaysDate} ${currentYear}`
    await expect(getLastSevenDaysDateRangeText).toMatch(
      expectedgetLastSevenDaysTimeDurationText
    )
  })
})
