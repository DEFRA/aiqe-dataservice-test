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
View on Google Maps (opens in a new tab)`
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
    // checking links
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
    await monitoringStationPage.getGoogleMapLink.click()
    // await monitoringStationPage.getGoogleCookieAccept.click()

    // await browser.pause(30000)
    // const getURLAfterGoogleMapClick = await browser.getUrl()
    // const expectedgetURLAfterGoogleMapClick =
    //  'https://www.google.co.uk/maps?q=52.476145,-1.874978'
    // await expect(getURLAfterGoogleMapClick).toMatch(expectedgetURLAfterGoogleMapClick)
  })
})
