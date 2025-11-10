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

describe('monitoring station list page tests', () => {
  it('titles and content', async () => {
    await browser.deleteCookies(['airaqie_cookies_analytics'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await startNowPage.startNowBtnClick()
    // await hubPage.getFindMonitoringStationsByLocation.click()
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('B2 4QA')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('B2 4QA')

    const listPageHeading = `Monitoring stations within 50 miles of B2 4QA`
    const getlistPageHeading =
      await locationMonitoringStationListPage.getMonitoringStationListPageHeading.getText()
    await expect(getlistPageHeading).toMatch(listPageHeading)
  })

  it('checking links', async () => {
    // checking back link
    await common.getBackLink.click()
    await browser.refresh()
    const getCurrentURLAfterBackLink = await browser.getUrl()
    const expectedURL = '/multiplelocations'
    await expect(getCurrentURLAfterBackLink).toMatch(expectedURL)
    await disambigurationPage.locationLinkClick('B2 4QA')

    // checking change search area link
    await locationMonitoringStationListPage.getChangeSearchAreaLink.click()
    await browser.refresh()
    const expectedURLAfterChangeSearchAreaLink = '/search-location'
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
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('B2 4QA')

    // checking monitoring station links
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham A4540 Roadside')
      .click()
    const getCurrentURLOfA450Roadside = await browser.getUrl()
    const expectedURLOfA450Roadside = '/stationdetails/BirminghamA4540Roadside'
    await expect(getCurrentURLOfA450Roadside).toMatch(expectedURLOfA450Roadside)
    await common.getBackLink.click()
    browser.refresh()

    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham Ladywood')
      .click()
    const getCurrentURLOfBirminghamLadywood = await browser.getUrl()
    const expectedURLOfBirminghamLadywood = '/stationdetails/BirminghamLadywood'
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
      '/stationdetails/OldburyBirminghamRoad'
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
        'underline 1px solid rgb(11, 12, 12)'
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
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(11, 12, 12)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
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
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
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
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
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
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
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

    const getPollutantList = [
      await locationMonitoringStationListPage.getPollutantList1
    ]

    const getPollutantListProperties = ['padding', 'padding-right']

    for (const element of getPollutantList) {
      const styles = await common.getStyles(element, getPollutantListProperties)
      expect(styles.padding).toBe('10px 0px')
      expect(styles['padding-right']).toBe('0px')
    }
  })

  it('Include applicable pollutants in list of monitoring stations and match to summary data table, manual test : AQD-320, regression ticket : AQD-557', async () => {
    const pollutantListBirminghamLadywood =
      await locationMonitoringStationListPage.getPollutionListFromListPage(
        "tr:nth-child(2) td[class='govuk-table__cell govuk-table__cell--numeric']"
      )
    const pollutantListBirminghamLadywoodString =
      pollutantListBirminghamLadywood.join(',')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham Ladywood')
      .click()
    const birminghamLadywoodSummaryTablePollutantList =
      await monitoringStationPage.getPollutionListFromSummaryTable()
    const birminghamLadywoodSummaryTablePollutantListString =
      birminghamLadywoodSummaryTablePollutantList.join(',')
    await expect(pollutantListBirminghamLadywoodString).toMatch(
      birminghamLadywoodSummaryTablePollutantListString
    )
    await common.getBackLink.click()

    const pollutantListBirminghamA4540Roadside =
      await locationMonitoringStationListPage.getPollutionListFromListPage(
        "tr:nth-child(1) td[class='govuk-table__cell govuk-table__cell--numeric']"
      )
    const pollutantListBirminghamA4540RoadsideString =
      pollutantListBirminghamA4540Roadside.join(',')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham A4540 Roadside')
      .click()
    const birminghamA4540RoadsideSummaryTablePollutantList =
      await monitoringStationPage.getPollutionListFromSummaryTable()
    const birminghamA4540RoadsideSummaryTablePollutantListString =
      birminghamA4540RoadsideSummaryTablePollutantList.join(',')
    await expect(pollutantListBirminghamA4540RoadsideString).toMatch(
      birminghamA4540RoadsideSummaryTablePollutantListString
    )
    await common.getBackLink.click()

    const pollutantListDerbyStockbrookPark =
      await locationMonitoringStationListPage.getPollutionListFromListPage(
        "tr:nth-child(15) td[class='govuk-table__cell govuk-table__cell--numeric']"
      )
    const pollutantListDerbyStockbrookParkString =
      pollutantListDerbyStockbrookPark.join(',')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Derby Stockbrook Park')
      .click()
    const DerbyStockbrookParkSummaryTablePollutantList =
      await monitoringStationPage.getPollutionListFromSummaryTable()
    const DerbyStockbrookParkSummaryTablePollutantListString =
      DerbyStockbrookParkSummaryTablePollutantList.join(',')
    await expect(pollutantListDerbyStockbrookParkString).toMatch(
      DerbyStockbrookParkSummaryTablePollutantListString
    )
    await common.getBackLink.click()

    const pollutantListWestBromwichKenrickPark =
      await locationMonitoringStationListPage.getPollutionListFromListPage(
        "tr:nth-child(3) td[class='govuk-table__cell govuk-table__cell--numeric']"
      )
    const pollutantListWestBromwichKenrickParkString =
      pollutantListWestBromwichKenrickPark.join(',')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('West Bromwich Kenrick Park')
      .click()
    const WestBromwichKenrickParkSummaryTablePollutantList =
      await monitoringStationPage.getPollutionListFromSummaryTable()
    const WestBromwichKenrickParkSummaryTablePollutantListString =
      WestBromwichKenrickParkSummaryTablePollutantList.join(',')
    await expect(pollutantListWestBromwichKenrickParkString).toMatch(
      WestBromwichKenrickParkSummaryTablePollutantListString
    )
    await common.getBackLink.click()

    /*
    const pollutantListOldburyBirminghamRoad     =
      await locationMonitoringStationListPage.getPollutionListFromListPage("tr:nth-child(4) td[class='govuk-table__cell govuk-table__cell--numeric']")
    const pollutantListOldburyBirminghamRoadString = pollutantListOldburyBirminghamRoad.join(',');
    await console.log(pollutantListOldburyBirminghamRoadString)
    await locationMonitoringStationListPage.getMonitoringStationLink('Oldbury Birmingham Road').click()
    const oldburyBirminghamRoadSummaryTablePollutantList = await monitoringStationPage.getPollutionListFromSummaryTable()
    const oldburyBirminghamRoadSummaryTablePollutantListString = oldburyBirminghamRoadSummaryTablePollutantList.join(',');
    await console.log(oldburyBirminghamRoadSummaryTablePollutantListString)
    await expect(pollutantListOldburyBirminghamRoadString).toMatch(oldburyBirminghamRoadSummaryTablePollutantListString)
    await common.getBackLink.click() */ // theres a bug with api
  })
})
