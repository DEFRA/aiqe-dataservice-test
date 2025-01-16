import startNowPage from '../page-objects/startnowpage.js'
//import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
import fs from 'node:fs'
//import createLogger from 'helpers/logger'
import header from '../page-objects/header.js'
import styling from '../page-objects/styling.js'

const pages = [
   'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/',
   'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/search-location'
];
describe('header content checks/functionality checks/styling checks', () => {
 pages.forEach((page) => { 
  it('content checks', async () => {
    //await browser.deleteCookies(['airaqie_cookie'])
    await browser.url(page)
    await browser.maximizeWindow()
    // Handle the cookie banner
    //if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
      //await cookieBanner.rejectButtonCookiesDialog.click()
      //await cookieBanner.hideButtonHideDialog.click()
    

    //checking header is there 
    await header.getHeaderOverall.isDisplayed()
    //checking crown logo is present 
    await header.getGovUKCrownLogo.isDisplayed()

    //AirPolutionDataHeaderLink text validation 
    const AirPolutionDataHeaderLink = 'Get air pollution data'
    const getAirPolutionDataHeaderLink  =
      await header.getAirPolutionDataHeaderLink.getText()
    await expect(AirPolutionDataHeaderLink).toMatch(getAirPolutionDataHeaderLink)
    
    //checking feedback banner is present 
    await header.getBetaBanner.isDisplayed()
     
    //checking feedback link text is correct 
    const BetaBannerFeedbackLinkText = 'give your feedback (opens in new tab)'
    const getBetaBannerFeedbackLinkText  =
      await header.getBetaBannerFeedbackLink.getText()
    await expect(BetaBannerFeedbackLinkText).toMatch(getBetaBannerFeedbackLinkText)
    
    //checking feedback banner logo text 
    await header.getBetalogo.isDisplayed()
    const Betalogo = 'Beta'
    const getBetalogo  = 
      await header.getBetalogo.getText() 
    await expect(Betalogo).toMatch(getBetalogo)
     
    //checking beta banner whole text
    await header.getBetaBannerText.isDisplayed()
    const BetaBannerText = 'This is a new service. Help us improve it and give your feedback (opens in new tab).'
    const getBetaBannerText  =
      await header.getBetaBannerText.getText()
    await expect(BetaBannerText).toMatch(getBetaBannerText)
    
    
   //header links validation 
    await header.getGovUKCrownLink.click()
    const govURL = await browser.getUrl()
    const expectedgovURL = 'https://www.gov.uk/'
    await expect(govURL).toMatch(expectedgovURL)
    await browser.back()

    await header.getAirPolutionDataHeaderLink.click()
    const getAirPolutionDataHeaderLinkURL = await browser.getUrl()
    const expectedgetAirPolutionDataHeaderLinkURL = 'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/'
    await expect(getAirPolutionDataHeaderLinkURL).toMatch(expectedgetAirPolutionDataHeaderLinkURL)
    

    await header.getBetaBannerFeedbackLink.click()
    const BetaBannerFeedbackLink = await browser.getUrl()
    const expectedgetBetaBannerFeedbackLink = 'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/#'
    await expect(BetaBannerFeedbackLink).toMatch(expectedgetBetaBannerFeedbackLink)


   

  //header styling validation 
  //checking header padding   
    const headerOverall = [
      await header.getHeaderOverall]
    
    const headerOverallProperties = ['font-family','background','border-bottom','color','font-weight']

    for(const element of headerOverall) {
      const styles = await styling.getStyles(element, headerOverallProperties);
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['background']).toBe('rgb(11, 12, 12) none repeat scroll 0% 0% / auto padding-box border-box');
      expect(styles['border-bottom']).toBe('10px solid rgb(248, 248, 248)');
      expect(styles['color']).toBe('rgb(255, 255, 255)');
      expect(styles['font-weight']).toBe('400');
    }
  //checking CrownLogo styling  
    const CrownLogo = [
      await header.getGovUKCrownLogo]
    
    const GovUKCrownLogoProperties = ['float','padding-right','vertical-align','width','margin-bottom','font-family','font-weight']

    for(const element of CrownLogo) {
      const styles = await styling.getStyles(element, GovUKCrownLogoProperties);
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['float']).toBe('left');
      expect(styles['padding-right']).toBe('15px');
      expect(styles['vertical-align']).toBe('top');
      expect(styles['width']).toBe('319.958px');
      expect(styles['margin-bottom']).toBe('10px');
      expect(styles['font-weight']).toBe('400');
    }
  //checking beta banner feedback link styling  
  const getBetaBannerFeedbackLink = [
    await header.getBetaBannerFeedbackLink]
  const getBetaBannerFeedbackLinkProperties = ['font-family','text-decoration','font-size','line-height','font-weight']

  for(const element of getBetaBannerFeedbackLink) {
    const styles = await styling.getStyles(element, getBetaBannerFeedbackLinkProperties);
    expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
    expect(styles['text-decoration']).toBe('none solid rgb(11, 12, 12)');
    expect(styles['font-size']).toBe('16px');
    expect(styles['line-height']).toBe('20px');
    expect(styles['font-weight']).toBe('400');
  }
  //checking beta logo styling 
  const getBetaLogo = [
    await header.getBetalogo]
  const getBetalogoProperties = ['font-size','line-height','margin-right','font-family','background-color','color','display','font-weight','margin-bottom','margin-top','max-width','padding']

  for(const element of getBetaLogo) {
    const styles = await styling.getStyles(element, getBetalogoProperties);
    expect(styles['font-size']).toBe('16px');
    expect(styles['line-height']).toBe('20px');
    expect(styles['margin-right']).toBe('10px');
    expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
    expect(styles['background-color']).toBe('rgb(187, 212, 234)');
    expect(styles['display']).toBe('inline-block');
    expect(styles['font-weight']).toBe('400');
    expect(styles['margin-bottom']).toBe('-3px');
    expect(styles['margin-top']).toBe('-2px');
    expect(styles['max-width']).toBe('160px');
    expect(styles['padding']).toBe('2px 8px 3px');
    
  }
  //checking beta logo styling 
  const BetaBannerTextstyling = [
    await header.getBetalogo]
  const getBetaBannerTextProperties = ['display','vertical-align','font-size','line-height','font-family','color','font-weight']

  for(const element of BetaBannerTextstyling) {
    const styles = await styling.getStyles(element, getBetaBannerTextProperties);
    expect(styles['display']).toBe('inline-block');
    expect(styles['vertical-align']).toBe('baseline');
    expect(styles['font-size']).toBe('16px');
    expect(styles['line-height']).toBe('20px');
    expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
    expect(styles['color']).toBe('rgb(12, 45, 74)');
    expect(styles['font-weight']).toBe('400');
    
  }
  
  
  
  
})})})
