import startNowPage from '../page-objects/startnowpage.js'
//import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
import fs from 'node:fs'
//import createLogger from 'helpers/logger'
import styling from '../page-objects/styling.js'
import searchPage from '../page-objects/searchPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
describe('start now page content/functionality checks/styling checks', () => {
  it('content checks', async () => {
    //await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    //if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
      //await cookieBanner.rejectButtonCookiesDialog.click()
      //await cookieBanner.hideButtonHideDialog.click()
    
    // page content validation
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()

    const startnowPageContent =`Get air pollution data
Use this service to:
find air quality monitoring stations
download air pollution data
This service uses data from the Automatic Urban and Rural network (AURN).
This service shows you data for:
PM2.5
PM10
nitrogen dioxide
ozone
sulphur dioxide
Start now
You can check air quality to look up:
air quality in a local area, including the air pollution forecast for the next 5 days
health advice to reduce your exposure to pollutants`
    const getStartNowPagecontent =
      await startNowPage.getStartNowPagecontent.getText()
    await expect(startnowPageContent).toMatch(getStartNowPagecontent)
    
    //links validation 
    await startNowPage.startNowBtnClick()
    const searchPageURL = await browser.getUrl()
    const expectedSearchPageURL = 'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/search-location'
    await expect(searchPageURL).toMatch(expectedSearchPageURL)
    await searchPage.BackBtnClick()
    const startNowPageURL = await browser.getUrl()
    const expectedStartNowPageURL = 'https://aiqe-dataservice-frontend.dev.cdp-int.defra.cloud/'
    await expect(startNowPageURL).toMatch(expectedStartNowPageURL)
    await browser.refresh()
    await startNowPage.citizenServiceLinkClick()
    const citizenServicePageURL = await browser.getUrl()
    const expectedCitizenServicePageURL = 'https://check-local-air-quality.defra.gov.uk/'
    await expect(citizenServicePageURL).toMatch(expectedCitizenServicePageURL)
    await browser.back();
    await browser.refresh()

    //styling validation
    //checking  heading styles 
  
    const startNowPageHeading = [
      await startNowPage.getStartNowPageHeading]
    
    const startNowPageHeadingProperties = ['margin-bottom','font-size','line-height','color','font-family','font-weight']

    for(const element of startNowPageHeading) {
      const styles = await styling.getStyles(element, startNowPageHeadingProperties);
      expect(styles['margin-bottom']).toBe('50px');
      expect(styles['font-size']).toBe('48px');
      expect(styles['line-height']).toBe('50px');
      expect(styles['color']).toBe('rgb(11, 12, 12)');
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['font-weight']).toBe('700');
    }

    const startNowPageBodyText = [
      await startNowPage.getstartNowPageBodyText]
    
    const startNowPageBodyTextProperties = ['margin-bottom','font-size','line-height','color','font-family','font-weight']

    for(const element of startNowPageBodyText) {
      const styles = await styling.getStyles(element, startNowPageBodyTextProperties);
      expect(styles['margin-bottom']).toBe('20px');
      expect(styles['font-size']).toBe('19px');
      expect(styles['line-height']).toBe('25px');
      expect(styles['color']).toBe('rgb(11, 12, 12)');
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['font-weight']).toBe('400');
    }

    const startNowPageList = [
      await startNowPage.getstartNowPageList]
    
    const startNowPageListProperties = ['padding-left','margin-bottom','font-size','line-height','font-family','color','font-weight']

    for(const element of startNowPageList) {
      const styles = await styling.getStyles(element, startNowPageListProperties);
      expect(styles['padding-left']).toBe('20px');
      expect(styles['margin-bottom']).toBe('20px');
      expect(styles['font-size']).toBe('19px');
      expect(styles['line-height']).toBe('25px');
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['color']).toBe('rgb(11, 12, 12)');
      expect(styles['font-weight']).toBe('400');
    }

    const startNowPageListItem = [
      await startNowPage.getstartNowPageListItem]
    
    const startNowPageListItemProperties = ['margin-bottom','font-size','line-height','font-family','color','font-weight']

    for(const element of startNowPageListItem) {
      const styles = await styling.getStyles(element, startNowPageListItemProperties);
      expect(styles['margin-bottom']).toBe('5px');
      expect(styles['font-size']).toBe('19px');
      expect(styles['line-height']).toBe('25px');
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif');
      expect(styles['color']).toBe('rgb(11, 12, 12)');
      expect(styles['font-weight']).toBe('400');
    }
 
    
  
})})
