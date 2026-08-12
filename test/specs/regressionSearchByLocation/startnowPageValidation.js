import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import headersObject from '../../page-objects/header.js'
import footer from '../../page-objects/footer.js'
describe('start now page content/functionality checks/styling checks', () => {
  it('content and titles', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    // page content validation
    const isHeaderOverallDisplayed =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayed = await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayed).toBe(true)
    await expect(isFooterOverallDisplayed).toBe(true)
    const startnowPageContent = `Get air pollution data
Use this service to view and download air pollution data from monitoring networks across the UK.
To get air pollution data, you can:
search by town or postcode
create a custom dataset
Start now
Other ways to get this information
Email: getairpollutiondata@defra.gov.uk
Related content
Check air quality
Sources of air pollution data`
    const getStartNowPagecontent =
      await startNowPage.getStartNowPagecontent.getText()
    await expect(startnowPageContent).toBe(getStartNowPagecontent)
  })

  it('link checks', async () => {
    await startNowPage.startNowBtnClick()
    const hubPageURL = await browser.getUrl()
    const expectedHubPageURL = '/hubpage'
    await expect(hubPageURL).toMatch(expectedHubPageURL)
    await browser.back()
    await browser.refresh()
    const startNowPageURL = await browser.getUrl()
    const expectedStartNowPageURL = 'https://aqie-dataselector-frontend'
    await expect(startNowPageURL).toMatch(expectedStartNowPageURL)
    await browser.refresh()

    // checking external links
    const expectedCheckAirQualityLink =
      'https://check-air-quality.service.gov.uk/'
    const expectedSourcesOfAirPollutionDataLink =
      'https://www.gov.uk/government/collections/air-pollution-in-the-uk-sources-of-monitoring-data'
    const getCheckAirQualityLink =
      await startNowPage.getCheckAirQualityLink.getAttribute('href')
    const getSourcesOfAirPollutionDataLink =
      await startNowPage.getSourcesOfAirPollutionDataLink.getAttribute('href')
    await expect(getCheckAirQualityLink).toBe(expectedCheckAirQualityLink)
    await expect(getSourcesOfAirPollutionDataLink).toBe(
      expectedSourcesOfAirPollutionDataLink
    )
    // checking email link
    const mailtoLinks = await $$('a[href^="mailto:"]')
    const currentURL = await browser.getUrl()
    expect(mailtoLinks.length).toBe(1)
    for (const link of mailtoLinks) {
      const hrefValue = await link.getAttribute('href')
      expect(hrefValue).toMatch(/^mailto:/)
      await link.click()
      expect(await browser.getUrl()).toBe(currentURL)
    }
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

    const startNowButton = [await startNowPage.getStartNowBtn]

    const getStartNowBtnProperties = [
      'color',
      'font-size',
      'line-height',
      'font-weight',
      'margin-bottom',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'padding'
    ]

    for (const element of startNowButton) {
      const styles = await common.getStyles(element, getStartNowBtnProperties)

      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('24px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['margin-bottom']).toBe('32px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles.padding).toBe('8px 10px 7px')
    }

    const OtherWaysToGetThisInfoTitle = [
      await startNowPage.getOtherWaysToGetThisInfoTitle
    ]

    const OtherWaysToGetThisInfoTitlenProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of OtherWaysToGetThisInfoTitle) {
      const styles = await common.getStyles(
        element,
        OtherWaysToGetThisInfoTitlenProperties
      )

      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }
  })

  it('AQD-1395 - start now page side navigation positioning', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.getStartNowPagecontent.waitForDisplayed({
      timeout: 15000
    })

    const sidePanel = await startNowPage.getSideNavigationPanel
    await sidePanel.waitForDisplayed({ timeout: 10000 })

    const sidePanelText = (await sidePanel.getText())
      .replace(/\s+/g, ' ')
      .trim()
    await expect(sidePanelText).toContain('Related content')

    const sidePanelLocation = await sidePanel.getLocation()
    const sidePanelSize = await sidePanel.getSize()

    await expect(Math.round(sidePanelLocation.x)).toBe(1121)
    await expect(Math.round(sidePanelLocation.y)).toBe(497)
    await expect(Math.round(sidePanelSize.width)).toBe(330)
    await expect(Math.round(sidePanelSize.height)).toBe(147)
  })
})
