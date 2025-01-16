import startNowPage from '../page-objects/startnowpage.js'
import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
import fs from 'node:fs'
import createLogger from 'helpers/logger'
import footer from '~/test/page-objects/footer.js'
import styling from '~/test/page-objects/styling.js'

const pages = [
   'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/',
   'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/search-location'
];
describe('footer content and functionality checks', () => {
 pages.forEach((page) => {  
  it('content checks', async () => {
    //await browser.deleteCookies(['airaqie_cookie'])
    await browser.url(page)
    await browser.maximizeWindow()
    // Handle the cookie banner
    //if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
      //await cookieBanner.rejectButtonCookiesDialog.click()
      //await cookieBanner.hideButtonHideDialog.click()
    

    // footer text validation
    await footer.getFooterOverall.isDisplayed()
    //checking privacy link text
    const privacyLink = 'Privacy'
    const getPrivacyFooterLink =
      await footer.getPrivacyFooterLink.getText()
    await expect(privacyLink).toMatch(getPrivacyFooterLink)
     //checking cookies link text
    const cookiesLink = 'Cookies'
    const getCookiesFooterLink =
      await footer.getCookiesFooterLink.getText()
    await expect(cookiesLink).toMatch(getCookiesFooterLink)
    //checking accessibility statement link text
    const accessibilityStatementFooterLink = 'Accessibility statement'
    const getAccessibiltyStatementFooterLink =
      await footer.getAccessibilityStatementFooterLink.getText()
    await expect(accessibilityStatementFooterLink).toMatch(getAccessibiltyStatementFooterLink)
   //checking OGL link text
    const OglFooterLink = 'Open Government Licence v3.0'
    const getOglFooterLink =
      await footer.getOglFooterLink.getText()
    await expect(OglFooterLink).toMatch(getOglFooterLink)
   //checking OGL logo 
    await footer.getOGLLogo.isDisplayed()
   //checking OGL statement
    const OGLStatement = 'All content is available under the Open Government Licence v3.0, except where otherwise stated'
    const getOGLStatement =
      await footer.getOGLStatement.getText()
    await expect(OGLStatement).toMatch(getOGLStatement)
   //checking crown logo is present 
    await footer.getCrownCoprightLogo.isDisplayed()
    
    
   //footer links validation 
    await footer.getPrivacyFooterLink.click()
    const privacyURL = await browser.getUrl()
    const expectedPrivacyURL = 'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/privacy'
    await expect(privacyURL).toMatch(expectedPrivacyURL)
    await browser.back()

    await footer.getCookiesFooterLink.click()
    const cookiesURL = await browser.getUrl()
    const expectedCookiesURL = 'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/cookies'
    await expect(cookiesURL).toMatch(expectedCookiesURL)
    await browser.back()

    await footer.getAccessibilityStatementFooterLink.click()
    const AccessibilityStatementURL = await browser.getUrl()
    const expectedAccessibilityStatementURL = 'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/accessibility'
    await expect(AccessibilityStatementURL).toMatch(expectedAccessibilityStatementURL)
    await browser.back()

    await footer.getOglFooterLink.click()
    const OGLURL = await browser.getUrl()
    const expectedOGLURL = 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'
    await expect(OGLURL).toMatch(expectedOGLURL)
    await browser.back()

    await footer.getCrownCoprightLogo.click()
    const crownCopyrightLogoURL = await browser.getUrl()
    const expectedCrownCopyrightLogoURL = 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
    await expect(crownCopyrightLogoURL).toMatch(expectedCrownCopyrightLogoURL)
    await browser.back()

  //footer styling validation 
  //checking footer padding   
    const footerOverall = [
      await footer.getFooterOverall]
    
    const footerOverallProperties = ['padding-bottom','padding-top']

    for(const element of footerOverall) {
      const styles = await styling.getStyles(element, footerOverallProperties);
      expect(styles['padding-bottom']).toBe('25px');
      expect(styles['padding-top']).toBe('40px');
    }
  //checking links styling  
    const footerLinks = [
      await footer.getPrivacyFooterLink,
      await footer.getCookiesFooterLink,
      await footer.getAccessibilityStatementFooterLink,
      await footer.getOglFooterLink,
    ]
    
    const footerLinkProperties = ['color','font-family','text-decoration','font-size','line-height','font-weight']

    for(const element of footerLinks) {
      const styles = await styling.getStyles(element, footerLinkProperties);
      expect(styles['color']).toBe('rgb(11, 12, 12)');
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['font-size']).toBe('16px');
      expect(styles['font-weight']).toBe('400');
      expect(styles['line-height']).toBe('20px');
      expect(styles['text-decoration']).toBe('underline 1px solid rgb(11, 12, 12)');
    }
  //checking OGL logo styling
    const oglLogo = [
      await footer.getOGLLogo,  
    ]
    
    const oglLogoProperties = ['height','margin-right','width']

    for(const element of oglLogo) {
      const styles = await styling.getStyles(element, oglLogoProperties);
      expect(styles['height']).toBe('17px');
      expect(styles['margin-right']).toBe('10px');
      expect(styles['width']).toBe('41px');
    }
  //crown logo styling 
    const crownLogo = [
      await footer.getCrownCoprightLogo,  
    ]
    
    const crownLogoProperties = ['background-image','background-size','min-width','padding-top']

    for(const element of crownLogo) {
      const styles = await styling.getStyles(element, crownLogoProperties);
      expect(styles['background-image']).toBe('url("https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/public/assets/images/govuk-crest.svg")');
      expect(styles['background-size']).toBe('125px 102px');
      expect(styles['min-width']).toBe('125px');
      expect(styles['padding-top']).toBe('112px');
    }
  //OGLStatement
    const oglStatement = [
      await footer.getOGLStatement,  
    ]
    
    const oglStatementProperties = ['font-size','line-height','font-family','font-weight','color']

    for(const element of oglStatement) {
      const styles = await styling.getStyles(element, oglStatementProperties);
      expect(styles['color']).toBe('rgb(11, 12, 12)');
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['font-size']).toBe('16px');
      expect(styles['line-height']).toBe('20px');
    }
 
    
  
})})})
