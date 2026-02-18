import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import headersObject from '../../page-objects/header.js'
import footer from '../../page-objects/footer.js'
import hubPage from '../../page-objects/hubPage.js'
describe('hub page checks', () => {
  it('content and titles', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    // page content validation
    const isHeaderOverallDisplayed =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayed = await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayed).toBe(true)
    await expect(isFooterOverallDisplayed).toBe(true)
    const hubPageContent = `Get air pollution data
Find monitoring stations by location
View and download data by town or postcode
Create a custom dataset
View and download data by pollutant,year and location.`
    const gethubPagecontent = await hubPage.getHubPagecontent.getText()
    await expect(hubPageContent).toMatch(gethubPagecontent)
  })

  it('styling checks', async () => {
    const hubPageHeading = [await hubPage.getHubPageHeading]

    const hubPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of hubPageHeading) {
      const styles = await common.getStyles(element, hubPageHeadingProperties)
      expect(styles['margin-bottom']).toBe('50px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const pageContent = [await hubPage.getHubPagecontent]

    const pageContentProperties = ['padding-bottom', 'padding-top']

    for (const element of pageContent) {
      const styles = await common.getStyles(element, pageContentProperties)
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const links = [
      await hubPage.getFindMonitoringStationsByLocation,
      await hubPage.getCreateCustomDataSet
    ]

    const linksProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of links) {
      const styles = await common.getStyles(element, linksProperties)
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline 1px')
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('700')
    }

    const listItem = [await hubPage.getlistItem]

    const listItemProperties = ['padding']

    for (const element of listItem) {
      const styles = await common.getStyles(element, listItemProperties)
      expect(styles.padding).toBe('5px 0px 20px')
    }

    const getParagraphItem = [await hubPage.getParagraphItem]

    const getParagraphItemProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight',
      'margin'
    ]

    for (const element of getParagraphItem) {
      const styles = await common.getStyles(element, getParagraphItemProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 30px 20px 0px')
    }
  })

  it('AQD-988 hub journey links should be h2', async () => {
    const searchByLocationLink =
      await hubPage.getFindMonitoringStationsByLocationStyling
    const createCustomDataSetLink = await hubPage.getCreateCustomDataSetStyling

    const tag1 = await searchByLocationLink.getTagName()
    const tag2 = await createCustomDataSetLink.getTagName()
    await expect(tag1).toBe('h2')
    await expect(tag2).toBe('h2')
  })

  it('link checks', async () => {
    await hubPage.getFindMonitoringStationsByLocation.click()
    const getCurrentUrl1 = await browser.getUrl()
    const expectedCurrentURL = '/search-location'
    await expect(getCurrentUrl1).toMatch(expectedCurrentURL)

    browser.back()
    browser.refresh()

    await hubPage.getCreateCustomDataSet.click()
    const getCurrentUrl2 = await browser.getUrl()
    const expectedCurrentURL2 = '/customdataset'
    await expect(getCurrentUrl2).toMatch(expectedCurrentURL2)
  })
})
