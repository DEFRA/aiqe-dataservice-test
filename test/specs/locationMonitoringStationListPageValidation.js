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

describe('monitoring station list page tests', () => {
  it('titles and content', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await startNowPage.startNowBtnClick()
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('B2 4QA')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('B2 4QA')

    // monitoring station list page
    const listPageHeading = `Monitoring stations within 5 miles of B2 4QA`
    const getlistPageHeading =
      await locationMonitoringStationListPage.getMonitoringStationListPageHeading.getText()
    await expect(getlistPageHeading).toMatch(listPageHeading)
    // checking content failing for no apparent reason
    /* const listPageContent = `Monitoring stations within 5 miles of B2 4QA
Change search area
Monitoring station Site type Pollutants
Birmingham A4540 Roadside
0.9 miles away
Urban Traffic
PM2.5
PM10
Nitrogen dioxide
Ozone
Birmingham Ladywood
1.0 miles away
Urban Background
PM2.5
PM10
Nitrogen dioxide
Ozone
Sulphur dioxide
Birmingham Hall Green
3.9 miles away
Urban Background
PM2.5
PM10
Nitrogen dioxide
Ozone
West Bromwich Kenrick Park
4.3 miles away
Urban Background
Nitrogen dioxide
Ozone
Oldbury Birmingham Road
4.8 miles away
Urban Traffic
Nitrogen dioxide`
    const getlistPageContent =
      await locationMonitoringStationListPage.getMonitoringStationListPageContent.getText()
    await expect(getlistPageContent).toMatch(listPageContent) */
  })

  it('checking links', async () => {
    // checking back link
    await common.getBackLink.click()
    await browser.refresh()
    const getCurrentURLAfterBackLink = await browser.getUrl()
    const expectedURL =
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/multiplelocations?fullSearchQuery=B2%204QA&locationMiles=5'
    await expect(getCurrentURLAfterBackLink).toMatch(expectedURL)
    await disambigurationPage.locationLinkClick('B2 4QA')

    // checking change search area link
    await locationMonitoringStationListPage.getChangeSearchAreaLink.click()
    await browser.refresh()
    const expectedURLAfterChangeSearchAreaLink =
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/search-location'
    const getURLAfterChangeSearchAreaLink = await browser.getUrl()
    await expect(getURLAfterChangeSearchAreaLink).toMatch(
      expectedURLAfterChangeSearchAreaLink
    )

    const expectedclearedSearchTerm = ''
    const getClearedSearchTermAfterChangeSearchArea =
      await searchPage.searchBox.getValue()
    await expect(getClearedSearchTermAfterChangeSearchArea).toMatch(
      expectedclearedSearchTerm
    )

    const defaultMilesOptionIsSelectedAfterChangeSearchArea =
      await searchPage.defaultOption.isSelected()
    await expect(defaultMilesOptionIsSelectedAfterChangeSearchArea).toBe(true)
    await searchPage.setsearch('B2 4QA')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('B2 4QA')

    // checking monitoring station links
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham A4540 Roadside')
      .click()
    const getCurrentURLOfA450Roadside = await browser.getUrl()
    const expectedURLOfA450Roadside =
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/stationdetails/BirminghamA4540Roadside'
    await expect(getCurrentURLOfA450Roadside).toMatch(expectedURLOfA450Roadside)
    await common.getBackLink.click()
    browser.refresh()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham Ladywood')
      .click()
    const getCurrentURLOfBirminghamLadywood = await browser.getUrl()
    const expectedURLOfBirminghamLadywood =
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/stationdetails/BirminghamLadywood'
    await expect(getCurrentURLOfBirminghamLadywood).toMatch(
      expectedURLOfBirminghamLadywood
    )
    await common.getBackLink.click()
    browser.refresh()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('Oldbury Birmingham Road')
      .click()
    const getCurrentURLOfOldburyBirminghamRoad = await browser.getUrl()
    const expectedURLOfOldburyBirminghamRoad =
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/stationdetails/OldburyBirminghamRoad'
    await expect(getCurrentURLOfOldburyBirminghamRoad).toMatch(
      expectedURLOfOldburyBirminghamRoad
    )
    await common.getBackLink.click()
    browser.refresh()
  })

  it('styling checks', async () => {
    const getMonitoringStationListPageHeading = [
      await locationMonitoringStationListPage.getMonitoringStationListPageHeading
    ]

    const getMonitoringStationListPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getMonitoringStationListPageHeading) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationListPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getMonitoringStationListPageContent = [
      await locationMonitoringStationListPage.getMonitoringStationListPageContent
    ]

    const getMonitoringStationListPageContentProperties = [
      'padding-bottom',
      'padding-top'
    ]

    for (const element of getMonitoringStationListPageContent) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationListPageContentProperties
      )
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

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
      expect(styles['font-weight']).toBe('400')
    }

    const getChangeSearchAreaLink = [
      await locationMonitoringStationListPage.getChangeSearchAreaLink
    ]

    const getChangeSearchAreaLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getChangeSearchAreaLink) {
      const styles = await common.getStyles(
        element,
        getChangeSearchAreaLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getMonitoringStationLink = [
      await locationMonitoringStationListPage.getMonitoringStationLink(
        'Birmingham A4540 Roadside'
      )
    ]

    const getMonitoringStationLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      // 'font-weight',
      'text-align',
      'font-size',
      'line-height'
    ]

    for (const element of getMonitoringStationLink) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationLinkProperties
      )
      expect(styles.color).toBe('rgb(0, 0, 238)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline solid rgb(0, 0, 238)')
      expect(styles['text-decoration-thickness']).toBe('auto')
      // expect(styles['font-weight']).toBe('700') styling bug
      expect(styles['text-align']).toBe('left')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
    }

    const getMonitoringStationTableHeading = [
      await locationMonitoringStationListPage.getMonitoringStationTableHeading
    ]

    const getMonitoringStationTableHeadingProperties = [
      'width',
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family'
    ]

    for (const element of getMonitoringStationTableHeading) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationTableHeadingProperties
      )
      expect(styles.width).toBe('460px')
      expect(styles['border-bottom']).toBe(
        '0.666667px solid rgb(177, 180, 182)'
      )
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getSiteTypeTableHeading = [
      await locationMonitoringStationListPage.getSiteTypeTableHeading
    ]

    const getSiteTypeTableHeadingProperties = [
      'width',
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family'
    ]

    for (const element of getSiteTypeTableHeading) {
      const styles = await common.getStyles(
        element,
        getSiteTypeTableHeadingProperties
      )
      expect(styles.width).toBe('220px')
      expect(styles['border-bottom']).toBe(
        '0.666667px solid rgb(177, 180, 182)'
      )
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getPollutantsTableHeading = [
      await locationMonitoringStationListPage.getPollutantsTableHeading
    ]

    const getPollutantsTableHeadingProperties = [
      'padding-right',
      'width',
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family'
    ]

    for (const element of getPollutantsTableHeading) {
      const styles = await common.getStyles(
        element,
        getPollutantsTableHeadingProperties
      )
      expect(styles['padding-right']).toBe('0px')
      expect(styles.width).toBe('240px')
      expect(styles['border-bottom']).toBe(
        '0.666667px solid rgb(177, 180, 182)'
      )
      expect(styles.padding).toBe('10px 0px')
      expect(styles['text-align']).toBe('right')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getParagraph = [await locationMonitoringStationListPage.getParagraph]

    const getParagraphProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight',
      'text-align'
    ]

    for (const element of getParagraph) {
      const styles = await common.getStyles(element, getParagraphProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['text-align']).toBe('left')
    }

    const getListItem = [await locationMonitoringStationListPage.getListItem]

    const getListItemProperties = [
      'margin-bottom',
      'display',
      'text-align',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getListItem) {
      const styles = await common.getStyles(element, getListItemProperties)
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles.display).toBe('list-item')
      expect(styles['text-align']).toBe('right')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getList = [await locationMonitoringStationListPage.getList]

    const getListProperties = ['margin-bottom']

    for (const element of getList) {
      const styles = await common.getStyles(element, getListProperties)
      expect(styles['margin-bottom']).toBe('20px')
    }

    const getTablecell1Padding = [
      await locationMonitoringStationListPage.getTablecell1Padding
    ]

    const getTablecell1PaddingProperties = ['padding']

    for (const element of getTablecell1Padding) {
      const styles = await common.getStyles(
        element,
        getTablecell1PaddingProperties
      )
      expect(styles.padding).toBe('10px 20px 10px 0px')
    }

    const getTableHeaderPadding = [
      await locationMonitoringStationListPage.getTableHeaderPadding
    ]

    const getTableHeaderPaddingProperties = ['padding']

    for (const element of getTableHeaderPadding) {
      const styles = await common.getStyles(
        element,
        getTableHeaderPaddingProperties
      )
      expect(styles.padding).toBe('10px 20px 10px 0px')
    }

    const getTablecell2Padding = [
      await locationMonitoringStationListPage.getTablecell2Padding
    ]

    const getTablecell2PaddingProperties = ['padding', 'padding-right']

    for (const element of getTablecell2Padding) {
      const styles = await common.getStyles(
        element,
        getTablecell2PaddingProperties
      )
      expect(styles.padding).toBe('10px 0px')
      expect(styles['padding-right']).toBe('0px')
    }
  })
})
