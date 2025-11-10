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
import common from '../page-objects/common.js'
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'
// import hubPage from '../page-objects/hubPage.js'

describe('monitoring station page tests', () => {
  it('url, titles ', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    // await hubPage.getFindMonitoringStationsByLocation.click()
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()

    const getCurrentURLOfLondonBloomsbury = await browser.getUrl()
    const expectedURLOfLondonBloomsbury = '/stationdetails/LondonBloomsbury'
    await expect(getCurrentURLOfLondonBloomsbury).toMatch(
      expectedURLOfLondonBloomsbury
    )

    const getMonitoringPageHeading =
      await monitoringStationPage.getMonitoringPageHeading.getText()
    const expectedMonitoringPageHeading = 'London Bloomsbury'
    await expect(getMonitoringPageHeading).toMatch(
      expectedMonitoringPageHeading
    )
  })

  it('page styling tests', async () => {
    const getBackLink = [await common.getBackLink]

    const getBackLinkProperties = [
      'color',
      'font-size',
      'line-height',
      'font-family',
      'margin-bottom',
      'margin-top',
      'padding-left',
      'text-decoration',
      'text-decoration-thickness',
      'font-weight'
    ]

    for (const element of getBackLink) {
      const styles = await common.getStyles(element, getBackLinkProperties)
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['margin-top']).toBe('15px')
      expect(styles['padding-left']).toBe('14px')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(11, 12, 12)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['font-weight']).toBe('400')
    }

    const getGoogleMapLink = [await monitoringStationPage.getGoogleMapLink]

    const getGoogleMapLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getGoogleMapLink) {
      const styles = await common.getStyles(element, getGoogleMapLinkProperties)
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getMonitoringPageContentStyles = [
      await monitoringStationPage.getMonitoringPageContent
    ]

    const getMonitoringPageContentProperties = ['padding-bottom', 'padding-top']

    for (const element of getMonitoringPageContentStyles) {
      const styles = await common.getStyles(
        element,
        getMonitoringPageContentProperties
      )
      expect(styles['padding-top']).toBe('40px')
      expect(styles['padding-bottom']).toBe('40px')
    }

    const getMonitoringPageHeadingStyles = [
      await monitoringStationPage.getMonitoringPageHeading
    ]

    const getMonitoringPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getMonitoringPageHeadingStyles) {
      const styles = await common.getStyles(
        element,
        getMonitoringPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getgridSideStyles = [await monitoringStationPage.getgridSideStyles]

    const getgridSideStylesProperties = ['float', 'width', 'padding']

    for (const element of getgridSideStyles) {
      const styles = await common.getStyles(
        element,
        getgridSideStylesProperties
      )
      expect(styles.float).toBe('left')
      expect(styles.width).toBe('990px')
      expect(styles.padding).toBe('0px 15px')
    }

    const getgridTopBottomStyles = [
      await monitoringStationPage.getgridTopBottomStyles
    ]

    const getgridTopBottomStylesProperties = [
      'gap',
      'padding-bottom',
      'margin-top',
      'box-shadow',
      'display',
      'flex-direction',
      'flex-wrap',
      'margin',
      'width'
    ]

    for (const element of getgridTopBottomStyles) {
      const styles = await common.getStyles(
        element,
        getgridTopBottomStylesProperties
      )
      expect(styles.gap).toBe('80px')
      expect(styles['padding-bottom']).toBe('0px')
      expect(styles['margin-top']).toBe('15px')
      expect(styles['box-shadow']).toBe(
        'rgb(177, 180, 182) 0px -1px 0px 0px inset'
      )
      expect(styles.display).toBe('flex')
      expect(styles['flex-direction']).toBe('row')
      expect(styles['flex-wrap']).toBe('nowrap')
      expect(styles.margin).toBe('15px 0px')
      expect(styles.width).toBe('960px')
    }

    const getFeatureItem = [await monitoringStationPage.getFeatureItem]

    const getFeatureItemProperties = [
      'box-sizing',
      'float',
      'min-width',
      'padding',
      'display'
    ]

    for (const element of getFeatureItem) {
      const styles = await common.getStyles(element, getFeatureItemProperties)
      expect(styles['box-sizing']).toBe('border-box')
      expect(styles.float).toBe('left')
      expect(styles['min-width']).toBe('96px')
      expect(styles.padding).toBe('15px 0px')
      expect(styles.display).toBe('block')
    }

    const getFeatureCaption = [await monitoringStationPage.getFeatureCaption]

    const getFeatureCaptionProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'display',
      'font-weight'
    ]

    for (const element of getFeatureCaption) {
      const styles = await common.getStyles(
        element,
        getFeatureCaptionProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles.display).toBe('block')
      expect(styles['font-weight']).toBe('400')
    }

    const getFeatureBody = [await monitoringStationPage.getFeatureBody]

    const getFeatureBodyProperties = [
      'margin-top',
      'font-size',
      'margin-bottom',
      'line-height',
      'color',
      'font-family',
      'font-weight'
      // 'margin'
    ]

    for (const element of getFeatureBody) {
      const styles = await common.getStyles(element, getFeatureBodyProperties)
      expect(styles['margin-top']).toBe('5px')
      expect(styles['font-size']).toBe('22px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['line-height']).toBe('28.9474px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      // expect(styles.margin).toBe('5px 5px 20px 0px') styling bug
    }

    const getMapLinkPadding = [await monitoringStationPage.getMapLinkPadding]

    const getMapLinkPaddingProperties = ['margin-top', 'margin-bottom']

    for (const element of getMapLinkPadding) {
      const styles = await common.getStyles(
        element,
        getMapLinkPaddingProperties
      )
      expect(styles['margin-top']).toBe('5px')
      expect(styles['margin-bottom']).toBe('20px')
    }
  })

  it('checking back link', async () => {
    await common.getBackLink.click()
    const getURLAfterBackLinkCLick = await browser.getUrl()
    const expectedgetURLAfterBackLinkCLick =
      '/location/city-of-london-city-and-county-of-the-city-of-london'
    await expect(getURLAfterBackLinkCLick).toMatch(
      expectedgetURLAfterBackLinkCLick
    )
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
  })

  it('Station status, & last reading, AQD-694', async () => {
    const getMonitoringStationStatusText =
      await monitoringStationPage.getMonitoringStationStatus.getText()
    const expectedMonitoringStationStatusText = 'Active'
    await expect(getMonitoringStationStatusText).toMatch(
      expectedMonitoringStationStatusText
    )

    await monitoringStationPage.getMonitoringStationLastReading.isDisplayed()

    const getMonitoringStationStatus = [
      await monitoringStationPage.getMonitoringStationStatus
    ]

    const getMonitoringStationStatusProperties = [
      'background-color',
      'color',
      'font-size',
      'line-height',
      'font-family',
      'font-weight',
      'padding'
    ]

    for (const element of getMonitoringStationStatus) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationStatusProperties
      )
      expect(styles['background-color']).toBe('rgb(204, 226, 216)')
      expect(styles.color).toBe('rgb(0, 90, 48)')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles.padding).toBe('2px 8px 3px')
    }

    const getMonitoringStationLastReading = [
      await monitoringStationPage.getMonitoringStationLastReading
    ]

    const getMonitoringStationLastReadingProperties = [
      'margin-left',
      'display',
      'color',
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'font-weight'
    ]

    for (const element of getMonitoringStationLastReading) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationLastReadingProperties
      )
      expect(styles['margin-left']).toBe('5px')
      expect(styles.display).toBe('inline-block')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['margin-top']).toBe('15px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it('Network, Region, & Site type , AQD 554', async () => {
    const getMonitoringNetworkTypeTitle =
      await monitoringStationPage.getMonitoringNetworkTitle.getText()
    const expectedMonitoringNetworkTypeTitle = 'Monitoring network'
    await expect(getMonitoringNetworkTypeTitle).toMatch(
      expectedMonitoringNetworkTypeTitle
    )

    const getMonitoringNetworkTypeData =
      await monitoringStationPage.getMonitoringNetworkData.getText()
    const expectedMonitoringNetworkTypeData =
      'Automatic Urban and Rural Network (AURN)'
    await expect(getMonitoringNetworkTypeData).toMatch(
      expectedMonitoringNetworkTypeData
    )

    const getRegionTitle = await monitoringStationPage.getRegionTitle.getText()
    const expectedRegionTitle = 'Region'
    await expect(getRegionTitle).toMatch(expectedRegionTitle)

    const getRegionData = await monitoringStationPage.getRegionData.getText()
    const expectedRegionData = 'Greater London'
    await expect(getRegionData).toMatch(expectedRegionData)

    const getSiteTypeTitle =
      await monitoringStationPage.getSiteTypeTitle.getText()
    const expectedSiteTypeTitle = `Site type`
    await expect(getSiteTypeTitle).toMatch(expectedSiteTypeTitle)

    const getSiteTypeData =
      await monitoringStationPage.getSiteTypeData.getText()
    const expectedSiteTypeData = `Urban Background
i
View on Google Maps (opens in new tab)`
    await expect(getSiteTypeData).toMatch(expectedSiteTypeData)
  })

  it('Monitoring network, Region, and Site Type data out of alignment AQD-671', async () => {
    const getMonitoringNetworkTypeTitleLocation =
      await monitoringStationPage.getMonitoringNetworkTitle.getLocation()
    const getMonitoringNetworkTypeDataLocation =
      await monitoringStationPage.getMonitoringNetworkData.getLocation()
    const xLocationDifferenceNetworkType = Math.abs(
      getMonitoringNetworkTypeTitleLocation.x -
        getMonitoringNetworkTypeDataLocation.x
    )
    expect(xLocationDifferenceNetworkType).toBeLessThanOrEqual(1)

    const getRegionTitleLocation =
      await monitoringStationPage.getRegionTitle.getLocation()
    const getRegionDataLocation =
      await monitoringStationPage.getRegionData.getLocation()
    const xLocationDifferenceRegion = Math.abs(
      getRegionTitleLocation.x - getRegionDataLocation.x
    )
    expect(xLocationDifferenceRegion).toBeLessThanOrEqual(1)

    const getSiteTypeTitleLocation =
      await monitoringStationPage.getSiteTypeTitle.getLocation()
    const getSiteTypeDataLocation =
      await monitoringStationPage.getSiteTypeData.getLocation()
    const xLocationDifferenceSiteType = Math.abs(
      getSiteTypeTitleLocation.x - getSiteTypeDataLocation.x
    )
    expect(xLocationDifferenceSiteType).toBeLessThanOrEqual(1)
  })

  it('Site type toggle tip and text, AQD-695', async () => {
    await monitoringStationPage.getSiteTypeToggleTip.isDisplayed()
    await monitoringStationPage.getSiteTypeToggleTip.isClickable()

    const getToggleTip = [await monitoringStationPage.getSiteTypeToggleTip]

    const getToggleTipProperties = [
      'background-color',
      'border',
      'color',
      'cursor',
      'height',
      'left',
      'padding',
      'position',
      'text-align',
      'top',
      'width'
    ]

    for (const element of getToggleTip) {
      const styles = await common.getStyles(element, getToggleTipProperties)
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('0px none rgb(11, 12, 12)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles.cursor).toBe('help')
      expect(styles.height).toBe('26px')
      expect(styles.left).toBe('0px')
      expect(styles.padding).toBe('0px')
      expect(styles.position).toBe('absolute')
      expect(styles['text-align']).toBe('center')
      expect(styles.top).toBe('0px')
      expect(styles.width).toBe('26px')
    }

    const getSiteTypeToggleTipInfoText = [
      await monitoringStationPage.getSiteTypeToggleTipInfoText
    ]

    const getSiteTypeToggleTipInfoTextProperties = ['visibility']

    for (const element of getSiteTypeToggleTipInfoText) {
      const styles = await common.getStyles(
        element,
        getSiteTypeToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('hidden')
    }

    await monitoringStationPage.getSiteTypeToggleTip.moveTo()
    const getSiteTypeToggleTipInfoTextHover = [
      await monitoringStationPage.getSiteTypeToggleTipInfoText
    ]

    const SiteTypeToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getSiteTypeToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        SiteTypeToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getSiteTypeToggleTipText =
      await monitoringStationPage.getSiteTypeToggleTipInfoText.getText()
    const SiteTypeToggleTipText = `This monitoring area is in a city or town. It is located so pollutant measurements do not come from one specific source.`
    await expect(getSiteTypeToggleTipText).toMatch(SiteTypeToggleTipText)
  })

  it('Station Summary Data - List Pollutants in Summary Table Order, AQD-613', async () => {
    const summaryTablePollutantList =
      await monitoringStationPage.getPollutionListFromSummaryTable()

    const expectedPollutantListOrder = [
      'PM2.5',
      'PM10',
      'Nitrogen dioxide',
      'Ozone',
      'Sulphur dioxide'
    ]
    await expect(summaryTablePollutantList).toEqual(expectedPollutantListOrder)
  })

  it('Yearly Tab AQD-586,AQD-641 Display Data Capture % ', async () => {
    const get2025Button = await monitoringStationPage.get2025Button
    await get2025Button.isDisplayed()
    await monitoringStationPage.get2025Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )
    const yearlyTab2025Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2025Title = 'Air pollution levels in 2025'
    await expect(yearlyTab2025Title).toMatch(expectedyearlyTab2025Title)
    const durationTag2025 = await monitoringStationPage.getDurationTag.getText()
    const todaysDate = await monitoringStationPage.getTodayAsDayMonthString()
    const expectedDurationTag2025 = `1 January to ${todaysDate}`
    await expect(durationTag2025).toMatch(expectedDurationTag2025)
    const getVerifiedTag2025 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2025 = 'Data has been verified until 30 June'
    await expect(getVerifiedTag2025).toMatch(expectedVerifiedTag2025)
    const getdownloadDataHeading2025 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2025 = 'Download data for 2025'
    await expect(getdownloadDataHeading2025).toMatch(
      expectedgetdownloadDataHeading2025
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const get2024Button = await monitoringStationPage.get2024Button
    await get2024Button.isDisplayed()
    await monitoringStationPage.get2024Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )
    const yearlyTab2024Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2024Title = 'Air pollution levels in 2024'
    await expect(yearlyTab2024Title).toMatch(expectedyearlyTab2024Title)
    const durationTag2024 = await monitoringStationPage.getDurationTag.getText()
    const expectedDurationTag2024 = '1 January to 31 December'
    await expect(durationTag2024).toMatch(expectedDurationTag2024)
    const getVerifiedTag2024 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2024 = 'Data has been verified'
    await expect(getVerifiedTag2024).toMatch(expectedVerifiedTag2024)
    const getdownloadDataHeading2024 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2024 = 'Download data for 2024'
    await expect(getdownloadDataHeading2024).toMatch(
      expectedgetdownloadDataHeading2024
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const get2023Button = await monitoringStationPage.get2023Button
    await get2023Button.isDisplayed()
    await monitoringStationPage.get2023Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )
    const yearlyTab2023Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2023Title = 'Air pollution levels in 2023'
    await expect(yearlyTab2023Title).toMatch(expectedyearlyTab2023Title)
    const durationTag2023 = await monitoringStationPage.getDurationTag.getText()
    const expectedDurationTag2023 = '1 January to 31 December'
    await expect(durationTag2023).toMatch(expectedDurationTag2023)
    const getVerifiedTag2023 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2023 = 'Data has been verified'
    await expect(getVerifiedTag2023).toMatch(expectedVerifiedTag2023)
    const getdownloadDataHeading2023 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2023 = 'Download data for 2023'
    await expect(getdownloadDataHeading2023).toMatch(
      expectedgetdownloadDataHeading2023
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const get2022Button = await monitoringStationPage.get2022Button
    await get2022Button.isDisplayed()
    await monitoringStationPage.get2022Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )
    const yearlyTab2022Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2022Title = 'Air pollution levels in 2022'
    await expect(yearlyTab2022Title).toMatch(expectedyearlyTab2022Title)
    const durationTag2022 = await monitoringStationPage.getDurationTag.getText()
    const expectedDurationTag2022 = '1 January to 31 December'
    await expect(durationTag2022).toMatch(expectedDurationTag2022)
    const getVerifiedTag2022 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2022 = 'Data has been verified'
    await expect(getVerifiedTag2022).toMatch(expectedVerifiedTag2022)
    const getdownloadDataHeading2022 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2022 = 'Download data for 2022'
    await expect(getdownloadDataHeading2022).toMatch(
      expectedgetdownloadDataHeading2022
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const get2021Button = await monitoringStationPage.get2021Button
    await get2021Button.isDisplayed()
    await monitoringStationPage.get2021Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return true
      },
      { timeout: 2000 }
    )
    const yearlyTab2021Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2021Title = 'Air pollution levels in 2021'
    await expect(yearlyTab2021Title).toMatch(expectedyearlyTab2021Title)
    const durationTag2021 = await monitoringStationPage.getDurationTag.getText()
    const expectedDurationTag2021 = '1 January to 31 December'
    await expect(durationTag2021).toMatch(expectedDurationTag2021)
    const getVerifiedTag2021 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2021 = 'Data has been verified'
    await expect(getVerifiedTag2021).toMatch(expectedVerifiedTag2021)
    const getdownloadDataHeading2021 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2021 = 'Download data for 2021'
    await expect(getdownloadDataHeading2021).toMatch(
      expectedgetdownloadDataHeading2021
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const get2020Button = await monitoringStationPage.get2020Button
    await get2020Button.isDisplayed()
    await monitoringStationPage.get2020Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const yearlyTab2020Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2020Title = 'Air pollution levels in 2020'
    await expect(yearlyTab2020Title).toMatch(expectedyearlyTab2020Title)
    const durationTag2020 = await monitoringStationPage.getDurationTag.getText()
    const expectedDurationTag2020 = '1 January to 31 December'
    await expect(durationTag2020).toMatch(expectedDurationTag2020)
    const getVerifiedTag2020 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2020 = 'Data has been verified'
    await expect(getVerifiedTag2020).toMatch(expectedVerifiedTag2020)
    const getdownloadDataHeading2020 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2020 = 'Download data for 2020'
    await expect(getdownloadDataHeading2020).toMatch(
      expectedgetdownloadDataHeading2020
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const get2019Button = await monitoringStationPage.get2019Button
    await get2019Button.isDisplayed()
    await monitoringStationPage.get2019Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const yearlyTab2019Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2019Title = 'Air pollution levels in 2019'
    await expect(yearlyTab2019Title).toMatch(expectedyearlyTab2019Title)
    const durationTag2019 = await monitoringStationPage.getDurationTag.getText()
    const expectedDurationTag2019 = '1 January to 31 December'
    await expect(durationTag2019).toMatch(expectedDurationTag2019)
    const getVerifiedTag2019 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2019 = 'Data has been verified'
    await expect(getVerifiedTag2019).toMatch(expectedVerifiedTag2019)
    const getdownloadDataHeading2019 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2019 = 'Download data for 2019'
    await expect(getdownloadDataHeading2019).toMatch(
      expectedgetdownloadDataHeading2019
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const get2018Button = await monitoringStationPage.get2018Button
    await get2018Button.isDisplayed()
    await monitoringStationPage.get2018Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        return true
      },
      { timeout: 4000 }
    )
    const yearlyTab2018Title =
      await monitoringStationPage.getSumarryTableHeading.getText()
    const expectedyearlyTab2018Title = 'Air pollution levels in 2018'
    await expect(yearlyTab2018Title).toMatch(expectedyearlyTab2018Title)
    const durationTag2018 = await monitoringStationPage.getDurationTag.getText()
    const expectedDurationTag2018 = '1 January to 31 December'
    await expect(durationTag2018).toMatch(expectedDurationTag2018)
    const getVerifiedTag2018 =
      await monitoringStationPage.getVerifiedTag.getText()
    const expectedVerifiedTag2018 = 'Data has been verified'
    await expect(getVerifiedTag2018).toMatch(expectedVerifiedTag2018)
    const getdownloadDataHeading2018 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2018 = 'Download data for 2018'
    await expect(getdownloadDataHeading2018).toMatch(
      expectedgetdownloadDataHeading2018
    )
    await monitoringStationPage.getPM25DataCapture.isDisplayed()
    await monitoringStationPage.getPM10DataCapture.isDisplayed()
    await monitoringStationPage.getNODataCapture.isDisplayed()
    await monitoringStationPage.getOzoneDataCapture.isDisplayed()
    await monitoringStationPage.getSDDataCapture.isDisplayed()

    const getSumarryTableHeading = [
      await monitoringStationPage.getSumarryTableHeading
    ]

    const getSumarryTableHeadingProperties = [
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'display',
      'font-weight'
    ]

    for (const element of getSumarryTableHeading) {
      const styles = await common.getStyles(
        element,
        getSumarryTableHeadingProperties
      )
      expect(styles['margin-top']).toBe('30px')
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.display).toBe('block')
      expect(styles['font-weight']).toBe('700')
    }

    const getDurationTag = [await monitoringStationPage.getDurationTag]

    const getDurationTagProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getDurationTag) {
      const styles = await common.getStyles(element, getDurationTagProperties)
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getYearButtons = [
      await monitoringStationPage.get2019Button,
      await monitoringStationPage.get2020Button,
      await monitoringStationPage.get2021Button,
      await monitoringStationPage.get2022Button,
      await monitoringStationPage.get2023Button,
      await monitoringStationPage.get2024Button,
      await monitoringStationPage.get2025Button
    ]

    const getYearButtonsProperties = [
      'color',
      'font-family',
      'padding-bottom',
      'padding-top',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getYearButtons) {
      const styles = await common.getStyles(element, getYearButtonsProperties)
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['padding-bottom']).toBe('12px')
      expect(styles['padding-top']).toBe('12px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getCurrentYearButton = [await monitoringStationPage.get2018Button]

    const getCurrentYearButtonProperties = [
      'color',
      'font-family',
      'padding-bottom',
      'padding-top',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getCurrentYearButton) {
      const styles = await common.getStyles(
        element,
        getCurrentYearButtonProperties
      )
      expect(styles.color).toBe('rgb(0, 48, 120)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['padding-bottom']).toBe('12px')
      expect(styles['padding-top']).toBe('12px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getVerifiedTag = [await monitoringStationPage.getVerifiedTag]

    const getVerifiedTagsProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getVerifiedTag) {
      const styles = await common.getStyles(element, getVerifiedTagsProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DataCaptureStyles = [
      await monitoringStationPage.getPM25DataCapture,
      await monitoringStationPage.getPM10DataCapture,
      await monitoringStationPage.getNODataCapture,
      await monitoringStationPage.getOzoneDataCapture,
      await monitoringStationPage.getSDDataCapture
    ]

    const getPM25DataCaptureProperties = [
      'font-size',
      'font-weight',
      'margin-top',
      'line-height',
      'font-family',
      'text-align'
    ]

    for (const element of DataCaptureStyles) {
      const styles = await common.getStyles(
        element,
        getPM25DataCaptureProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-top']).toBe('5px')
      expect(styles['line-height']).toBe('21.0526px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-align']).toBe('left')
    }
  })

  it(`Station Summary Data - Annual Average for selected Year', AQD-673`, async () => {
    await monitoringStationPage.getPM25AnnaulAverageST.isDisplayed()
    await monitoringStationPage.getPM10AnnaulAverageST.isDisplayed()
    await monitoringStationPage.getNitrogenDioxideAnnaulAverageST.isDisplayed()
    await monitoringStationPage.getOzoneAnnaulAverageST.isDisplayed()
    await monitoringStationPage.getSulphurDioxideAnnaulAverageST.isDisplayed()

    const getPM25AnnaulAverageST =
      await monitoringStationPage.getPM25AnnaulAverageST.getText()
    const getPM10AnnaulAverageST =
      await monitoringStationPage.getPM10AnnaulAverageST.getText()
    const getNitrogenDioxideAnnaulAverageST =
      await monitoringStationPage.getNitrogenDioxideAnnaulAverageST.getText()
    const getOzoneAnnaulAverageST =
      await monitoringStationPage.getOzoneAnnaulAverageST.getText()
    const getSulphurDioxideAnnaulAverageST =
      await monitoringStationPage.getSulphurDioxideAnnaulAverageST.getText()

    const expectedgetPM25AnnaulAverageST = `10 µg/m3
i`
    const expectedPM10AnnaulAverageST = `17 µg/m3`
    const expectedNitrogenDioxideAnnaulAverageST = `36 µg/m3`
    const expectedOzoneAnnaulAverageST = `35 µg/m3`
    const expectedSulphurDioxideAnnaulAverageST = `2 µg/m3`

    await expect(getPM25AnnaulAverageST).toMatch(expectedgetPM25AnnaulAverageST)

    await expect(getPM10AnnaulAverageST).toMatch(expectedPM10AnnaulAverageST)

    await expect(getNitrogenDioxideAnnaulAverageST).toMatch(
      expectedNitrogenDioxideAnnaulAverageST
    )

    await expect(getOzoneAnnaulAverageST).toMatch(expectedOzoneAnnaulAverageST)

    await expect(getSulphurDioxideAnnaulAverageST).toMatch(
      expectedSulphurDioxideAnnaulAverageST
    )

    const summaryTableAnnualAverageStyles = [
      await monitoringStationPage.getPM25AnnaulAverageST,
      await monitoringStationPage.getPM10AnnaulAverageST,
      await monitoringStationPage.getNitrogenDioxideAnnaulAverageST,
      await monitoringStationPage.getOzoneAnnaulAverageST,
      await monitoringStationPage.getSulphurDioxideAnnaulAverageST
    ]

    const summaryTableAnnualAverageStylesProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'font-size',
      'line-height',
      'font-family',
      'border-collapse',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of summaryTableAnnualAverageStyles) {
      const styles = await common.getStyles(
        element,
        summaryTableAnnualAverageStylesProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-collapse']).toBe('collapse')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it(`Update 'Approximate file sizes (CSV)' content - missing 'MB', AQD-667`, async () => {
    await monitoringStationPage.getApproximateFileSizesDropDownLink.isDisplayed()
    const getApproximateFileSizesDropDownLinkText =
      await monitoringStationPage.getApproximateFileSizesDropDownLink.getText()
    const expectedApproximateFileSizesDropDownLinkText =
      'Approximate file sizes (CSV)'
    await expect(getApproximateFileSizesDropDownLinkText).toMatch(
      expectedApproximateFileSizesDropDownLinkText
    )
    const getApproximateFileSizesDropDownLinkStyles = [
      await monitoringStationPage.getApproximateFileSizesDropDownLink
    ]

    const getApproximateFileSizesDropDownLinkStylesProperties = [
      'text-decoration',
      'text-decoration-thickness',
      'text-underline-offset',
      'color',
      'font-size',
      'line-height',
      'font-family',
      'font-weight'
    ]

    for (const element of getApproximateFileSizesDropDownLinkStyles) {
      const styles = await common.getStyles(
        element,
        getApproximateFileSizesDropDownLinkStylesProperties
      )
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['text-underline-offset']).toBe('2.9982px')
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
    await monitoringStationPage.getApproximateFileSizesDropDownLink.click()
    await monitoringStationPage.getApproximateFileSizesContent.isDisplayed()
    await monitoringStationPage.getApproximateFileSizesDropDownLink.click()
    await common.notDisplayed(
      await monitoringStationPage.getApproximateFileSizesContent
    )
    await monitoringStationPage.getApproximateFileSizesDropDownLink.click()

    const getApproximateFileSizesContent =
      await monitoringStationPage.getApproximateFileSizesContent.getText()
    const expectedgetApproximateFileSizesContent = `File sizes for a year of data:
hourly data - usually less than 1MB
daily average data - usually less than 500KB
annual average data - usually less than 100KB`
    await expect(getApproximateFileSizesContent).toMatch(
      expectedgetApproximateFileSizesContent
    )

    const getApproximateFileSizesContentStyles = [
      await monitoringStationPage.getApproximateFileSizesContent
    ]

    const getApproximateFileSizesContentStylesProperties = [
      'border-left',
      'padding-bottom',
      'padding-left',
      'padding-top',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getApproximateFileSizesContentStyles) {
      const styles = await common.getStyles(
        element,
        getApproximateFileSizesContentStylesProperties
      )
      expect(styles['border-left']).toBe('5px solid rgb(177, 180, 182)')
      expect(styles['padding-bottom']).toBe('15px')
      expect(styles['padding-left']).toBe('20px')
      expect(styles['padding-top']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it('Download Hourly Data for All pollutants,AQD-588', async () => {
    const getAllPollutantsSubHeading =
      await monitoringStationPage.getAllPollutantsSubHeading.getText()
    const expectedAllPollutantsSubHeading = 'All pollutants'
    await expect(getAllPollutantsSubHeading).toMatch(
      expectedAllPollutantsSubHeading
    )

    const getDownloadAllPollutantsHourlyData =
      await monitoringStationPage.getDownloadAllPollutantsHourlyData.getText()
    await monitoringStationPage.getDownloadAllPollutantsHourlyData.isDisplayed()
    await monitoringStationPage.getDownloadAllPollutantsHourlyData.isClickable()
    const expectedDownloadAllPollutantsHourlyData = 'Download hourly data'
    await expect(getDownloadAllPollutantsHourlyData).toMatch(
      expectedDownloadAllPollutantsHourlyData
    )

    const getdownloadDataHeading = [
      await monitoringStationPage.getdownloadDataHeading
    ]

    const getdownloadDataHeadingProperties = [
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getdownloadDataHeading) {
      const styles = await common.getStyles(
        element,
        getdownloadDataHeadingProperties
      )
      expect(styles['margin-top']).toBe('40px')
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const AllPollutantsSubHeading = [
      await monitoringStationPage.getAllPollutantsSubHeading
    ]

    const getAllPollutantsSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of AllPollutantsSubHeading) {
      const styles = await common.getStyles(
        element,
        getAllPollutantsSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadAllPollutantsHourlyData = [
      await monitoringStationPage.getDownloadAllPollutantsHourlyData
    ]

    const getDownloadAllPollutantsHourlyDataProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadAllPollutantsHourlyData) {
      const styles = await common.getStyles(
        element,
        getDownloadAllPollutantsHourlyDataProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Hourly Data for Sulphur dioxide, AQD-594', async () => {
    const getSulphurDioxideSubHeading =
      await monitoringStationPage.getSulphurDioxideSubHeading.getText()
    const expectedSulphurDioxideSubHeading = 'Sulphur dioxide'
    await expect(getSulphurDioxideSubHeading).toMatch(
      expectedSulphurDioxideSubHeading
    )

    const getDownloadSulphurDioxideHourlyDataLink =
      await monitoringStationPage.getDownloadSulphurDioxideHourlyDataLink.getText()
    await monitoringStationPage.getDownloadSulphurDioxideHourlyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadSulphurDioxideHourlyDataLink.isClickable()
    const expectedDownloadSulphurDioxideHourlyDataLink = 'Download hourly data'
    await expect(getDownloadSulphurDioxideHourlyDataLink).toMatch(
      expectedDownloadSulphurDioxideHourlyDataLink
    )

    const SulphurDioxideSubHeading = [
      await monitoringStationPage.getSulphurDioxideSubHeading
    ]

    const getSulphurDioxideSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of SulphurDioxideSubHeading) {
      const styles = await common.getStyles(
        element,
        getSulphurDioxideSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadSulphurDioxideHourlyDataLink = [
      await monitoringStationPage.getDownloadSulphurDioxideHourlyDataLink
    ]

    const getDownloadSulphurDioxideHourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadSulphurDioxideHourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadSulphurDioxideHourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Hourly Data for PM10, AQD-595', async () => {
    const getPM10SubHeading =
      await monitoringStationPage.getPM10SubHeading.getText()
    const expectedgetPM10SubHeading = 'PM10'
    await expect(getPM10SubHeading).toMatch(expectedgetPM10SubHeading)

    const getDownloadPM10HourlyDataLink =
      await monitoringStationPage.getDownloadPM10HourlyDataLink.getText()
    await monitoringStationPage.getDownloadPM10HourlyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadPM10HourlyDataLink.isClickable()
    const expectedDownloadPM10HourlyDataLink = 'Download hourly data'
    await expect(getDownloadPM10HourlyDataLink).toMatch(
      expectedDownloadPM10HourlyDataLink
    )

    const PM10SubHeading = [await monitoringStationPage.getPM10SubHeading]

    const getPM10SubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of PM10SubHeading) {
      const styles = await common.getStyles(
        element,
        getPM10SubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadPM10HourlyDataLink = [
      await monitoringStationPage.getDownloadPM10HourlyDataLink
    ]

    const getDownloadPM10HourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM10HourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadPM10HourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Hourly Data for PM2.5, AQD-595', async () => {
    const getPM25SubHeading =
      await monitoringStationPage.getPM25SubHeading.getText()
    const expectedPM25SubHeading = 'PM2.5'
    await expect(getPM25SubHeading).toMatch(expectedPM25SubHeading)

    const getDownloadPM25HourlyDataLink =
      await monitoringStationPage.getDownloadPM25HourlyDataLink.getText()
    await monitoringStationPage.getDownloadPM25HourlyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadPM25HourlyDataLink.isClickable()
    const expectedDownloadPM25HourlyDataLink = 'Download hourly data'
    await expect(getDownloadPM25HourlyDataLink).toMatch(
      expectedDownloadPM25HourlyDataLink
    )

    const PM25SubHeading = [await monitoringStationPage.getPM25SubHeading]

    const getPM25SubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of PM25SubHeading) {
      const styles = await common.getStyles(
        element,
        getPM25SubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadPM25HourlyDataLink = [
      await monitoringStationPage.getDownloadPM25HourlyDataLink
    ]

    const getDownloadPM25HourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM25HourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadPM25HourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Hourly Data for Ozone, AQD-610', async () => {
    const getOzoneSubHeading =
      await monitoringStationPage.getOzoneSubHeading.getText()
    const expectedOzoneSubHeading = 'Ozone'
    await expect(getOzoneSubHeading).toMatch(expectedOzoneSubHeading)

    const getDownloadOzoneHourlyDataLink =
      await monitoringStationPage.getDownloadOzoneHourlyDataLink.getText()
    await monitoringStationPage.getDownloadOzoneHourlyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadOzoneHourlyDataLink.isClickable()
    const expectedDownloadOzoneHourlyDataLink = 'Download hourly data'
    await expect(getDownloadOzoneHourlyDataLink).toMatch(
      expectedDownloadOzoneHourlyDataLink
    )

    const OzoneSubHeading = [await monitoringStationPage.getOzoneSubHeading]

    const getOzoneSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of OzoneSubHeading) {
      const styles = await common.getStyles(
        element,
        getOzoneSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadOzoneHourlyDataLink = [
      await monitoringStationPage.getDownloadOzoneHourlyDataLink
    ]

    const getDownloadOzoneHourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadOzoneHourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadOzoneHourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Hourly Data for Nitrogen Dioxide, AQD-611', async () => {
    const getNitrogenDioxideSubHeading =
      await monitoringStationPage.getNitrogenDioxideSubHeading.getText()
    const expectedgetNitrogenDioxideSubHeading = 'Nitrogen dioxide'
    await expect(getNitrogenDioxideSubHeading).toMatch(
      expectedgetNitrogenDioxideSubHeading
    )

    const getDownloadNitrogenDioxideHourlyDataLink =
      await monitoringStationPage.getDownloadNitrogenDioxideHourlyDataLink.getText()
    await monitoringStationPage.getDownloadNitrogenDioxideHourlyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadNitrogenDioxideHourlyDataLink.isClickable()
    const expectedDownloadNitrogenDioxideHourlyDataLink = 'Download hourly data'
    await expect(getDownloadNitrogenDioxideHourlyDataLink).toMatch(
      expectedDownloadNitrogenDioxideHourlyDataLink
    )

    const NitrogenDioxideSubHeading = [
      await monitoringStationPage.getNitrogenDioxideSubHeading
    ]

    const getNitrogenDioxideSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of NitrogenDioxideSubHeading) {
      const styles = await common.getStyles(
        element,
        getNitrogenDioxideSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadNitrogenDioxideHourlyDataLink = [
      await monitoringStationPage.getDownloadNitrogenDioxideHourlyDataLink
    ]

    const DownloadNitrogenDioxideHourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadNitrogenDioxideHourlyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadNitrogenDioxideHourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
    // checking download pollutant order
    const pollutantDownloadListOrder = await common.getList('h3[id=all-p]')
    const expectedpollutantDownloadListOrder = [
      'All pollutants',
      'PM2.5',
      'PM10',
      'Nitrogen dioxide',
      'Ozone',
      'Sulphur dioxide'
    ]
    await expect(pollutantDownloadListOrder).toEqual(
      expectedpollutantDownloadListOrder
    )
  })

  it('Download Daily Data for All Pollutants, AQD-621', async () => {
    const getDownloadAllPollutantsDailyDataLink =
      await monitoringStationPage.getDownloadAllPollutantsDailyDataLink.getText()
    await monitoringStationPage.getDownloadAllPollutantsDailyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadAllPollutantsDailyDataLink.isClickable()
    const expectedDownloadAllPollutantsDailyDataLink =
      'Download daily average data'
    await expect(getDownloadAllPollutantsDailyDataLink).toMatch(
      expectedDownloadAllPollutantsDailyDataLink
    )

    const DownloadAllPollutantsDailyDataLink = [
      await monitoringStationPage.getDownloadAllPollutantsDailyDataLink
    ]

    const DownloadAllPollutantsDailyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadAllPollutantsDailyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadAllPollutantsDailyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Daily Data for Nitrogen Dioxide, AQD-624', async () => {
    const getDownloadNitrogenDioxideDailyDataLink =
      await monitoringStationPage.getDownloadNitrogenDioxideDailyDataLink.getText()
    await monitoringStationPage.getDownloadNitrogenDioxideDailyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadNitrogenDioxideDailyDataLink.isClickable()
    const expectedgetDownloadNitrogenDioxideDailyDataLink =
      'Download daily average data'
    await expect(getDownloadNitrogenDioxideDailyDataLink).toMatch(
      expectedgetDownloadNitrogenDioxideDailyDataLink
    )

    const DownloadNitrogenDioxideDailyDataLink = [
      await monitoringStationPage.getDownloadNitrogenDioxideDailyDataLink
    ]

    const DownloadNitrogenDioxideDailyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadNitrogenDioxideDailyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadNitrogenDioxideDailyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Daily Data for PM2.5, AQD-628', async () => {
    const getDownloadPM25DailyDataLink =
      await monitoringStationPage.getDownloadPM25DailyDataLink.getText()
    await monitoringStationPage.getDownloadPM25DailyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadPM25DailyDataLink.isClickable()
    const expectedgetDownloadPM25DailyDataLink = 'Download daily average data'
    await expect(getDownloadPM25DailyDataLink).toMatch(
      expectedgetDownloadPM25DailyDataLink
    )

    const DownloadPM25DailyDataLink = [
      await monitoringStationPage.getDownloadPM25DailyDataLink
    ]

    const DownloadPM25DailyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM25DailyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadPM25DailyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Daily Data for PM10, AQD-629', async () => {
    const getDownloadPM10DailyDataLink =
      await monitoringStationPage.getDownloadPM10DailyDataLink.getText()
    await monitoringStationPage.getDownloadPM10DailyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadPM10DailyDataLink.isClickable()
    const expectedgetDownloadPM10DailyDataLink = 'Download daily average data'
    await expect(getDownloadPM10DailyDataLink).toMatch(
      expectedgetDownloadPM10DailyDataLink
    )

    const DownloadPM10DailyDataLink = [
      await monitoringStationPage.getDownloadPM10DailyDataLink
    ]

    const DownloadPM10DailyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM10DailyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadPM10DailyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Daily Data for Ozone, AQD-630', async () => {
    const getDownloadOzoneDailyDataLink =
      await monitoringStationPage.getDownloadOzoneDailyDataLink.getText()
    await monitoringStationPage.getDownloadOzoneDailyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadOzoneDailyDataLink.isClickable()
    const expectedgetDownloadOzoneDailyDataLink = 'Download daily average data'
    await expect(getDownloadOzoneDailyDataLink).toMatch(
      expectedgetDownloadOzoneDailyDataLink
    )

    const DownloadOzoneDailyDataLink = [
      await monitoringStationPage.getDownloadOzoneDailyDataLink
    ]

    const DownloadOzoneDailyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadOzoneDailyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadOzoneDailyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Daily Data for Sulphur Dioxide, AQD-631', async () => {
    const getDownloadSulphurDioxideDailyDataLink =
      await monitoringStationPage.getDownloadSulphurDioxideDailyDataLink.getText()
    await monitoringStationPage.getDownloadSulphurDioxideDailyDataLink.isDisplayed()
    await monitoringStationPage.getDownloadSulphurDioxideDailyDataLink.isClickable()
    const expectedgetDownloadSulphurDioxideDailyDataLink =
      'Download daily average data'
    await expect(getDownloadSulphurDioxideDailyDataLink).toMatch(
      expectedgetDownloadSulphurDioxideDailyDataLink
    )

    const DownloadSulphurDioxideDailyDataLink = [
      await monitoringStationPage.getDownloadSulphurDioxideDailyDataLink
    ]

    const DownloadSulphurDioxideDailyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadSulphurDioxideDailyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadSulphurDioxideDailyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Annual Data for All Pollutants, AQD-670', async () => {
    const getDownloadAllPollutantsAnnualDataLink =
      await monitoringStationPage.getDownloadAllPollutantsAnnualDataLink.getText()
    await monitoringStationPage.getDownloadAllPollutantsAnnualDataLink.isDisplayed()
    await monitoringStationPage.getDownloadAllPollutantsAnnualDataLink.isClickable()
    const expectedDownloadAllPollutantsAnnualDataLink =
      'Download annual average data'
    await expect(getDownloadAllPollutantsAnnualDataLink).toMatch(
      expectedDownloadAllPollutantsAnnualDataLink
    )

    const DownloadAllPollutantsAnnualDataLinkStyling = [
      await monitoringStationPage.getDownloadAllPollutantsAnnualDataLink
    ]

    const DownloadAllPollutantsAnnualDataLinkStylingProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadAllPollutantsAnnualDataLinkStyling) {
      const styles = await common.getStyles(
        element,
        DownloadAllPollutantsAnnualDataLinkStylingProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Annual Data for PM2.5, AQD-674', async () => {
    const getDownloadPM25AnnualDataLink =
      await monitoringStationPage.getDownloadPM25AnnualDataLink.getText()
    await monitoringStationPage.getDownloadPM25AnnualDataLink.isDisplayed()
    await monitoringStationPage.getDownloadPM25AnnualDataLink.isClickable()
    const expectedDownloadPM25AnnualDataLink = 'Download annual average data'
    await expect(getDownloadPM25AnnualDataLink).toMatch(
      expectedDownloadPM25AnnualDataLink
    )

    const DownloadPM25AnnualDataLinkStyling = [
      await monitoringStationPage.getDownloadPM25AnnualDataLink
    ]

    const DownloadPM25AnnualDataLinkStylingProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM25AnnualDataLinkStyling) {
      const styles = await common.getStyles(
        element,
        DownloadPM25AnnualDataLinkStylingProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Annual Data for PM10, AQD-675', async () => {
    const getDownloadPM10AnnualDataLink =
      await monitoringStationPage.getDownloadPM10AnnualDataLink.getText()
    await monitoringStationPage.getDownloadPM10AnnualDataLink.isDisplayed()
    await monitoringStationPage.getDownloadPM10AnnualDataLink.isClickable()
    const expectedDownloadPM10AnnualDataLink = 'Download annual average data'
    await expect(getDownloadPM10AnnualDataLink).toMatch(
      expectedDownloadPM10AnnualDataLink
    )

    const DownloadPM10AnnualDataLinkStyling = [
      await monitoringStationPage.getDownloadPM10AnnualDataLink
    ]

    const DownloadPM10AnnualDataLinkStylingProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM10AnnualDataLinkStyling) {
      const styles = await common.getStyles(
        element,
        DownloadPM10AnnualDataLinkStylingProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Annual Data for Nitrogen Dioxide, AQD-676', async () => {
    const getDownloadNitrogenDioxideAnnualDataLink =
      await monitoringStationPage.getDownloadNitrogenDioxideAnnualDataLink.getText()
    await monitoringStationPage.getDownloadNitrogenDioxideAnnualDataLink.isDisplayed()
    await monitoringStationPage.getDownloadNitrogenDioxideAnnualDataLink.isClickable()
    const expectedDownloadNitrogenDioxideAnnualDataLink =
      'Download annual average data'
    await expect(getDownloadNitrogenDioxideAnnualDataLink).toMatch(
      expectedDownloadNitrogenDioxideAnnualDataLink
    )

    const DownloadNitrogenDioxideAnnualDataLinkkStyling = [
      await monitoringStationPage.getDownloadNitrogenDioxideAnnualDataLink
    ]

    const DownloadNitrogenDioxideAnnualDataLinkStylingProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadNitrogenDioxideAnnualDataLinkkStyling) {
      const styles = await common.getStyles(
        element,
        DownloadNitrogenDioxideAnnualDataLinkStylingProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Annual Data for Ozone, AQD-677', async () => {
    const getDownloadOzoneAnnualDataLink =
      await monitoringStationPage.getDownloadOzoneAnnualDataLink.getText()
    await monitoringStationPage.getDownloadOzoneAnnualDataLink.isDisplayed()
    await monitoringStationPage.getDownloadOzoneAnnualDataLink.isClickable()
    const expectedDownloadOzoneAnnualDataLink = 'Download annual average data'
    await expect(getDownloadOzoneAnnualDataLink).toMatch(
      expectedDownloadOzoneAnnualDataLink
    )

    const DownloadDownloadOzoneAnnualDataLinkStyling = [
      await monitoringStationPage.getDownloadOzoneAnnualDataLink
    ]

    const DownloadOzoneAnnualDataLinkStylingProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadDownloadOzoneAnnualDataLinkStyling) {
      const styles = await common.getStyles(
        element,
        DownloadOzoneAnnualDataLinkStylingProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Download Annual Data for Sulphur Dioxide, AQD-678', async () => {
    const getDownloadSulphurDioxideAnnualDataLink =
      await monitoringStationPage.getDownloadSulphurDioxideAnnualDataLink.getText()
    await monitoringStationPage.getDownloadSulphurDioxideAnnualDataLink.isDisplayed()
    await monitoringStationPage.getDownloadSulphurDioxideAnnualDataLink.isClickable()
    const expectedDownloadSulphurDioxideAnnualDataLink =
      'Download annual average data'
    await expect(getDownloadSulphurDioxideAnnualDataLink).toMatch(
      expectedDownloadSulphurDioxideAnnualDataLink
    )

    const DownloadSulphurDioxideAnnualDataLinkStyling = [
      await monitoringStationPage.getDownloadSulphurDioxideAnnualDataLink
    ]

    const DownloadSulphurDioxideAnnualDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadSulphurDioxideAnnualDataLinkStyling) {
      const styles = await common.getStyles(
        element,
        DownloadSulphurDioxideAnnualDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('Low Data Capture % Toggle Tip, AQD-760', async () => {
    await browser.url('')
    await startNowPage.startNowBtnClick()
    // await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('Birmingham')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('Birmingham')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham Ladywood')
      .click()
    await monitoringStationPage.get2023Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 6000))
        return true
      },
      { timeout: 6000 }
    )
    const oneDataCapturePercentageUnder75 = [
      await monitoringStationPage.getSDDataCapture
    ]
    const isDataCaptureUnder75 = await common.isAnyCaptureUnderAmount(
      oneDataCapturePercentageUnder75,
      75
    )
    expect(isDataCaptureUnder75).toBe(true)
    const getAnnualAverage =
      await monitoringStationPage.getSulphurDioxideAnnaulAverageST.getText()
    const expectedAnnualAverage = `-`
    await expect(getAnnualAverage).toMatch(expectedAnnualAverage)
    await monitoringStationPage.getDataCaptureToggleTip.isDisplayed()
    await monitoringStationPage.getDataCaptureToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return true
      },
      { timeout: 3000 }
    )
    const getDataCaptureToggleTipInfoText =
      await monitoringStationPage.getDataCaptureToggleTipInfoText.getText()
    const expectedDataCaptureToggleTipInfoText = `Data capture under 75% is low. We do not calculate the average when data capture is low.`
    await expect(getDataCaptureToggleTipInfoText).toMatch(
      expectedDataCaptureToggleTipInfoText
    )

    const DataCapturePercentageUnder75InfoText = [
      await monitoringStationPage.getDataCaptureToggleTipInfoText
    ]
    const DataCapturePercentageUnder75InfoTextProperties = [
      'color',
      'background-color'
    ]
    for (const element of DataCapturePercentageUnder75InfoText) {
      const styles = await common.getStyles(
        element,
        DataCapturePercentageUnder75InfoTextProperties
      )
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }

    await monitoringStationPage.getLowDataCaptureFlag.isDisplayed()
    const getLowDataCaptureFlagText =
      await monitoringStationPage.getLowDataCaptureFlag.getText()
    const expectedLowDataCaptureFlagText = `Low data capture`
    await expect(getLowDataCaptureFlagText).toMatch(
      expectedLowDataCaptureFlagText
    )

    const getLowDataCaptureFlagStyles = [
      await monitoringStationPage.getLowDataCaptureFlag
    ]
    const getLowDataCaptureFlagStylesProperties = [
      'font-size',
      'line-height',
      'background-color',
      'color'
    ]
    for (const element of getLowDataCaptureFlagStyles) {
      const styles = await common.getStyles(
        element,
        getLowDataCaptureFlagStylesProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['background-color']).toBe('rgb(244, 205, 198)')
      expect(styles.color).toBe('rgb(42, 11, 6)')
    }
  })
})
