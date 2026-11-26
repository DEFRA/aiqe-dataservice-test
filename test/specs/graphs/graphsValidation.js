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

  it('AQD-1890, Replace query parameters with POST requests', async () => {
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

    const graphPageUrl = await browser.getUrl()
    expect(graphPageUrl).toContain('/stationdetails/graph-summary')
  })

  it('content is displayed, styling', async () => {
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

    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    await graphsPage.getViewHourlyDataAsATableDropDownLink.click()

    const elementIsDisplayed = [
      await graphsPage.getGraphsPageTitle,
      await graphsPage.getDateRange,
      await graphsPage.getLast24HoursTab,
      await graphsPage.getLast7DaysTab,
      await graphsPage.getVerificationBanner,
      await graphsPage.getViewPollutantSummaryDropDownLink,
      await graphsPage.getSummaryTable,
      await graphsPage.getUKLegalLimitsText,
      await graphsPage.getViewGraphSubTitle,
      await graphsPage.getUnitText,
      await graphsPage.getGraphKey,
      await graphsPage.getGraph,
      await graphsPage.getGraphUKLimitsText,
      await graphsPage.getViewHourlyDataAsATableDropDownLink
    ]

    for (const element of elementIsDisplayed) {
      await expect(element).toBeDisplayed()
    }

    const graphsPageTitleStyles = [await graphsPage.getGraphsPageTitle]

    const graphsPageTitleProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of graphsPageTitleStyles) {
      const styles = await common.getStyles(element, graphsPageTitleProperties)
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const dateRangeStyles = [await graphsPage.getDateRange]

    const dateRangeProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of dateRangeStyles) {
      const styles = await common.getStyles(element, dateRangeProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const last24HoursTabStyles = [await graphsPage.getLast24HoursTab]

    const last24HoursTabProperties = [
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight',
      'padding-top',
      'padding-bottom'
    ]

    for (const element of last24HoursTabStyles) {
      const styles = await common.getStyles(element, last24HoursTabProperties)
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['padding-top']).toBe('12px')
      expect(styles['padding-bottom']).toBe('12px')
    }

    const Last7DaysTabStyles = [await graphsPage.getLast7DaysTab]

    const Last7DaysTabProperties = [
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight',
      'padding-top',
      'padding-bottom'
    ]

    for (const element of Last7DaysTabStyles) {
      const styles = await common.getStyles(element, Last7DaysTabProperties)
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['padding-top']).toBe('12px')
      expect(styles['padding-bottom']).toBe('12px')
    }

    const VerificationBannerStyles = [await graphsPage.getVerificationBanner]

    const VerificationBannerProperties = [
      'background-color',
      'border-left',
      'color',
      'margin-bottom',
      'padding'
    ]

    for (const element of VerificationBannerStyles) {
      const styles = await common.getStyles(
        element,
        VerificationBannerProperties
      )
      expect(styles['background-color']).toBe('rgb(249, 226, 215)')
      expect(styles['border-left']).toBe('10px solid rgb(244, 119, 56)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles.padding).toBe('15px 20px')
    }

    const ViewPollutantSummaryDropDownLinkStyles = [
      await graphsPage.getViewPollutantSummaryDropDownLink
    ]

    const ViewPollutantSummaryDropDownLinkProperties = [
      'color',
      'font-family',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of ViewPollutantSummaryDropDownLinkStyles) {
      const styles = await common.getStyles(
        element,
        ViewPollutantSummaryDropDownLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const SummaryTablePollutantTitleStyles = [
      await graphsPage.getSummaryTablePollutantTitle
    ]

    const SummaryTablePollutantTitleProperties = [
      'padding-bottom',
      'padding-top',
      'color',
      'font-family',
      'font-size',
      'line-height',
      'font-weight',
      'padding-right'
    ]

    for (const element of SummaryTablePollutantTitleStyles) {
      const styles = await common.getStyles(
        element,
        SummaryTablePollutantTitleProperties
      )
      expect(styles['padding-bottom']).toBe('20px')
      expect(styles['padding-top']).toBe('20px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['padding-right']).toBe('20px')
    }

    const SummaryTableDataCaptureStyles = [
      await graphsPage.getSummaryTableDataCapture
    ]

    const SummaryTableDataCaptureProperties = [
      'margin-top',
      'color',
      'font-family',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of SummaryTableDataCaptureStyles) {
      const styles = await common.getStyles(
        element,
        SummaryTableDataCaptureProperties
      )
      expect(styles['margin-top']).toBe('4px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('21.0526px')
      expect(styles['font-weight']).toBe('400')
    }

    const UKLegalLimitsTextStyles = [await graphsPage.getUKLegalLimitsText]

    const UKLegalLimitsTextProperties = [
      'margin-top',
      'color',
      'font-family',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of UKLegalLimitsTextStyles) {
      const styles = await common.getStyles(
        element,
        UKLegalLimitsTextProperties
      )
      expect(styles['margin-top']).toBe('0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it('AQD-1622, Add View pollutant summary expandable section - Graph and Pollutant Summary Page', async () => {
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
    await graphsPage.getLast24HoursTab.click()

    // checking hide and unhide
    const pollutantgetSummaryTableHiddenByDefault =
      await graphsPage.getSummaryTable.isDisplayed()
    expect(pollutantgetSummaryTableHiddenByDefault).toBe(false)

    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const pollutantgetSummaryTableAfterClickedOpen =
      await graphsPage.getSummaryTable.isDisplayed()
    expect(pollutantgetSummaryTableAfterClickedOpen).toBe(true)

    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const pollutantgetSummaryTableAfterClickedClose =
      await graphsPage.getSummaryTable.isDisplayed()
    expect(pollutantgetSummaryTableAfterClickedClose).toBe(false)

    // checking the sumary table column headers for each tab
    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const getSummaryTableColumnHeaders24Hours =
      await graphsPage.getSummaryTableColumnHeaders.getText()
    const expectedSummaryTableColumnHeaders24Hours =
      'Pollutant 24 hour average Hourly exceedances'
    expect(getSummaryTableColumnHeaders24Hours).toMatch(
      expectedSummaryTableColumnHeaders24Hours
    )

    await graphsPage.getLast7DaysTab.click()
    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const getSummaryTableColumnHeaders7DaysTab =
      await graphsPage.getSummaryTableColumnHeaders.getText()
    const expectedSummaryTableColumnHeaders7DaysTab =
      'Pollutant Average Daily exceedances Hourly exceedances'
    expect(getSummaryTableColumnHeaders7DaysTab).toMatch(
      expectedSummaryTableColumnHeaders7DaysTab
    )

    // checking uk limit text for each tab
    await graphsPage.getLast24HoursTab.click()
    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const getUKLegalLimitsText24HoursTab =
      await graphsPage.getUKLegalLimitsText.getText()
    const expectedUKLegalLimitsText24HoursTab =
      'The pollution levels shown are measured against UK legal limits.'
    expect(getUKLegalLimitsText24HoursTab).toMatch(
      expectedUKLegalLimitsText24HoursTab
    )

    await graphsPage.getLast7DaysTab.click()
    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const getUKLegalLimitsText7DaysTab =
      await graphsPage.getUKLegalLimitsText.getText()
    const expectedUKLegalLimitsText7DaysTab =
      'The pollution levels shown are measured against UK legal limits.'
    expect(getUKLegalLimitsText7DaysTab).toMatch(
      expectedUKLegalLimitsText7DaysTab
    )

    // checking the summary table matches the summary table on the monitoring station page for each tab
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
    await monitoringStationPage.getLast24HoursButton.click()
    await common.legalWait()
    const MonitoringStationPageSummaryTable24HoursTab =
      await monitoringStationPage.getSummaryTable.getText()
    await monitoringStationPage.getLastSevenDaysButton.click()
    await common.legalWait()
    const MonitoringStationPageSummaryTable7DaysTab =
      await monitoringStationPage.getSummaryTable.getText()
    await monitoringStationPage.getGraphButton.click()
    await graphsPage.getLast24HoursTab.click()
    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const getSummaryTable24HoursTab = await graphsPage.getSummaryTable.getText()
    expect(common.normaliseSummaryTableText(getSummaryTable24HoursTab)).toBe(
      common.normaliseSummaryTableText(
        MonitoringStationPageSummaryTable24HoursTab
      )
    )
    await graphsPage.getLast7DaysTab.click()
    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const getSummaryTable7DaysTab = await graphsPage.getSummaryTable.getText()
    expect(common.normaliseSummaryTableText(getSummaryTable7DaysTab)).toBe(
      common.normaliseSummaryTableText(
        MonitoringStationPageSummaryTable7DaysTab
      )
    )
  })

  it('AQD-1623, Add pollutant graph - Graph and Pollutant Summary Page', async () => {
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
    await graphsPage.getLast24HoursTab.click()

    // graph is displayed whether summary table is open or closed
    const graphIsDisplayed = await graphsPage.getGraph.isDisplayed()
    expect(graphIsDisplayed).toBe(true)

    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const graphIsDisplayed2 = await graphsPage.getGraph.isDisplayed()
    expect(graphIsDisplayed2).toBe(true)

    await graphsPage.getViewPollutantSummaryDropDownLink.click()
    const graphIsDisplayed3 = await graphsPage.getGraph.isDisplayed()
    expect(graphIsDisplayed3).toBe(true)

    // 24 hours tab
    const getViewGraphSubTitle = await graphsPage.getViewGraphSubTitle.getText()
    const expectedViewGraphSubTitle = 'View graph: hourly data'
    expect(getViewGraphSubTitle).toMatch(expectedViewGraphSubTitle)
    const twentyFourHoursGraph = await graphsPage.getGraph.isDisplayed()
    expect(twentyFourHoursGraph).toBe(true)
    const getTwentyFourHoursGraphKey =
      await graphsPage.getGraphKey.isDisplayed()
    expect(getTwentyFourHoursGraphKey).toBe(true)
    const get24HoursVerticalAxisTitle =
      await graphsPage.getVerticalAxisTitle.getText()
    const expected24HoursVerticalAxisTitle = 'µg/m³'
    expect(get24HoursVerticalAxisTitle).toMatch(
      expected24HoursVerticalAxisTitle
    )
    const get24HoursHorizontalAxisTitle =
      await graphsPage.getHorizontalAxisTitle.getText()
    const expected24HoursHorizontalAxisTitle = 'Time (UTC)'
    expect(get24HoursHorizontalAxisTitle).toMatch(
      expected24HoursHorizontalAxisTitle
    )
    const get24HoursUnitText = await graphsPage.getUnitText.getText()
    const expected24HoursUnitText =
      'The unit µg/m³ stands for micrograms (one millionth of a gram) per cubic metre of air.'
    expect(get24HoursUnitText).toMatch(expected24HoursUnitText)
    const get24HoursKLimitsText =
      await graphsPage.getGraphUKLimitsText.getText()
    const expected24HoursKLimitsText =
      'Pollution levels are measured against UK legal limits.'
    expect(get24HoursKLimitsText).toMatch(expected24HoursKLimitsText)

    // 7 days tab
    await graphsPage.getLast7DaysTab.click()
    const getViewGraphSubTitle7Days =
      await graphsPage.getViewGraphSubTitle.getText()
    const expectedViewGraphSubTitle7Days = 'View graph: hourly data'
    expect(getViewGraphSubTitle7Days).toMatch(expectedViewGraphSubTitle7Days)
    const sevenDaysGraph = await graphsPage.getGraph.isDisplayed()
    expect(sevenDaysGraph).toBe(true)
    const getSevenDaysGraphKey = await graphsPage.getGraphKey.isDisplayed()
    expect(getSevenDaysGraphKey).toBe(true)
    const get7DaysVerticalAxisTitle =
      await graphsPage.getVerticalAxisTitle.getText()
    const expected7DaysVerticalAxisTitle = 'µg/m³'
    expect(get7DaysVerticalAxisTitle).toMatch(expected7DaysVerticalAxisTitle)
    const get7DaysHorizontalAxisTitle =
      await graphsPage.getHorizontalAxisTitle.getText()
    const expected7DaysHorizontalAxisTitle = 'Time (UTC)'
    expect(get7DaysHorizontalAxisTitle).toMatch(
      expected7DaysHorizontalAxisTitle
    )
    const get7DaysUnitText = await graphsPage.getUnitText.getText()
    const expected7DaysUnitText =
      'The unit µg/m³ stands for micrograms (one millionth of a gram) per cubic metre of air.'
    expect(get7DaysUnitText).toMatch(expected7DaysUnitText)
    const get7DaysKLimitsText = await graphsPage.getGraphUKLimitsText.getText()
    const expected7DaysKLimitsText =
      'Pollution levels are measured against UK legal limits.'
    expect(get7DaysKLimitsText).toMatch(expected7DaysKLimitsText)
  })
})
