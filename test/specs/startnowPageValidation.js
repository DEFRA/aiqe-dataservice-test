import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
describe('start now page content/functionality checks/styling checks', () => {
  it('content and titles', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()

    // page content validation
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    const startnowPageContent = `Get air pollution data
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
Start now`
    const getStartNowPagecontent =
      await startNowPage.getStartNowPagecontent.getText()
    await expect(startnowPageContent).toMatch(getStartNowPagecontent)
  })

  it('link checks', async () => {
    await startNowPage.startNowBtnClick()
    const searchPageURL = await browser.getUrl()
    const expectedSearchPageURL = 'search-location'
    await expect(searchPageURL).toMatch(expectedSearchPageURL)
    await common.getBackLink.click()
    const startNowPageURL = await browser.getUrl()
    const expectedStartNowPageURL = 'https://aqie-dataselector-frontend'
    await expect(startNowPageURL).toMatch(expectedStartNowPageURL)
    await browser.refresh()
  })

  it('styling checks', async () => {
    const startNowPageHeading = [await startNowPage.getStartNowPageHeading]

    const startNowPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of startNowPageHeading) {
      const styles = await common.getStyles(
        element,
        startNowPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('50px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const startNowPageBodyText = [await startNowPage.getstartNowPageBodyText]

    const startNowPageBodyTextProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of startNowPageBodyText) {
      const styles = await common.getStyles(
        element,
        startNowPageBodyTextProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const startNowPageList = [await startNowPage.getstartNowPageList]

    const startNowPageListProperties = [
      'padding-left',
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of startNowPageList) {
      const styles = await common.getStyles(element, startNowPageListProperties)
      expect(styles['padding-left']).toBe('20px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const startNowPageListItem = [await startNowPage.getstartNowPageListItem]

    const startNowPageListItemProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of startNowPageListItem) {
      const styles = await common.getStyles(
        element,
        startNowPageListItemProperties
      )
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })
})
