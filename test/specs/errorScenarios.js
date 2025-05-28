import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
import errorPage from '../page-objects/errorPage.js'
import searchPage from '../page-objects/searchPage.js'
import passwordPage from '../page-objects/passwordPage.js'

describe('Error scenarios', () => {
  it('search page error message validation', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.maximizeWindow()
    await browser.url('')
    await passwordPage.inputPassword('airqualitydataset')
    await common.continueButton.click()
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
  })

  it('search page error message Styling', async () => {
    // styling validation for error message

    const getErrorSummary = [await errorPage.getErrorSummary]

    const getErrorSummaryProperties = ['margin-bottom', 'padding', 'border']

    for (const element of getErrorSummary) {
      const styles = await common.getStyles(element, getErrorSummaryProperties)
      expect(styles['margin-bottom']).toBe('50px')
      expect(styles.padding).toBe('20px')
      expect(styles.border).toBe('4.66667px solid rgb(212, 53, 28)')
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
  })
})

describe('Error scenarios', () => {
  it('could not find error page validation, no results with invalid search', async () => {
    await searchPage.setsearch('!!!!"£')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const PageHeading1 = `We could not find '!!!!"£'`
    const getPageHeading1 = await errorPage.getCouldNotFindHeading.getText()
    await expect(PageHeading1).toMatch(getPageHeading1)
    await common.getBackLink.click()
    const getCurrentURLAfterBackLink = await browser.getUrl()
    const expectedURL =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/search-location'
    await expect(getCurrentURLAfterBackLink).toMatch(expectedURL)
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
    const expectedURL4 =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/search-location'
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
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const portreeHeading1 = `There are no monitoring stations within 5 miles of 'portree'`
    const getportreeErrorHeading1 =
      await errorPage.getCouldNotFindHeading.getText()
    await expect(portreeHeading1).toMatch(getportreeErrorHeading1)
    await common.getBackLink.click()

    await searchPage.setsearch('portree')
    await searchPage.milesOptionClick('25 miles')
    await searchPage.continueBtnClick()
    const portreeHeading2 = `There are no monitoring stations within 25 miles of 'portree'`
    const getportreeErrorHeading2 =
      await errorPage.getCouldNotFindHeading.getText()
    await expect(portreeHeading2).toMatch(getportreeErrorHeading2)
    await common.getBackLink.click()

    await searchPage.setsearch('portree')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    const portreeHeading3 = `There are no monitoring stations within 50 miles of 'portree'`
    const getportreeErrorHeading3 =
      await errorPage.getCouldNotFindHeading.getText()
    await expect(portreeHeading3).toMatch(getportreeErrorHeading3)
    // content checks
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
})
