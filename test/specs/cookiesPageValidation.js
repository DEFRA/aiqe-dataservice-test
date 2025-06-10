// import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
// import searchPage from '../page-objects/searchPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
import cookiesPage from '../page-objects/cookiesPage.js'
import passwordPage from '../page-objects/passwordPage.js'

describe('cookie page tests', () => {
  it('title and content checks', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await passwordPage.inputPassword('airqualitydataset')
    await common.continueButton.click()
    await footer.getCookiesFooterLink.click()
    // page content validation
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()

    const cookiesPageHeading = `Cookies`
    const getCookiesPageHeading =
      await cookiesPage.getCookiesPageHeading.getText()
    await expect(getCookiesPageHeading).toMatch(cookiesPageHeading)

    const cookiesPageContent = `Cookies
Get air pollution data puts small files (known as ‘cookies’) on your computer.
These cookies are used across the 'get air pollution data' service.
We only set cookies when Javascript is running in your browser and you have accepted them. If you choose not to run Javascript, the information on this page will not apply to you.
Find out how to manage cookies from the Information Commissioner‘s Office.
Essential cookies (strictly necessary)
We use an essential cookie to remember when you accept or reject cookies on our website.
Essential cookies we use
Name Purpose Expires
airaqie_cookies_analytics Saves your cookie consent settings 1 year
_ga Helps us count how many people visit 'get air pollution data' by telling us if you’ve visited before 2 years
_gat_UA-[G-8CMZBTDQBC] Used to reduce the number of requests 1 minute
session Application related data is managed in this cookie. It's required for the application to work 30 minutes
The cookies _ga_ and _gat_UA-[G-8CMZBTDQBC] will only be active if you accept cookies. If you do not accept cookies, they may still appear in your cookie session, but they will not be active.
Analytics cookies (optional)
We use Google Analytics software to understand how people use the 'get air pollution data' service. We do this to:
help make sure the site is meeting the needs of its users
help us make improvements
We do not collect or store your personal information (for example your name or address) so this information cannot be used to identify who you are.
We do not allow Google to use or share our analytics data.
Google Analytics stores information about:
the pages you visit
how long you spend on each page
how you arrived at the site
what you click on while you visit the site
the device and browser you use
Do you want to accept analytics cookies?
Yes
No
Save cookie settings`
    const getCookiesPageContent =
      await cookiesPage.getCookiesPageContent.getText()
    await expect(cookiesPageContent).toMatch(getCookiesPageContent)
  })

  it('Styling Checks', async () => {
    const CookiesPageHeading = [await cookiesPage.getCookiesPageHeading]

    const cookiesPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of CookiesPageHeading) {
      const styles = await common.getStyles(
        element,
        cookiesPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('50px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const CookiesPageContent = [await cookiesPage.getCookiesPageContent]

    const cookiesPageContentProperties = ['padding-bottom', 'padding-top']

    for (const element of CookiesPageContent) {
      const styles = await common.getStyles(
        element,
        cookiesPageContentProperties
      )
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const GetAirPollutionDataLink = [
      await cookiesPage.getGetAirPollutionDataLink
    ]

    const GetAirPollutionDataLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of GetAirPollutionDataLink) {
      const styles = await common.getStyles(
        element,
        GetAirPollutionDataLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const GetHowToManageCookiesLink = [
      await cookiesPage.getHowToManageCookiesLink
    ]

    const GetHowToManageCookiesLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of GetHowToManageCookiesLink) {
      const styles = await common.getStyles(
        element,
        GetHowToManageCookiesLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getYesCookieOptionStyling = [await cookiesPage.getYesCookieOption]

    const getYesCookieOptionProperties = [
      'cursor',
      'height',
      'margin',
      'opacity',
      'width',
      'z-index',
      'box-sizing'
    ]

    for (const element of getYesCookieOptionStyling) {
      const styles = await common.getStyles(
        element,
        getYesCookieOptionProperties
      )
      expect(styles.cursor).toBe('pointer')
      expect(styles.height).toBe('44px')
      expect(styles.margin).toBe('0px')
      expect(styles.opacity).toBe('0')
      expect(styles.width).toBe('44px')
      expect(styles['z-index']).toBe('1')
      expect(styles['box-sizing']).toBe('border-box')
    }

    const getNoCookieOptionStyling = [await cookiesPage.getNoCookieOption]

    const getNoCookieOptionProperties = [
      'cursor',
      'height',
      'margin',
      'opacity',
      'width',
      'z-index',
      'box-sizing'
    ]

    for (const element of getNoCookieOptionStyling) {
      const styles = await common.getStyles(
        element,
        getNoCookieOptionProperties
      )
      expect(styles.cursor).toBe('pointer')
      expect(styles.height).toBe('44px')
      expect(styles.margin).toBe('0px')
      expect(styles.opacity).toBe('0')
      expect(styles.width).toBe('44px')
      expect(styles['z-index']).toBe('1')
      expect(styles['box-sizing']).toBe('border-box')
    }

    const getSaveCookieSettingButton = [
      await cookiesPage.getSaveCookieSettingButton
    ]

    const getSaveCookieSettingButtonProperties = [
      'margin-bottom',
      'width',
      'font-size',
      'line-height',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'box-sizing',
      'color',
      'cursor',
      'display',
      'font-weight',
      'margin',
      'padding',
      'position',
      'text-align',
      'vertical-align'
    ]

    for (const element of getSaveCookieSettingButton) {
      const styles = await common.getStyles(
        element,
        getSaveCookieSettingButtonProperties
      )
      expect(styles['margin-bottom']).toBe('32px')
      expect(styles.width).toBe('198.266px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles['box-sizing']).toBe('border-box')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles.cursor).toBe('pointer')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 32px')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles.position).toBe('relative')
      expect(styles['text-align']).toBe('center')
      expect(styles['vertical-align']).toBe('top')
    }

    const getParagraph = [await cookiesPage.getParagraph]

    const getParagraphProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getParagraph) {
      const styles = await common.getStyles(element, getParagraphProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getSubTitle = [await cookiesPage.getSubTitle]

    const getSubTitleProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getSubTitle) {
      const styles = await common.getStyles(element, getSubTitleProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getTableCaption = [await cookiesPage.getTableCaption]

    const getTableCaptionProperties = [
      'display',
      'font-weight',
      'text-align',
      'font-size',
      'line-height',
      'font-family',
      'color'
    ]

    for (const element of getTableCaption) {
      const styles = await common.getStyles(element, getTableCaptionProperties)
      expect(styles.display).toBe('table-caption')
      expect(styles['font-weight']).toBe('700')
      expect(styles['text-align']).toBe('left')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getTableHeading = [await cookiesPage.getTableHeading]

    const getTableHeadingProperties = [
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-collapse',
      'border-spacing',
      'color'
    ]

    for (const element of getTableHeading) {
      const styles = await common.getStyles(element, getTableHeadingProperties)
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-collapse']).toBe('collapse')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getTableContent = [await cookiesPage.getTableContent]

    const getTableContentProperties = [
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-size',
      'line-height',
      'font-family',
      'border-collapse',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getTableContent) {
      const styles = await common.getStyles(element, getTableContentProperties)
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-collapse']).toBe('collapse')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getList = [await cookiesPage.getlist]

    const getListProperties = [
      'margin-bottom',
      'list-style-type',
      'padding-left',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getList) {
      const styles = await common.getStyles(element, getListProperties)
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['list-style-type']).toBe('disc')
      expect(styles['padding-left']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getListItem = [await cookiesPage.getListItem]

    const getListItemProperties = [
      'margin-bottom',
      'display',
      'text-align',
      'list-style-type',
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
      expect(styles['text-align']).toBe('left')
      expect(styles['list-style-type']).toBe('disc')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getAcceptCookiesQuestion = [
      await cookiesPage.getAcceptCookiesQuestion
    ]

    const getAcceptCookiesQuestionProperties = [
      'font-size',
      'line-height',
      'font-weight',
      'margin-bottom',
      'font-family',
      'box-sizing',
      'color'
    ]

    for (const element of getAcceptCookiesQuestion) {
      const styles = await common.getStyles(
        element,
        getAcceptCookiesQuestionProperties
      )
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['box-sizing']).toBe('border-box')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getYesLabel = [await cookiesPage.getYesLabel]

    const getYesLabelProperties = [
      'align-self',
      'cursor',
      'margin-bottom',
      'padding',
      'touch-action',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'display',
      'font-weight'
    ]

    for (const element of getYesLabel) {
      const styles = await common.getStyles(element, getYesLabelProperties)
      expect(styles['align-self']).toBe('center')
      expect(styles.cursor).toBe('pointer')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['touch-action']).toBe('manipulation')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles.display).toBe('block')
      expect(styles['font-weight']).toBe('400')
    }

    const getNoLabel = [await cookiesPage.getNoLabel]

    const getNoLabelProperties = [
      'align-self',
      'cursor',
      'margin-bottom',
      'padding',
      'touch-action',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'display',
      'font-weight'
    ]

    for (const element of getNoLabel) {
      const styles = await common.getStyles(element, getNoLabelProperties)
      expect(styles['align-self']).toBe('center')
      expect(styles.cursor).toBe('pointer')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['touch-action']).toBe('manipulation')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles.display).toBe('block')
      expect(styles['font-weight']).toBe('400')
    }

    const getRadioItem = [await cookiesPage.getRadioItem]

    const getRadioItemProperties = [
      'display',
      'flex-wrap',
      'margin-bottom',
      'position'
    ]

    for (const element of getRadioItem) {
      const styles = await common.getStyles(element, getRadioItemProperties)
      expect(styles.display).toBe('flex')
      expect(styles['flex-wrap']).toBe('wrap')
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles.position).toBe('relative')
    }
  })

  it('links validation', async () => {
    await cookiesPage.getGetAirPollutionDataLink.click()
    const getAirPolutionDataLinkURL = await browser.getUrl()
    const expectedgetAirPolutionDataLinkURL =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/'
    await expect(getAirPolutionDataLinkURL).toMatch(
      expectedgetAirPolutionDataLinkURL
    )
    await browser.back()
    await browser.refresh()

    await cookiesPage.getHowToManageCookiesLink.click()
    const getHowToManageCookiesLink = await browser.getUrl()
    const expectedHowToManageCookiesLink =
      'https://ico.org.uk/for-the-public/online/cookies'
    await expect(getHowToManageCookiesLink).toMatch(
      expectedHowToManageCookiesLink
    )
    await browser.back()
    await browser.refresh()

    await cookiesPage.getYesCookieOption.click()
    await cookiesPage.getSaveCookieSettingButton.click()
    await cookiesPage.getNoCookieOption.click()
    await browser.refresh()
    await cookiesPage.getSaveCookieSettingButton.click()
  })
})
