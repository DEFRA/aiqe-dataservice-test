import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
import errorPage from '../page-objects/errorPage.js'
import searchPage from '../page-objects/searchPage.js'

describe('Error scenarios', () => {
  it('Error scenarios', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.maximizeWindow()
    await browser.url('')
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()

    // search page error message validation
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

    // could not find error page validation
    await searchPage.setsearch('!!!!"£')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const PageHeading1 = `We could not find '!!!!"£'`
    const getPageHeading1 = await errorPage.getCouldNotFindHeading.getText()
    await expect(PageHeading1).toMatch(getPageHeading1)
    await common.getBackLink.click()
    const getCurrentURLAfterBackLink = await browser.getUrl()
    const expectedURL =
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/search-location'
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
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/search-location'
    await expect(getCurrentURLAfterBackLink4).toMatch(expectedURL4)
    await searchPage.setsearch('thailand')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()

    // page content checks and styling checks
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
})
