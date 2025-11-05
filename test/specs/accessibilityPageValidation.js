// import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
// import searchPage from '../page-objects/searchPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
import accessibilityPage from '../page-objects/accessibilityPage.js'

describe('accessibility page tests', () => {
  it('title and content checks', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await footer.getAccessibilityStatementFooterLink.click()
    // page content validation
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()

    const accessibilityStatementPageHeading = `Accessibility statement`
    const getAccessibilityPageHeading =
      await accessibilityPage.getAccessibilityPageHeading.getText()
    await expect(getAccessibilityPageHeading).toMatch(
      accessibilityStatementPageHeading
    )

    const accessibilityStatementPageContent = `Accessibility statement
The Department for Environment, Food and Rural Affairs is committed to making its websites accessible in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.
This accessibility statement applies to the Get air pollution data website.
Compliance status
This website complies with the Web Content Accessibility Guidelines (WCAG) version 2.2 AA standard.
Preparation of this accessibility statement
This statement was prepared on 8 January 2025. It was last reviewed on 19 August 2025.
This website was last tested on 5 June 2025. The test was carried out by the Digital Accessibility Centre.
Feedback and contact information
If you notice any compliance failures or need to request information and content that is not provided in this document, email accessibility@defra.gov.uk.
Enforcement procedure
The Equality and Human Rights Commission is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.
If you are not happy with how Defra responds to your complaint, contact the Equality Advisory and Support Service (EASS).`
    const getAccessibilityPageContent =
      await accessibilityPage.getAccessibilityPageContent.getText()
    await expect(accessibilityStatementPageContent).toMatch(
      getAccessibilityPageContent
    )
  })

  it('Styling Checks', async () => {
    const AccessibilityPageHeading = [
      await accessibilityPage.getAccessibilityPageHeading
    ]

    const getAccessibilityPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of AccessibilityPageHeading) {
      const styles = await common.getStyles(
        element,
        getAccessibilityPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('50px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const AccessibilityPageContent = [
      await accessibilityPage.getAccessibilityPageContent
    ]

    const getAccessibilityPageContentProperties = [
      'padding-bottom',
      'padding-top'
    ]

    for (const element of AccessibilityPageContent) {
      const styles = await common.getStyles(
        element,
        getAccessibilityPageContentProperties
      )
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const getAirPollutionDataLink = [
      await accessibilityPage.getGetAirPollutionDataLink
    ]

    const getGetAirPollutionDataLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'cursor',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getAirPollutionDataLink) {
      const styles = await common.getStyles(
        element,
        getGetAirPollutionDataLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline 1px')
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles.cursor).toBe('pointer')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getEqualityAdvisoryLink = [
      await accessibilityPage.getEqualityAdvisoryLink
    ]

    const getEqualityAdvisoryLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'cursor',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getEqualityAdvisoryLink) {
      const styles = await common.getStyles(
        element,
        getEqualityAdvisoryLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline 1px')
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles.cursor).toBe('pointer')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getParagraph = [await accessibilityPage.getParagraph]

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

    const getSubTitle = [await accessibilityPage.getSubTitle]

    const getSubTitleProperties = [
      'padding-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getSubTitle) {
      const styles = await common.getStyles(element, getSubTitleProperties)
      expect(styles['padding-top']).toBe('10px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }
  })

  it('links validation', async () => {
    await accessibilityPage.getGetAirPollutionDataLink.click()
    const getAirPolutionDataLinkURL = await browser.getUrl()
    const expectedgetAirPolutionDataLinkURL =
      'https://aqie-dataselector-frontend'
    await expect(getAirPolutionDataLinkURL).toMatch(
      expectedgetAirPolutionDataLinkURL
    )
    await browser.back()
    await browser.refresh()

    await accessibilityPage.getEqualityAdvisoryLink.click()
    const getEqualityAdvisoryPageLink = await browser.getUrl()
    const expectedGetEqualityAdvisoryPageLink =
      'https://www.equalityadvisoryservice.com/'
    await expect(getEqualityAdvisoryPageLink).toMatch(
      expectedGetEqualityAdvisoryPageLink
    )
    await browser.back()
    await browser.refresh()

    // checking mailto links
    const mailtoLinks = await $$('a[href^="mailto:"]')
    const currentURL = await browser.getUrl()
    expect(mailtoLinks.length).toBe(1)
    for (const link of mailtoLinks) {
      const hrefValue = await link.getAttribute('href')
      expect(hrefValue).toMatch(/^mailto:/)
      await link.click()
      expect(await browser.getUrl()).toBe(currentURL)
    }

    await browser.refresh()
  })
})
