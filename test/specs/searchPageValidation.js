import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
import searchPage from '../page-objects/searchPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
// import hubPage from '../page-objects/hubPage.js'

describe('search page content/functionality checks/styling checks', () => {
  it('titles and content', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.maximizeWindow()
    await browser.url('')
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await startNowPage.startNowBtnClick()
    // await hubPage.getFindMonitoringStationsByLocation.click()
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    // back button check
    await common.getBackLink.click()
    await startNowPage.startNowBtnClick()
    // await hubPage.getFindMonitoringStationsByLocation.click()

    // page content validation
    const seachPageContent = `Find monitoring stations by location
For locations in Northern Ireland, you can only search by postcode.
Enter a town or postcode
Approximate search area
5 miles
25 miles
50 miles
Continue`
    const getsearchPagecontent = await searchPage.getSearchPageContent.getText()
    await expect(seachPageContent).toMatch(getsearchPagecontent)
  })

  it('styling', async () => {
    const searchPageHeading = [await searchPage.getSearchPageHeaderText]

    const searchPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family'
    ]

    for (const element of searchPageHeading) {
      const styles = await common.getStyles(
        element,
        searchPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const searchPageContent = [await searchPage.getSearchPageContent]

    const searchPageContentProperties = ['float', 'width', 'padding']

    for (const element of searchPageContent) {
      const styles = await common.getStyles(
        element,
        searchPageContentProperties
      )
      expect(styles.float).toBe('left')
      expect(styles.width).toBe('660px')
      expect(styles.padding).toBe('0px 15px')
    }

    const searchPageHintText = [await searchPage.getSearchPageHintText]

    const searchPageHintTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of searchPageHintText) {
      const styles = await common.getStyles(
        element,
        searchPageHintTextProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('15px')
    }

    const EnterTownOrPostcodeLabel = [
      await searchPage.getEnterTownOrPostcodeLabel('Enter a town or postcode')
    ]

    const EnterTownOrPostcodeLabelProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of EnterTownOrPostcodeLabel) {
      const styles = await common.getStyles(
        element,
        EnterTownOrPostcodeLabelProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('5px')
    }

    const searchBox = [await searchPage.searchBox]

    const searchBoxProperties = [
      'font-size',
      'line-height',
      'font-family',
      'border',
      'font-weight',
      'height',
      'padding',
      'width'
    ]

    for (const element of searchBox) {
      const styles = await common.getStyles(element, searchBoxProperties)
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.border).toBe('2px solid rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.height).toBe('40px')
      expect(styles.padding).toBe('5px')
      expect(styles.width).toBe('630px')
    }

    const approxSearchAreaLabel = [await searchPage.approxSearchAreaLabel]

    const approxSearchAreaLabelProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of approxSearchAreaLabel) {
      const styles = await common.getStyles(
        element,
        approxSearchAreaLabelProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('10px')
    }

    const mileOptions = [
      await searchPage.getOptionByText('5 miles'),
      await searchPage.getOptionByText('25 miles'),
      await searchPage.getOptionByText('50 miles')
    ]

    const mileOptionsProperties = [
      'align-self',
      'margin-bottom',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'height',
      'width'
    ]

    for (const element of mileOptions) {
      const styles = await common.getStyles(element, mileOptionsProperties)
      expect(styles['align-self']).toBe('center')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.height).toBe('25px')
    }

    const continueButton = [await searchPage.getContinueBtn]

    const continueButtonProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'color',
      'font-weight',
      'margin',
      'padding',
      'text-align'
    ]

    for (const element of continueButton) {
      const styles = await common.getStyles(element, continueButtonProperties)
      expect(styles['margin-bottom']).toBe('32px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 32px')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles['text-align']).toBe('center')
    }
  })

  it('searching different locations and miles', async () => {
    await searchPage.setsearch('london')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    const getCurrentURLAfterSearch1 = await browser.getUrl()
    const expectedURL1 = '/multiplelocations'
    await expect(getCurrentURLAfterSearch1).toMatch(expectedURL1)
    await browser.back()
    await browser.refresh()

    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('25 miles')
    await searchPage.continueBtnClick()
    const getCurrentURLAfterSearch2 = await browser.getUrl()
    const expectedURL2 = '/multiplelocations'
    await expect(getCurrentURLAfterSearch2).toMatch(expectedURL2)
    await browser.back()
    await browser.refresh()

    await searchPage.setsearch('B2 4QA')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    const getCurrentURLAfterSearch3 = await browser.getUrl()
    const expectedURL3 = '/multiplelocations'
    await expect(getCurrentURLAfterSearch3).toMatch(expectedURL3)
    await browser.back()
    await browser.refresh()
  })

  it('unique location goes straight to list page', async () => {
    await searchPage.setsearch('WD17 1DF')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    const getCurrentURLAfterSearch4 = await browser.getUrl()
    const expectedURL4 = '/multiplelocations'
    await expect(getCurrentURLAfterSearch4).toMatch(expectedURL4)
    await browser.back()
    await browser.refresh()
  })
})
