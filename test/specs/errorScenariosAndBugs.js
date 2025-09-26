import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
import errorPage from '../page-objects/errorPage.js'
import searchPage from '../page-objects/searchPage.js'
import disambigurationPage from '../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'

describe('Error scenarios', () => {
  it('search page error message validation', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.maximizeWindow()
    await browser.url('')
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await startNowPage.startNowBtnClick()
    await searchPage.setsearch('')
    await searchPage.milesOptionClick('')
    await searchPage.continueBtnClick()
    await errorPage.getErrorSummary.isDisplayed()
    await errorPage.getErrorTitle.isDisplayed()
    await errorPage.getErrorLink.isDisplayed()
    await errorPage.getErrorMessage.isDisplayed()
    await errorPage.getErrorLink.click()

    const errorTitle = 'There is a problem'
    const GetErrorTitle = await errorPage.getErrorTitle.getText()
    await expect(errorTitle).toMatch(GetErrorTitle)

    const errorLink = 'Enter a town or postcode'
    const GetErrorLink = await errorPage.getErrorLink.getText()
    await expect(errorLink).toMatch(GetErrorLink)

    const errorMessage = `Error:
Enter a town or postcode`
    const GetErrorMessage = await errorPage.getErrorMessage.getText()
    await expect(errorMessage).toMatch(GetErrorMessage)

    await searchPage.setsearch(
      '! " # $ % & ` ( ) * + , - / : ; < = > ? @ [ ] ^ _ { | } ~'
    )
    await errorPage.getErrorSummary.isDisplayed()
    await errorPage.getErrorTitle.isDisplayed()
    await errorPage.getErrorLink.isDisplayed()
    await errorPage.getErrorMessage.isDisplayed()
  })

  it('search page error message Styling', async () => {
    // styling validation for error message

    const getErrorSummary = [await errorPage.getErrorSummary]

    const getErrorSummaryProperties = ['margin-bottom', 'padding', 'border']

    for (const element of getErrorSummary) {
      const styles = await common.getStyles(element, getErrorSummaryProperties)
      expect(styles['margin-bottom']).toBe('50px')
      expect(styles.padding).toBe('20px')
      expect(styles.border).toBe('5px solid rgb(212, 53, 28)')
    }

    const getErrorTitle = [await errorPage.getErrorTitle]

    const getErrorTitleProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-weight',
      'font-family',
      'color'
    ]

    for (const element of getErrorTitle) {
      const styles = await common.getStyles(element, getErrorTitleProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getErrorLink = [await errorPage.getErrorLink]

    const getErrorLinkProperties = [
      'color',
      'font-family',
      'font-weight',
      'text-decoration',
      'font-size',
      'line-height'
    ]

    for (const element of getErrorLink) {
      const styles = await common.getStyles(element, getErrorLinkProperties)
      expect(styles.color).toBe('rgb(212, 53, 28)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(212, 53, 28)'
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
    }

    const getErrorMessage = [await errorPage.getErrorMessage]

    const getErrorMessageProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getErrorMessage) {
      const styles = await common.getStyles(element, getErrorMessageProperties)
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(212, 53, 28)')
      expect(styles['font-weight']).toBe('700')
      expect(styles['margin-bottom']).toBe('15px')
    }

    const getErrorFormGroup = [await errorPage.getErrorFormGroup]

    const getErrorFormGroupProperties = [
      'border-left',
      'padding-left',
      'margin-bottom'
    ]

    for (const element of getErrorFormGroup) {
      const styles = await common.getStyles(
        element,
        getErrorFormGroupProperties
      )
      expect(styles['border-left']).toBe('5px solid rgb(212, 53, 28)')
      expect(styles['padding-left']).toBe('15px')
      expect(styles['margin-bottom']).toBe('30px')
    }
  })
})

describe('Error scenarios', () => {
  it('could not find error page validation, no results with invalid search', async () => {
    await searchPage.setsearch('dddffggggjgjj')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const PageHeading2 = `We could not find 'dddffggggjgjj'`
    const getPageHeading2 = await errorPage.getCouldNotFindHeading.getText()
    await expect(PageHeading2).toMatch(getPageHeading2)
    await common.getBackLink.click()
    await searchPage.setsearch('thailand')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const PageHeading3 = `We could not find 'thailand'`
    const getPageHeading3 = await errorPage.getCouldNotFindHeading.getText()
    await expect(PageHeading3).toMatch(getPageHeading3)
    await errorPage.getGoBackToSearchALocationLink.click()
    const getCurrentURLAfterBackLink4 = await browser.getUrl()
    const expectedURL4 = '/search-location'
    await expect(getCurrentURLAfterBackLink4).toMatch(expectedURL4)
    await searchPage.setsearch('thailand')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
  })

  it('could not find error page content and styling', async () => {
    const CouldNotFindContent = `We could not find 'thailand'
If you searched for a place in England, Scotland or Wales, you should:
check the spelling
enter a broader location
enter a correct postcode
If you searched for a place in Northern Ireland, check that you have entered the correct postcode.
Go back to search a location`
    const getCouldNotFindContent =
      await errorPage.getCouldNotFindContent.getText()
    await expect(CouldNotFindContent).toMatch(getCouldNotFindContent)

    const getCouldNotFindHeading = [await errorPage.getCouldNotFindHeading]

    const getCouldNotFindHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getCouldNotFindHeading) {
      const styles = await common.getStyles(
        element,
        getCouldNotFindHeadingProperties
      )

      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getCouldNotFindContent2 = [await errorPage.getCouldNotFindContent]

    const getCouldNotFindContentProperties = ['padding-bottom', 'padding-top']

    for (const element of getCouldNotFindContent2) {
      const styles = await common.getStyles(
        element,
        getCouldNotFindContentProperties
      )

      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const getGoBackToSearchALocationLink = [
      await errorPage.getGoBackToSearchALocationLink
    ]

    const getGoBackToSearchALocationLinkProperties = [
      'font-size',
      'line-height',
      'font-family',
      'font-weight'
    ]

    for (const element of getGoBackToSearchALocationLink) {
      const styles = await common.getStyles(
        element,
        getGoBackToSearchALocationLinkProperties
      )

      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
  })
  it('could not find results, valid search AQD-585', async () => {
    // search checks and title checks

    await common.getBackLink.click()
    await searchPage.setsearch('portree')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    const portreeHeading3 = `There are no monitoring stations within 50 miles of 'portree'`
    const getportreeErrorHeading3 =
      await errorPage.getCouldNotFindHeading.getText()
    await expect(portreeHeading3).toMatch(getportreeErrorHeading3)
    const paragraphContent50 = await errorPage.getCouldNotFindP.getText()
    const expectedParagraphContent50 = `Go back to search a location`
    await expect(paragraphContent50).toMatch(expectedParagraphContent50)
    await common.getBackLink.click()

    await searchPage.setsearch('portree')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const portreeHeading1 = `There are no monitoring stations within 5 miles of 'portree'`
    const getportreeErrorHeading1 =
      await errorPage.getCouldNotFindHeading.getText()
    await expect(portreeHeading1).toMatch(getportreeErrorHeading1)
    const paragraphContent5 = await errorPage.getCouldNotFindP.getText()
    const expectedParagraphContent5 = `You should either:`
    await expect(paragraphContent5).toMatch(expectedParagraphContent5)
    const getCouldNotFindListContent5 =
      await errorPage.getCouldNotFindList.getText()
    const expectedgetCouldNotFindList5 = `choose a different search area
choose a different location`
    await expect(getCouldNotFindListContent5).toMatch(
      expectedgetCouldNotFindList5
    )
    await common.getBackLink.click()

    await searchPage.setsearch('portree')
    await searchPage.milesOptionClick('25 miles')
    await searchPage.continueBtnClick()
    const portreeHeading2 = `There are no monitoring stations within 25 miles of 'portree'`
    const getportreeErrorHeading2 =
      await errorPage.getCouldNotFindHeading.getText()
    await expect(portreeHeading2).toMatch(getportreeErrorHeading2)
    const paragraphContent = await errorPage.getCouldNotFindP.getText()
    const expectedParagraphContent = `You should either:`
    await expect(paragraphContent).toMatch(expectedParagraphContent)
    const getCouldNotFindListContent =
      await errorPage.getCouldNotFindList.getText()
    const expectedgetCouldNotFindList = `choose a different search area
choose a different location`
    await expect(getCouldNotFindListContent).toMatch(
      expectedgetCouldNotFindList
    )

    // styling checks for paragraph and list
    const getParagraphStyle = [await errorPage.getCouldNotFindP]

    const getParagraphStyleProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getParagraphStyle) {
      const styles = await common.getStyles(
        element,
        getParagraphStyleProperties
      )

      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getCouldNotFindListStyle = [await errorPage.getCouldNotFindList]

    const getCouldNotFindListStyleProperties = [
      'list-style-type',
      'padding-left',
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getCouldNotFindListStyle) {
      const styles = await common.getStyles(
        element,
        getCouldNotFindListStyleProperties
      )

      expect(styles['list-style-type']).toBe('disc')
      expect(styles['padding-left']).toBe('20px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getCouldNotFindListItemStyle = [
      await errorPage.getCouldNotFindListItem
    ]

    const getCouldNotFindListItemStyleProperties = [
      'margin-bottom',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getCouldNotFindListItemStyle) {
      const styles = await common.getStyles(
        element,
        getCouldNotFindListItemStyleProperties
      )

      expect(styles['margin-bottom']).toBe('5px')
      expect(styles.display).toBe('list-item')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it(`data capture showing incorrect percentage,AQD-642
      Data Capture % Logic Change Required,AQD-679`, async () => {
    await common.getBackLink.click()
    await searchPage.setsearch('london')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()
    await monitoringStationPage.get2024Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const DataCapturePercentage2024 = [
      await monitoringStationPage.getPM25DataCapture,
      await monitoringStationPage.getPM10DataCapture,
      await monitoringStationPage.getNODataCapture,
      await monitoringStationPage.getOzoneDataCapture,
      await monitoringStationPage.getSDDataCapture
    ]
    const areAnyDataCapturePercentage2024Over100 =
      await common.isAnyCaptureOverAmount(DataCapturePercentage2024, 100)
    expect(areAnyDataCapturePercentage2024Over100).toBe(false)

    await monitoringStationPage.get2025Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      },
      { timeout: 2000 }
    )
    const DataCapturePercentage2025 = [
      await monitoringStationPage.getPM25DataCapture,
      await monitoringStationPage.getPM10DataCapture,
      await monitoringStationPage.getNODataCapture,
      await monitoringStationPage.getOzoneDataCapture,
      await monitoringStationPage.getSDDataCapture
    ]
    const areAnyDataCapturePercentage2025Over100 =
      await common.isAnyCaptureOverAmount(DataCapturePercentage2025, 100)
    expect(areAnyDataCapturePercentage2025Over100).toBe(false)
    const areAnyDataCapturePercentage2025Below40 =
      await common.isAnyCaptureUnderAmount(DataCapturePercentage2025, 40)
    expect(areAnyDataCapturePercentage2025Below40).toBe(false)

    const dataCaptureStyles = [
      await monitoringStationPage.getPM25DataCapture,
      await monitoringStationPage.getPM10DataCapture,
      await monitoringStationPage.getNODataCapture,
      await monitoringStationPage.getOzoneDataCapture,
      await monitoringStationPage.getSDDataCapture
    ]

    const dataCaptureStylesProperties = [
      'display',
      'font-size',
      'font-weight',
      'margin-top',
      'line-height',
      'font-family',
      'text-align'
    ]

    for (const element of dataCaptureStyles) {
      const styles = await common.getStyles(
        element,
        dataCaptureStylesProperties
      )

      expect(styles.display).toBe('block')
      expect(styles['font-size']).toBe('16px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-top']).toBe('5px')
      expect(styles['line-height']).toBe('21.0526px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-align']).toBe('left')
    }
    await monitoringStationPage.get2018Button.click()
  })

  it('No Data for Selected Year,AQD-643', async () => {
    await common.getBackLink.click()
    await locationMonitoringStationListPage.getChangeSearchAreaLink.click()
    await searchPage.setsearch('milton keynes')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('Milton Keynes')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Milton Keynes Civic Centre')
      .click()
    await monitoringStationPage.get2019Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    await errorPage.noDataForThisYearMessage.isDisplayed()
    const getNoDataForThisYearMessage =
      await errorPage.noDataForThisYearMessage.getText()
    const NoDataForThisYearMessage = 'There is no data available for this year.'
    await expect(getNoDataForThisYearMessage).toMatch(NoDataForThisYearMessage)

    const noDataForThisYearMessageStyles = [
      await errorPage.noDataForThisYearMessage
    ]

    const noDataForThisYearMessageStylesProperties = [
      'margin-bottom',
      'margin-top',
      'font-size',
      'line-height',
      'font-family',
      'border-left',
      'clear',
      'color',
      'font-weight',
      'padding'
    ]

    for (const element of noDataForThisYearMessageStyles) {
      const styles = await common.getStyles(
        element,
        noDataForThisYearMessageStylesProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['margin-top']).toBe('30px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-left']).toBe('10px solid rgb(177, 180, 182)')
      expect(styles.clear).toBe('both')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.padding).toBe('15px')
    }
  })

  it('Error 404,AQD-666', async () => {
    await browser.url('/404')

    const getError404HeadingStyling = [await errorPage.getError404Heading]

    const getError404HeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getError404HeadingStyling) {
      const styles = await common.getStyles(
        element,
        getError404HeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getError404MainContentStyling = [
      await errorPage.getError404MainContent
    ]

    const getError404MainContentStylingProperties = [
      'padding-bottom',
      'padding-top'
    ]

    for (const element of getError404MainContentStyling) {
      const styles = await common.getStyles(
        element,
        getError404MainContentStylingProperties
      )
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const getError404PContentStyling = [
      await errorPage.getError404PContentStyling
    ]

    const getError404PContentStylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight',
      'margin-top'
    ]

    for (const element of getError404PContentStyling) {
      const styles = await common.getStyles(
        element,
        getError404PContentStylingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-top']).toBe('0px')
    }

    const getError404AirQualityEmailLinkStyling = [
      await errorPage.getError404AirQualityEmailLink
    ]

    const getError404AirQualityEmailLinkStylingProperties = [
      'color',
      'text-decoration',
      'font-size',
      'line-height',
      'font-family',
      'font-weight'
    ]

    for (const element of getError404AirQualityEmailLinkStyling) {
      const styles = await common.getStyles(
        element,
        getError404AirQualityEmailLinkStylingProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const Error404Heading = 'Page not found'
    const getError404Heading = await errorPage.getError404Heading.getText()
    await expect(Error404Heading).toMatch(getError404Heading)

    const Error404MainContent = `Page not found
If you typed the web address, check it is correct.
If you pasted the web address, check you copied the entire address.
Contact the air quality team if you continue to get this error message`
    const getError404MainContent =
      await errorPage.getError404MainContent.getText()
    await expect(Error404MainContent).toMatch(getError404MainContent)
    const contactLink = await errorPage.getError404AirQualityEmailLink
    const href = await contactLink.getAttribute('href')
    expect(href).toContain('mailto:getairpollutiondata@defra.gov.uk')
  })

  it('PM10 Toggle Tip not behaving as expected for Wrexham Monitoring Station, AQD-712', async () => {
    await browser.url('')
    await startNowPage.startNowBtnClick()
    await searchPage.setsearch('Wrexham')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Wrexham')
      .click()
    await monitoringStationPage.getPM10DailyExceedenceToggleTip.moveTo()
    const getPM10DailyExceedenceToggleTipInfoTextHover = [
      await monitoringStationPage.getPM10DailyExceedenceToggleTipInfoText
    ]

    const getPM10DailyExceedenceToggleTipInfoTextHoverProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM10DailyExceedenceToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getPM10DailyExceedenceToggleTipInfoTextHoverProperties
      )
      expect(styles.visibility).toBe('visible')
    }
  })

  it('site ID missing for tower hamlets, remove it from station list, AQD-713', async () => {
    await browser.url('')
    await startNowPage.startNowBtnClick()
    await searchPage.setsearch('Tower Hamlets')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const noTowerHamletStation =
      await errorPage.getCouldNotFindHeading.getText()
    const expectedPageHeading =
      "There are no monitoring stations within 5 miles of 'Tower Hamlets'"
    await expect(noTowerHamletStation).toMatch(expectedPageHeading)
  })
})
