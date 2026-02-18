import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import cookiesBanner from '../../page-objects/cookiesBanner.js'
describe('Cookies Tests', () => {
  it('cookiebanner, AQD-651, displayed and styling', async () => {
    await browser.deleteCookies(['airaqie_cookies_analytics'])
    await browser.url('')
    await browser.maximizeWindow()
    const isCookieBannerDisplayed =
      await cookiesBanner.getCookieBanner.isDisplayed()
    await expect(isCookieBannerDisplayed).toBe(true)

    const getCookieBanner = [await cookiesBanner.getCookieBanner]

    const getCookieBannerProperties = [
      'background-color',
      'border-bottom',
      'padding-top'
    ]

    for (const element of getCookieBanner) {
      const styles = await common.getStyles(element, getCookieBannerProperties)
      expect(styles['background-color']).toBe('rgb(244, 248, 251)')
      expect(styles['border-bottom']).toBe('10px solid rgba(0, 0, 0, 0)')
      expect(styles['padding-top']).toBe('20px')
    }

    const getCookieBannerHeading = [await cookiesBanner.getCookieBannerHeading]

    const getCookieBannerHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getCookieBannerHeading) {
      const styles = await common.getStyles(
        element,
        getCookieBannerHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getCookieBannerContentStyling = [
      await cookiesBanner.getCookieBannerContentStyling
    ]

    const getCookieBannerContentStylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getCookieBannerContentStyling) {
      const styles = await common.getStyles(
        element,
        getCookieBannerContentStylingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getViewCookiesLink = [await cookiesBanner.getViewCookiesLink]

    const getViewCookiesLinkProperties = [
      'text-align',
      'margin-right',
      'font-size',
      'line-height',
      'font-family',
      'font-weight',
      'margin-bottom',
      'margin-top',
      'color',
      'text-decoration'
    ]

    for (const element of getViewCookiesLink) {
      const styles = await common.getStyles(
        element,
        getViewCookiesLinkProperties
      )
      expect(styles['text-align']).toBe('left')
      expect(styles['margin-right']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['margin-top']).toBe('5px')
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
    }

    const getAcceptCookiesButton = [await cookiesBanner.getAcceptCookiesButton]

    const getAcceptCookiesButtonProperties = [
      'background',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'box-sizing',
      'color',
      'font-weight',
      'margin',
      'padding',
      'text-align'
    ]

    for (const element of getAcceptCookiesButton) {
      const styles = await common.getStyles(
        element,
        getAcceptCookiesButtonProperties
      )
      expect(styles.background).toBe(
        'rgb(0, 112, 60) none repeat scroll 0% 0% / auto padding-box border-box'
      )
      expect(styles.display).toBe('block')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles['box-sizing']).toBe('border-box')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 15px 17px 0px')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles['text-align']).toBe('center')
    }
  })

  // different tests with buttons and links
  it('cookiebanner, AQD-651, view cookies link', async () => {
    await cookiesBanner.getViewCookiesLink.click()
    const getCookiesPageURL = await browser.getUrl()
    const expectedCookiesPageURL = '/cookies/'
    await expect(getCookiesPageURL).toMatch(expectedCookiesPageURL)
    browser.back()
    browser.refresh()
  })

  it('cookiebanner, AQD-651, accept cookies scenario', async () => {
    await cookiesBanner.getAcceptCookiesButton.click()
    const getAcceptText = await cookiesBanner.getCookieAcceptedContent.getText()
    const expectedAcceptText = `You’ve accepted analytics cookies. You can change your cookie settings at any time.`
    await expect(getAcceptText).toMatch(expectedAcceptText)
    await cookiesBanner.getChangeCookieSettings.click()
    const getCookiesPageURL = await browser.getUrl()
    const expectedCookiesPageURL = '/cookies'
    await expect(getCookiesPageURL).toMatch(expectedCookiesPageURL)
    browser.back()
    const isHideCookiesButtonDisplayed =
      await cookiesBanner.getHideCookiesButton.isDisplayed()
    await expect(isHideCookiesButtonDisplayed).toBe(true)

    const getHideCookiesButton = [await cookiesBanner.getHideCookiesButton]

    const getHideCookiesButtonProperties = [
      'background',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'box-sizing',
      'color',
      'font-weight',
      'margin',
      'padding',
      'text-align'
    ]

    for (const element of getHideCookiesButton) {
      const styles = await common.getStyles(
        element,
        getHideCookiesButtonProperties
      )
      expect(styles.background).toBe(
        'rgb(0, 112, 60) none repeat scroll 0% 0% / auto padding-box border-box'
      )
      expect(styles.display).toBe('block')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles['box-sizing']).toBe('border-box')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 15px 17px 0px')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles['text-align']).toBe('center')
    }
    await cookiesBanner.getHideCookiesButton.click()
    await common.notDisplayed(await cookiesBanner.getCookieBanner)
  })

  it('cookiebanner, AQD-651, reject cookies scenario', async () => {
    await browser.deleteCookies(['airaqie_cookies_analytics'])
    await browser.refresh()
    await cookiesBanner.getRejectCookiesButton.click()
    const getRejectedText =
      await cookiesBanner.getCookieRejectedContent.getText()
    const expectedRejectedText = `You’ve rejected analytics cookies. You can change your cookie settings at any time.`
    await expect(getRejectedText).toMatch(expectedRejectedText)
    await cookiesBanner.getChangeCookieSettingsAfterReject.click()
    const getCookiesPageURL = await browser.getUrl()
    const expectedCookiesPageURL = '/cookies'
    await expect(getCookiesPageURL).toMatch(expectedCookiesPageURL)
    browser.back()
    const isHideCookiesButtonAfterRejectDisplayed =
      await cookiesBanner.getHideCookiesButtonAfterReject.isDisplayed()
    await expect(isHideCookiesButtonAfterRejectDisplayed).toBe(true)

    const getHideCookiesButton = [
      await cookiesBanner.getHideCookiesButtonAfterReject
    ]

    const getHideCookiesButtonProperties = [
      'background',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'box-sizing',
      'color',
      'font-weight',
      'margin',
      'padding',
      'text-align'
    ]

    for (const element of getHideCookiesButton) {
      const styles = await common.getStyles(
        element,
        getHideCookiesButtonProperties
      )
      expect(styles.background).toBe(
        'rgb(0, 112, 60) none repeat scroll 0% 0% / auto padding-box border-box'
      )
      expect(styles.display).toBe('block')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles['box-sizing']).toBe('border-box')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 15px 17px 0px')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles['text-align']).toBe('center')
    }
    await cookiesBanner.getHideCookiesButtonAfterReject.click()
    await cookiesBanner.getHideCookiesButtonAfterReject.waitForDisplayed({
      reverse: true
    })
  })
})
