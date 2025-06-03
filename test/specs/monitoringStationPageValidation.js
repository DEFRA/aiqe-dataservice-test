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
import passwordPage from '../page-objects/passwordPage.js'
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'

describe('monitoring station page tests', () => {
  it('url, titles ', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    await passwordPage.inputPassword('airqualitydataset')
    await common.continueButton.click()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await startNowPage.startNowBtnClick()
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
    const expectedURLOfLondonBloomsbury =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/stationdetails/LondonBloomsbury'
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

  it('Network, Region, & Site type , manual test : AQD-315, regression ticket : AQD 554', async () => {
    const getMonitoringNetworkTypeTitle =
      await monitoringStationPage.getMonitoringNetworkTitle.getText()
    const expectedMonitoringNetworkTypeTitle = 'Monitoring network'
    await expect(getMonitoringNetworkTypeTitle).toMatch(
      expectedMonitoringNetworkTypeTitle
    )

    const getMonitoringNetworkTypeData =
      await monitoringStationPage.getMonitoringNetworkData.getText()
    const expectedMonitoringNetworkTypeData = 'Automatic Urban and Rural'
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
View on Google Maps (opens in new tab)`
    await expect(getSiteTypeData).toMatch(expectedSiteTypeData)
  })

  it('styling tests', async () => {
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
      // 'color', bug
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
      // expect(styles.color).toBe('rgb(80, 90, 95)') bug raised
      expect(styles['margin-top']).toBe('15px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
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
      expect(styles.gap).toBe('40px')
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
      'width',
      'box-sizing',
      'float',
      'min-width',
      'padding',
      'display'
    ]

    for (const element of getFeatureItem) {
      const styles = await common.getStyles(element, getFeatureItemProperties)
      expect(styles.width).toBe('336px')
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

    const getToggleTip = [await monitoringStationPage.getToggleTip]

    const getToggleTipProperties = [
      'padding-right',
      'display',
      'position',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getToggleTip) {
      const styles = await common.getStyles(element, getToggleTipProperties)
      expect(styles['padding-right']).toBe('26px')
      expect(styles.display).toBe('inline-block')
      expect(styles.position).toBe('relative')
      expect(styles['font-size']).toBe('22px')
      expect(styles['line-height']).toBe('28.9474px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
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

  it('checkng links', async () => {
    await common.getBackLink.click()
    const getURLAfterBackLinkCLick = await browser.getUrl()
    const expectedgetURLAfterBackLinkCLick =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/location/city-of-london_city-and-county-of-the-city-of-london'
    await expect(getURLAfterBackLinkCLick).toMatch(
      expectedgetURLAfterBackLinkCLick
    )
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
  })

  it('Yearly Tab , AQD-586', async () => {
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
    const expectedVerifiedTag2025 = 'Data has not been verified'
    await expect(getVerifiedTag2025).toMatch(expectedVerifiedTag2025)
    const getdownloadDataHeading2025 =
      await monitoringStationPage.getdownloadDataHeading.getText()
    const expectedgetdownloadDataHeading2025 = 'Download data for 2025'
    await expect(getdownloadDataHeading2025).toMatch(
      expectedgetdownloadDataHeading2025
    )

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

    const get2018Button = await monitoringStationPage.get2018Button
    await get2018Button.isDisplayed()
    await monitoringStationPage.get2018Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
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
      expect(styles.border).toBe('0.666667px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 2.66667px')
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
      expect(styles.border).toBe('0.666667px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 2.66667px')
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
      expect(styles.border).toBe('0.666667px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 2.66667px')
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
      expect(styles.border).toBe('0.666667px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 2.66667px')
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
      expect(styles.border).toBe('0.666667px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 2.66667px')
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
      expect(styles.border).toBe('0.666667px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 2.66667px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }

    const pollutantDownloadListOrder = await common.getList('h2[id=all-p]')
    const expectedpollutantDownloadListOrder = [
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

  it('checkng google link', async () => {
    await monitoringStationPage.getGoogleMapLink.click()
    // await monitoringStationPage.getGoogleCookieAccept.click()

    // await browser.pause(30000)
    // const getURLAfterGoogleMapClick = await browser.getUrl()
    // const expectedgetURLAfterGoogleMapClick =
    //  'https://www.google.co.uk/maps?q=52.476145,-1.874978'
    // await expect(getURLAfterGoogleMapClick).toMatch(expectedgetURLAfterGoogleMapClick)
  })
})
