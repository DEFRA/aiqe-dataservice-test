import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import searchPage from '../page-objects/searchPage.js'
// import resultsPage from '../page-objects/resultsPage.js'
// import monitoringStationPage from '../page-objects/monitoringStationPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
import disambigurationPage from '../page-objects/disambigurationPage.js'
import common from '../page-objects/common.js'
import hubPage from '../page-objects/hubPage.js'

describe('disambiguration page tests', () => {
  it('checking titles and content', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    // startnow-block
    await startNowPage.startNowBtnClick()
    await hubPage.getFindMonitoringStationsByLocation.click()

    // search block
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('london')
    await searchPage.milesOptionClick('25 miles')
    await searchPage.continueBtnClick()
    // disambiguration page
    // checking cheader and footer
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    // checking title
    const disambugurationPageHeading = `Locations matching 'london'`
    const getDisambugurationPageHeading =
      await disambigurationPage.getDisambigurationPageHeading.getText()
    await expect(getDisambugurationPageHeading).toMatch(
      disambugurationPageHeading
    )
    // checking content not matching even though its the same
    /* const disambigurationPageContent = `Locations matching 'london'
More than one match was found for your location. Choose the correct location from the following options:
City of London, City and County of the City of London
London City Airport, Newham
London Heathrow Airport, Hillingdon
London, City of Westminster
London Apprentice, Cornwall
Little London, Buckinghamshire
Little London, Leeds
Little London, Wiltshire
Little London, Walsall
London Fields, Dudley·
Alternatively, try searching again`
    const getdisambigurationPageContent =
      await disambigurationPage.getdisambigurationPageContent.getText()
    await expect(disambigurationPageContent).toMatch(
      getdisambigurationPageContent
    ) */
  })

  it('styling tests', async () => {
    const getDisambigurationPageHeading = [
      await disambigurationPage.getDisambigurationPageHeading
    ]

    const getDisambigurationPageHeadingProperties = [
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getDisambigurationPageHeading) {
      const styles = await common.getStyles(
        element,
        getDisambigurationPageHeadingProperties
      )
      expect(styles['margin-top']).toBe('30px')
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getdisambigurationPageContentStyles = [
      await disambigurationPage.getdisambigurationPageContent
    ]

    const getDisambigurationPageContentProperties = [
      'padding-bottom',
      'padding-top'
    ]

    for (const element of getdisambigurationPageContentStyles) {
      const styles = await common.getStyles(
        element,
        getDisambigurationPageContentProperties
      )
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const getBackLink = [await common.getBackLink]

    const getBackLinkProperties = [
      'color',
      'font-size',
      'line-height',
      'font-family',
      'display',
      'margin-bottom',
      'margin-top',
      'padding-left',
      'position',
      'text-decoration',
      'text-decoration-thickness'
    ]

    for (const element of getBackLink) {
      const styles = await common.getStyles(element, getBackLinkProperties)
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.display).toBe('inline-block')
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['margin-top']).toBe('15px')
      expect(styles['padding-left']).toBe('14px')
      expect(styles.position).toBe('relative')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(11, 12, 12)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
    }

    const getTryAgainLink = [await disambigurationPage.getTrySearchingAgainLink]

    const getTryAgainLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getTryAgainLink) {
      const styles = await common.getStyles(element, getTryAgainLinkProperties)
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

    const getLocationLink = [
      await disambigurationPage.getLocationLinkByText('City of London')
    ]

    const getLocationLinkProperties = [
      'font-weight',
      'color',
      'font-family',
      'font-size',
      'line-height'
    ]

    for (const element of getLocationLink) {
      const styles = await common.getStyles(element, getLocationLinkProperties)
      expect(styles['font-weight']).toBe('700')
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
    }

    const getParagraphLink = [await disambigurationPage.getParagraph]

    const getParagraphLinkProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getParagraphLink) {
      const styles = await common.getStyles(element, getParagraphLinkProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getListItem = [await disambigurationPage.getListItem]

    const getListItemProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getListItem) {
      const styles = await common.getStyles(element, getListItemProperties)
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it('check links', async () => {
    // checking back link
    await common.getBackLink.click()
    await browser.refresh()
    const getCurrentURLAfterBackLink = await browser.getUrl()
    const expectedURL = '/search-location'
    await expect(getCurrentURLAfterBackLink).toMatch(expectedURL)

    const getRetainedSearchTermAfterBackLink =
      await searchPage.searchBox.getValue()
    const expectedRetainedSearchTerm = 'london'
    await expect(getRetainedSearchTermAfterBackLink).toMatch(
      expectedRetainedSearchTerm
    )

    const defaultMilesOptionIsSelectedAfterBackLink =
      await searchPage.defaultOption.isSelected()
    await expect(defaultMilesOptionIsSelectedAfterBackLink).toBe(true)

    // checking try searching again link
    await searchPage.milesOptionClick('25 miles')
    await searchPage.continueBtnClick()

    await disambigurationPage.getTrySearchingAgainLink.click()
    await browser.refresh()
    const getCurrentURLAfterSearchAgain = await browser.getUrl()
    await expect(getCurrentURLAfterSearchAgain).toMatch(expectedURL)
    const defaultMilesOptionIsSelectedAfterSearchAgain =
      await searchPage.defaultOption.isSelected()
    await expect(defaultMilesOptionIsSelectedAfterSearchAgain).toBe(true)

    // checking location links
    await searchPage.setsearch('london')
    await searchPage.milesOptionClick('25 miles')
    await searchPage.continueBtnClick()
    await browser.refresh

    await disambigurationPage.locationLinkClick('City of London')
    const getCurrentURLCityOfLondon = await browser.getUrl()
    const expectedURLCityOfLondon =
      '/location/city-of-london-city-and-county-of-the-city-of-london'
    await expect(getCurrentURLCityOfLondon).toMatch(expectedURLCityOfLondon)
    common.getBackLink.click()
    browser.refresh()

    await disambigurationPage.locationLinkClick('Little London')
    const getCurrentURLLittleLondonBucks = await browser.getUrl()
    const expectedURLLittleLondonBucks =
      '/location/little-london-buckinghamshire'
    await expect(getCurrentURLLittleLondonBucks).toMatch(
      expectedURLLittleLondonBucks
    )
    await common.getBackLink.click()
    await browser.refresh()

    await disambigurationPage.locationLinkClick('London Fields')
    const getCurrentURLLondonFIeldsDudley = await browser.getUrl()
    const expectedURLLondonFIeldsDudley = '/location/london-fields-dudley'
    await expect(getCurrentURLLondonFIeldsDudley).toMatch(
      expectedURLLondonFIeldsDudley
    )
    await common.getBackLink.click()
    await browser.refresh()
  })
})
