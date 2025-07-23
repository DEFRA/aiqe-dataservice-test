// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import createLogger from 'helpers/logger'
import footer from '../page-objects/footer.js'
import common from '../page-objects/common.js'
import passwordPage from '../page-objects/passwordPage.js'

const pages = ['https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/']
describe('footer content and functionality checks', () => {
  pages.forEach((page) => {
    it('titles, links, content, styling', async () => {
      // await browser.deleteCookies(['airaqie_cookie'])
      await browser.url(page)
      await browser.maximizeWindow()
      await passwordPage.inputPassword('airqualitydataset')
      await common.continueButton.click()
      // Handle the cookie banner
      // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
      // await cookieBanner.rejectButtonCookiesDialog.click()
      // await cookieBanner.hideButtonHideDialog.click()

      // footer text validation
      await footer.getFooterOverall.isDisplayed()
      // checking privacy link text
      const privacyLinkText = 'Privacy'
      const getPrivacyFooterLinkText =
        await footer.getPrivacyFooterLink.getText()
      await expect(privacyLinkText).toMatch(getPrivacyFooterLinkText)
      // checking cookies link text
      const cookiesLinkText = 'Cookies'
      const getCookiesFooterLinkText =
        await footer.getCookiesFooterLink.getText()
      await expect(cookiesLinkText).toMatch(getCookiesFooterLinkText)
      // checking accessibility statement link text
      const accessibilityStatementFooterLinkText = 'Accessibility statement'
      const getAccessibiltyStatementFooterLinkText =
        await footer.getAccessibilityStatementFooterLink.getText()
      await expect(accessibilityStatementFooterLinkText).toMatch(
        getAccessibiltyStatementFooterLinkText
      )
      // checking OGL link text
      const OglFooterLinkText = 'Open Government Licence v3.0'
      const getOglFooterLinkText = await footer.getOglFooterLink.getText()
      await expect(OglFooterLinkText).toMatch(getOglFooterLinkText)
      // checking OGL logo
      await footer.getOGLLogo.isDisplayed()
      // checking OGL statement
      // const OGLStatementText = `All content is available under the Open Government Licence v3.0, except where otherwise stated`
      // const getOGLStatementText = await footer.getOGLStatement.getText()
      // await expect(OGLStatementText).toMatch(getOGLStatementText)
      // checking crown logo is present
      await footer.getCrownCoprightLogo.isDisplayed()

      // footer links validation

      await footer.getPrivacyFooterLink.click()
      const privacyURL = await browser.getUrl()
      const expectedPrivacyURL =
        'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/privacy'
      await expect(privacyURL).toMatch(expectedPrivacyURL)
      await browser.back()

      await browser.refresh()
      await footer.getCookiesFooterLink.click()
      const cookiesURL = await browser.getUrl()
      const expectedCookiesURL =
        'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/cookies'
      await expect(cookiesURL).toMatch(expectedCookiesURL)
      await browser.back()

      await browser.refresh()
      await footer.getAccessibilityStatementFooterLink.click()
      const AccessibilityStatementURL = await browser.getUrl()
      const expectedAccessibilityStatementURL =
        'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/accessibility'
      await expect(AccessibilityStatementURL).toMatch(
        expectedAccessibilityStatementURL
      )
      await browser.back()

      await browser.refresh()
      await footer.getOglFooterLink.click()
      const OGLURL = await browser.getUrl()
      const expectedOGLURL =
        'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'
      await expect(OGLURL).toMatch(expectedOGLURL)
      await browser.back()

      await browser.refresh()
      await footer.getCrownCoprightLogo.click()
      const crownCopyrightLogoURL = await browser.getUrl()
      const expectedCrownCopyrightLogoURL =
        'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
      await expect(crownCopyrightLogoURL).toMatch(expectedCrownCopyrightLogoURL)
      await browser.back()
      await browser.refresh()

      // footer styling validation
      // checking footer padding
      const footerOverall = [await footer.getFooterOverall]

      const footerOverallProperties = ['padding-bottom', 'padding-top']

      for (const element of footerOverall) {
        const styles = await common.getStyles(element, footerOverallProperties)
        expect(styles['padding-bottom']).toBe('25px')
        expect(styles['padding-top']).toBe('40px')
      }
      // checking links styling
      const footerLinks = [
        await footer.getPrivacyFooterLink,
        await footer.getCookiesFooterLink,
        await footer.getAccessibilityStatementFooterLink,
        await footer.getOglFooterLink
      ]

      const footerLinkProperties = [
        'color',
        'font-family',
        'text-decoration',
        'font-size',
        'line-height',
        'font-weight'
      ]

      for (const element of footerLinks) {
        const styles = await common.getStyles(element, footerLinkProperties)
        expect(styles.color).toBe('rgb(11, 12, 12)')
        expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
        expect(styles['font-size']).toBe('16px')
        expect(styles['font-weight']).toBe('400')
        expect(styles['line-height']).toBe('20px')
        expect(styles['text-decoration']).toBe(
          'underline 1px solid rgb(11, 12, 12)'
        )
      }
      // checking OGL logo styling
      const oglLogo = [await footer.getOGLLogo]

      const oglLogoProperties = ['height', 'margin-right', 'width']

      for (const element of oglLogo) {
        const styles = await common.getStyles(element, oglLogoProperties)
        expect(styles.height).toBe('17px')
        expect(styles['margin-right']).toBe('10px')
        expect(styles.width).toBe('41px')
      }
      // crown logo styling
      const crownLogo = [await footer.getCrownCoprightLogo]

      const crownLogoProperties = [
        'mask-image',
        'background-size',
        'min-width',
        'padding-top'
      ]

      for (const element of crownLogo) {
        const styles = await common.getStyles(element, crownLogoProperties)
        expect(styles['mask-image']).toBe(
          'url("https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/public/assets/images/govuk-crest.svg")'
        )
        expect(styles['background-size']).toBe('125px 102px')
        expect(styles['min-width']).toBe('125px')
        expect(styles['padding-top']).toBe('112px')
      }
      // OGLStatement
      const oglStatement = [await footer.getOGLStatement]

      const oglStatementProperties = [
        'font-size',
        'line-height',
        'font-family',
        'font-weight',
        'color'
      ]

      for (const element of oglStatement) {
        const styles = await common.getStyles(element, oglStatementProperties)
        expect(styles.color).toBe('rgb(11, 12, 12)')
        expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
        expect(styles['font-size']).toBe('16px')
        expect(styles['line-height']).toBe('20px')
      }
    })
  })
})
