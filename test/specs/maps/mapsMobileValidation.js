// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import mapsPage from '../../page-objects/mapsPage.js'
import cookiesBanner from '../../page-objects/cookiesBanner.js'

describe('maps mobile Validation', () => {
  it('map buttons', async () => {
    await browser.url(
      'https://aqie-maps-frontend.dev.cdp-int.defra.cloud/map?map:center=-1.4649,52.5619&map:zoom=5.4842222'
    )
    await browser.maximizeWindow()
    await common.legalWait()
    await cookiesBanner.getAcceptCookiesButton.click()
    await cookiesBanner.getHideCookiesButton.click()

    // checking close buttons work for filter panel and map key
    await common.legalWait()
    await mapsPage.getMapFilterPanelCross.click()
    await mapsPage.getMapKeyClose.click()
    const getMapKey = await mapsPage.getMapKey
    await expect(getMapKey).not.toBeDisplayed()
    const getMapFilterPanel = await mapsPage.getMapFilterPanel
    await expect(getMapFilterPanel).not.toBeDisplayed()

    // checking zoom in and out functions work and styling
    const originalUrl = await browser.getUrl()
    const expectedOriginalURL = '5.4842222'
    await expect(originalUrl).toMatch(expectedOriginalURL)

    await mapsPage.getZoomInButton.click()
    await common.legalWait()
    const zoomInUrl = await browser.getUrl()
    const expectedZoomInURL = '6.4842222'
    await expect(zoomInUrl).toMatch(expectedZoomInURL)

    await mapsPage.getZoomOutButton.click()
    await common.legalWait()
    const zoomOutUrl = await browser.getUrl()
    await expect(zoomOutUrl).toMatch(expectedOriginalURL)

    const getzoomButtonStyling = [
      await mapsPage.getZoomInButton,
      await mapsPage.getZoomOutButton
    ]
    const getzoomButtonStylingProperties = [
      'color',
      'padding-left',
      'padding-right'
    ]
    for (const element of getzoomButtonStyling) {
      const styles = await common.getStyles(
        element,
        getzoomButtonStylingProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['padding-left']).toBe('8px')
      expect(styles['padding-right']).toBe('8px')
    }

    // checking filter menu and map key buttons work and styling
    const OpenMapKeyButtonStyling = [await mapsPage.getOpenMapKeyButton]
    const getOpenMapKeyButtonStylingProperties = [
      'gap',
      'padding',
      'font-size',
      'background-color',
      'height',
      'font-family',
      'color'
    ]
    for (const element of OpenMapKeyButtonStyling) {
      const styles = await common.getStyles(
        element,
        getOpenMapKeyButtonStylingProperties
      )
      expect(styles.gap).toBe('6px')
      expect(styles.padding).toBe('0px 10px')
      expect(styles['font-size']).toBe('13.3333px')
      expect(['rgb(243, 242, 241)', 'rgb(255, 255, 255)']).toContain(
        styles['background-color'].trim().toLowerCase()
      )
      expect(styles.height).toBe('40px')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
      expect(styles.color).toBe('rgb(0, 0, 0)')
    }

    await mapsPage.getOpenMapKeyButton.click()
    await common.legalWait()
    const displayedMapKey = await mapsPage.getMapKey
    await expect(displayedMapKey).toBeDisplayed()

    await mapsPage.getOpenMapKeyButton.click()
    await common.legalWait()
    const notDisplayedMapKeyAfterClick = await mapsPage.getMapKey
    await expect(notDisplayedMapKeyAfterClick).not.toBeDisplayed()

    const OpenFilterPanelButtonStyling = [
      await mapsPage.getOpenFilterPanelButton
    ]
    const getOpenFilterPanelButtonStylingProperties = [
      'gap',
      'padding',
      'font-size',
      'background-color',
      'height',
      'font-family',
      'color'
    ]
    for (const element of OpenFilterPanelButtonStyling) {
      const styles = await common.getStyles(
        element,
        getOpenFilterPanelButtonStylingProperties
      )
      expect(styles.gap).toBe('6px')
      expect(styles.padding).toBe('0px 10px')
      expect(styles['font-size']).toBe('13.3333px')
      expect(['rgb(243, 242, 241)', 'rgb(255, 255, 255)']).toContain(
        styles['background-color'].trim().toLowerCase()
      )
      expect(styles.height).toBe('40px')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
      expect(styles.color).toBe('rgb(0, 0, 0)')
    }

    await mapsPage.getOpenFilterPanelButton.click()
    await common.legalWait()
    const displayedFilterPanel = await mapsPage.getMapFilterPanel
    await expect(displayedFilterPanel).toBeDisplayed()

    await mapsPage.getOpenFilterPanelButton.click()
    await common.legalWait()
    const notDisplayedFilterPanelAfterClick = await mapsPage.getMapFilterPanel
    await expect(notDisplayedFilterPanelAfterClick).not.toBeDisplayed()
    // checking exit map button works and styling of the button

    const getExitMapButtonStyling = [await mapsPage.getExitMapButton]
    const getExitMapButtonStylingProperties = [
      'background-color',
      'gap',
      'height',
      'padding',
      'font-family',
      'font-size',
      'top',
      'left',
      'color'
    ]
    for (const element of getExitMapButtonStyling) {
      const styles = await common.getStyles(
        element,
        getExitMapButtonStylingProperties
      )
      expect(['rgb(243, 242, 241)', 'rgb(255, 255, 255)']).toContain(
        styles['background-color'].trim().toLowerCase()
      )
      expect(styles.gap).toBe('6px')
      expect(styles.height).toBe('40px')
      expect(styles.padding).toBe('0px 12px')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
      expect(styles['font-size']).toBe('16px')
      expect(styles.top).toBe('10px')
      expect(styles.left).toBe('10px')
      expect(styles.color).toBe('rgb(0, 0, 0)')
    }

    await mapsPage.getExitMapButton.click()
    await common.legalWait()
    const exitMapUrl = await browser.getUrl()
    const expectedExitMapURL = 'data:,'
    expect(exitMapUrl).toBe(expectedExitMapURL)
  })

  it('Click a monitoring station marker on the map', async () => {
    await browser.url(
      'https://aqie-maps-frontend.dev.cdp-int.defra.cloud/map?map:center=-1.4649,52.5619&map:zoom=5.4842222'
    )
    await browser.maximizeWindow()
    await common.legalWait()
    // Markers are drawn on the MapLibre GL canvas, not as individual DOM
    // elements, so we scan pixel offsets on the canvas until clicking one
    // opens the monitoring station info panel.
    const found = await mapsPage.findAndClickMarker(async () => {
      return await mapsPage.getMonitoringStationInformationPanel
        .isDisplayed()
        .catch(() => false)
    })
    expect(found).not.toBeNull()
    await expect(mapsPage.getMonitoringStationInformationPanel).toBeDisplayed()
  })

  it('information panel content checks, AQD-1523', async () => {
    const panelContent =
      await mapsPage.getMonitoringStationInformationPanel.getText()
    const expectedContent = `Dundee Mains Loan Active
Pollutants: NO₂
DAQI (observed): 1 (low)
Local authority: Dundee City
Site type: Background Urban
Start date: 1 October 2017
View full station summary`
    await expect(panelContent).toMatch(expectedContent)
  })

  it('monitoring station information panel styling checks, AQD-1523', async () => {
    const InformationPanelStationHeading = [
      await mapsPage.getMonitoringStationInformationPanelStationHeading
    ]

    const InformationPanelStationHeadingProperties = [
      'flex-wrap',
      'align-items',
      'gap',
      'margin-bottom'
    ]

    for (const element of InformationPanelStationHeading) {
      const styles = await common.getStyles(
        element,
        InformationPanelStationHeadingProperties
      )
      expect(styles['flex-wrap']).toBe('wrap')
      expect(styles['align-items']).toBe('flex-start')
      expect(styles.gap).toBe('8px')
      expect(styles['margin-bottom']).toBe('12px')
    }

    const InformationPanelStationStatus = [
      await mapsPage.getMonitoringStationInformationPanelStationStatus
    ]

    const InformationPanelStationStatusProperties = [
      'color',
      'background-color',
      'font-weight',
      'vertical-align',
      'padding',
      'font-size'
    ]

    for (const element of InformationPanelStationStatus) {
      const styles = await common.getStyles(
        element,
        InformationPanelStationStatusProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(187, 212, 234)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.padding).toBe('2px 8px')
      expect(styles['font-size']).toBe('14px')
    }

    const InformationPanelStationCloseButton = [
      await mapsPage.getMonitoringStationInformationPanelCloseButton
    ]

    const InformationPanelStationCloseButtonProperties = [
      'cursor',
      'color',
      'background-color',
      'border',
      'width',
      'height',
      'padding',
      'position',
      'top',
      'right'
    ]

    for (const element of InformationPanelStationCloseButton) {
      const styles = await common.getStyles(
        element,
        InformationPanelStationCloseButtonProperties
      )
      expect(styles.cursor).toBe('pointer')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('0px none rgb(11, 12, 12)')
      expect(styles.width).toBe('40px')
      expect(styles.height).toBe('40px')
      expect(styles.padding).toBe('0px')
      expect(styles.position).toBe('absolute')
      expect(styles.top).toBe('3px')
      expect(styles.right).toBe('3px')
    }

    const InformationPanelMonitoringStationInfoLabel = [
      await mapsPage.getMonitoringStationInformationPanelMonitoringStationInfoLabel
    ]

    const InformationPanelMonitoringStationInfoLabelProperties = [
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'color'
    ]

    for (const element of InformationPanelMonitoringStationInfoLabel) {
      const styles = await common.getStyles(
        element,
        InformationPanelMonitoringStationInfoLabelProperties
      )
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('inline')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const InformationPanelMonitoringStationInfoValue = [
      await mapsPage.getMonitoringStationInformationPanelMonitoringStationInfoValue
    ]

    const InformationPanelMonitoringStationInfoValueProperties = [
      'margin',
      'display',
      'font-size',
      'line-height',
      'font-weight',
      'font-family',
      'color'
    ]

    for (const element of InformationPanelMonitoringStationInfoValue) {
      const styles = await common.getStyles(
        element,
        InformationPanelMonitoringStationInfoValueProperties
      )
      expect(styles.margin).toBe('0px')
      expect(styles.display).toBe('inline')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const InformationPanelMonitoringStationInfoDaqiLowStatus = [
      await mapsPage.getMonitoringStationInformationPanelMonitoringStationInfoDaqiLowStatus
    ]

    const InformationPanelMonitoringStationInfoDaqiLowStatusProperties = [
      'color',
      'background-color',
      'padding',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family'
    ]

    for (const element of InformationPanelMonitoringStationInfoDaqiLowStatus) {
      const styles = await common.getStyles(
        element,
        InformationPanelMonitoringStationInfoDaqiLowStatusProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(204, 226, 216)')
      expect(styles.padding).toBe('1px 6px')
      expect(styles['font-weight']).toBe('400')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const InformationPanelMonitoringStationLink = [
      await mapsPage.getMonitoringStationInformationPanelMonitoringStationLink
    ]

    const InformationPanelMonitoringStationLinkProperties = [
      'color',
      'text-decoration',
      'font-family',
      'cursor'
    ]

    for (const element of InformationPanelMonitoringStationLink) {
      const styles = await common.getStyles(
        element,
        InformationPanelMonitoringStationLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['text-decoration']).toBe('underline 1px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.cursor).toBe('pointer')
    }
  })

  it('station link is displayed and when clicked leads user to monitoring station page in a new tab, AQD-1523', async () => {
    const stationLink =
      await mapsPage.getMonitoringStationInformationPanelMonitoringStationLink
    await expect(stationLink).toBeDisplayed()

    const originalHandle = await browser.getWindowHandle()
    const originalHandles = await browser.getWindowHandles()
    await stationLink.click()

    await browser.waitUntil(
      async () =>
        (await browser.getWindowHandles()).length > originalHandles.length,
      {
        timeout: 10000,
        timeoutMsg:
          'expected a new tab/window to open after clicking the station link'
      }
    )

    const updatedHandles = await browser.getWindowHandles()
    const newTabHandle = updatedHandles.find(
      (handle) => !originalHandles.includes(handle)
    )
    await browser.switchToWindow(newTabHandle)

    const newTabUrl = await browser.getUrl()
    expect(newTabUrl).not.toContain('/map')

    await browser.closeWindow()
    await browser.switchToWindow(originalHandle)
  })

  it('monitoring station information panel dissapears when user clicks the cross', async () => {
    await mapsPage.getMonitoringStationInformationPanelCloseButton.click()
    await expect(
      mapsPage.getMonitoringStationInformationPanel
    ).not.toBeDisplayed()
  })

  it('map key ui checks and styling', async () => {
    await browser.url(
      'https://aqie-maps-frontend.dev.cdp-int.defra.cloud/map?map:center=-1.4649,52.5619&map:zoom=5.4842222'
    )
    await browser.maximizeWindow()
    await common.legalWait()
    // content
    const MapKeyContent = await mapsPage.getMapKey.getText()
    const expectedMapKeyContent = `Close map key
Map key
Daily Air Quality Index (DAQI)
1
2
3
4
5
6
7
8
9
10
Low
1 to 3
Moderate
4 to 6
High
7 to 9
Very high
10`
    await expect(MapKeyContent).toMatch(expectedMapKeyContent)

    // styling

    const getMapKey = [await mapsPage.getMapKey]

    const getMapKeyProperties = [
      'background-color',
      'border-left',
      'width',
      'min-height',
      'padding',
      'font-family',
      'bottom',
      'left'
    ]

    for (const element of getMapKey) {
      const styles = await common.getStyles(element, getMapKeyProperties)
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles['border-left']).toBe('4px solid rgb(29, 112, 184)')
      expect(styles.width).toBe('400px')
      expect(styles['min-height']).toBe('190px')
      expect(styles.padding).toBe('16px 20px 16px 16px')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
      expect(styles.bottom).toBe('10px')
      expect(styles.left).toBe('10px')
    }

    const getMapKeyClose = [await mapsPage.getMapKeyClose]

    const getMapKeyCloseProperties = [
      'background',
      'border',
      'padding',
      'top',
      'right'
    ]

    for (const element of getMapKeyClose) {
      const styles = await common.getStyles(element, getMapKeyCloseProperties)
      expect(styles.background).toBe(
        'rgba(0, 0, 0, 0) none repeat scroll 0px 0px / auto padding-box border-box'
      )
      expect(styles.border).toBe('0px none rgb(0, 0, 0)')
      expect(styles.padding).toBe('4px')
      expect(styles.top).toBe('8px')
      expect(styles.right).toBe('8px')
    }

    const getMapKeyHeading = [await mapsPage.getMapKeyHeading]

    const getMapKeyHeadingProperties = [
      'margin-bottom',
      'font-size',
      'font-weight',
      'line-height',
      'color',
      'font-family'
    ]

    for (const element of getMapKeyHeading) {
      const styles = await common.getStyles(element, getMapKeyHeadingProperties)
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getMapKeyDailyAirQualityIndexDAQISubheading = [
      await mapsPage.getMapKeyDailyAirQualityIndexDAQISubheading
    ]

    const getMapKeyDailyAirQualityIndexDAQISubheadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-weight',
      'font-family',
      'color'
    ]

    for (const element of getMapKeyDailyAirQualityIndexDAQISubheading) {
      const styles = await common.getStyles(
        element,
        getMapKeyDailyAirQualityIndexDAQISubheadingProperties
      )
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getMapKeyScaleBandOne = [await mapsPage.getMapKeyScaleBandOne]

    const getMapKeyScaleBandOneProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandOne) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandOneProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(156, 255, 156)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandTwo = [await mapsPage.getMapKeyScaleBandTwo]

    const getMapKeyScaleBandTwoProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandTwo) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandTwoProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(49, 255, 0)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandThree = [await mapsPage.getMapKeyScaleBandThree]

    const getMapKeyScaleBandThreeProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandThree) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandThreeProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(49, 207, 0)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandFour = [await mapsPage.getMapKeyScaleBandFour]

    const getMapKeyScaleBandFourProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandFour) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandFourProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(255, 255, 0)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandFive = [await mapsPage.getMapKeyScaleBandFive]

    const getMapKeyScaleBandFiveProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandFive) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandFiveProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(255, 207, 0)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandSix = [await mapsPage.getMapKeyScaleBandSix]

    const getMapKeyScaleBandSixProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandSix) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandSixProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(255, 154, 0)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandSeven = [await mapsPage.getMapKeyScaleBandSeven]

    const getMapKeyScaleBandSevenProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandSeven) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandSevenProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(255, 146, 146)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandEight = [await mapsPage.getMapKeyScaleBandEight]

    const getMapKeyScaleBandEightProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandEight) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandEightProperties
      )
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(255, 0, 0)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandNine = [await mapsPage.getMapKeyScaleBandNine]

    const getMapKeyScaleBandNineProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandNine) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandNineProperties
      )
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(153, 0, 0)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyScaleBandTen = [await mapsPage.getMapKeyScaleBandTen]

    const getMapKeyScaleBandTenProperties = [
      'color',
      'background-color',
      'justify-content',
      'font-size',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyScaleBandTen) {
      const styles = await common.getStyles(
        element,
        getMapKeyScaleBandTenProperties
      )
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(206, 48, 255)')
      expect(styles['justify-content']).toBe('center')
      expect(styles['font-size']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyLowLabel = [await mapsPage.getMapKeyLowLabel]

    const getMapKeyLowLabelProperties = [
      'color',
      'font-size',
      'line-height',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyLowLabel) {
      const styles = await common.getStyles(
        element,
        getMapKeyLowLabelProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('19.2px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }

    const getMapKeyLowScaleRange = [await mapsPage.getMapKeyLowScaleRange]

    const getMapKeyLowScaleRangeProperties = [
      'color',
      'font-size',
      'line-height',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapKeyLowScaleRange) {
      const styles = await common.getStyles(
        element,
        getMapKeyLowScaleRangeProperties
      )
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-size']).toBe('15px')
      expect(styles['line-height']).toBe('18px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
    }
  })

  it('map filter panel content checks, styling', async () => {
    // content checks
    await browser.url(
      'https://aqie-maps-frontend.dev.cdp-int.defra.cloud/map?map:center=-1.4649,52.5619&map:zoom=5.4842222'
    )
    await browser.maximizeWindow()
    await cookiesBanner.getAcceptCookiesButton.click()
    await cookiesBanner.getHideCookiesButton.click()
    await common.legalWait()
    await mapsPage.getMapFilterPanelDataSourcesDropdownLink.click()
    const mapFilterPanelContent = await mapsPage.getMapFilterPanel.getText()
    const expectedMapFilterPanelContent = `Search by pollutant
DAQI pollutants
Other pollutants
Select pollutants to display on the map
Fine particulate matter (PM2.5)
Particulate matter (PM10)
Nitrogen dioxide (NO2)
Ozone (O3)
Sulphur dioxide (SO2)
Data sources
Automatic Urban and Rural Network (AURN)`
    await expect(mapFilterPanelContent).toMatch(expectedMapFilterPanelContent)

    await mapsPage.getMapFilterPanelOtherPollutantsButton.click()
    const mapFilterPanelOtherPollutantsContent =
      await mapsPage.getMapFilterPanel.getText()
    const expectedMapFilterPanelOtherPollutantsContent = `Search by pollutant
DAQI pollutants
Other pollutants
Other pollutant networks are not yet available.
Data sources
Automatic Urban and Rural Network (AURN)`
    await expect(mapFilterPanelOtherPollutantsContent).toMatch(
      expectedMapFilterPanelOtherPollutantsContent
    )

    // styling checks
    await mapsPage.getMapFilterPanelDAQIPollutantsButton.click()
    const getMapFilterPanel = [await mapsPage.getMapFilterPanel]

    const getMapFilterPanelProperties = ['padding']

    for (const element of getMapFilterPanel) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelProperties
      )
      expect(styles.padding).toBe('18px 50px 18px 18px')
    }

    const getMapFilterPanelTitle = [await mapsPage.getMapFilterPanelTitle]

    const getMapFilterPanelTitleProperties = [
      'font-weight',
      'margin-bottom',
      'margin-top',
      'font-size',
      'line-height',
      'color'
    ]

    for (const element of getMapFilterPanelTitle) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelTitleProperties
      )
      expect(styles['font-weight']).toBe('700')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles['margin-top']).toBe('0px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getMapFilterPanelCross = [await mapsPage.getMapFilterPanelCross]

    const getMapFilterPanelCrossProperties = [
      'color',
      'background-color',
      'border',
      'width',
      'height',
      'padding',
      'top',
      'right'
    ]

    for (const element of getMapFilterPanelCross) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelCrossProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('0px none rgb(11, 12, 12)')
      expect(styles.width).toBe('40px')
      expect(styles.height).toBe('40px')
      expect(styles.padding).toBe('0px')
      expect(styles.top).toBe('3px')
      expect(styles.right).toBe('3px')
    }

    const getMapFilterPanelDAQIPollutantsButton = [
      await mapsPage.getMapFilterPanelDAQIPollutantsButton
    ]

    const getMapFilterPanelDAQIPollutantsButtonProperties = [
      'border',
      'background-color',
      'width',
      'height',
      'padding',
      'font-family',
      'font-size',
      'font-weight',
      'color'
    ]

    for (const element of getMapFilterPanelDAQIPollutantsButton) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelDAQIPollutantsButtonProperties
      )
      expect(styles.border).toBe('2px solid rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgba(0, 0, 0, 0)')
      expect(styles.width).toBe('191px')
      expect(styles.height).toBe('40px')
      expect(styles.padding).toBe('0px 5px')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
      expect(styles['font-size']).toBe('16px')
      expect(styles['font-weight']).toBe('700')
      expect(styles.color).toBe('rgb(0, 0, 0)')
    }

    const getMapFilterPanelOtherPollutantsButton = [
      await mapsPage.getMapFilterPanelOtherPollutantsButton
    ]

    const getMapFilterPanelOtherPollutantsButtonProperties = [
      'border',
      'background-color',
      'width',
      'height',
      'padding',
      'font-family',
      'font-size',
      'font-weight',
      'color'
    ]

    for (const element of getMapFilterPanelOtherPollutantsButton) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelOtherPollutantsButtonProperties
      )
      expect(styles.border).toBe('1px solid rgb(231, 231, 231)')
      expect(styles['background-color']).toBe('rgb(248, 248, 248)')
      expect(styles.width).toBe('191px')
      expect(styles.height).toBe('40px')
      expect(styles.padding).toBe('0px 5px')
      expect(styles['font-family']).toBe('"GDS Transport", Arial, sans-serif')
      expect(styles['font-size']).toBe('16px')
      expect(styles['font-weight']).toBe('700')
      expect(styles.color).toBe('rgb(80, 90, 95)')
    }

    const getMapFilterPanelPM25Checkbox = [
      await mapsPage.getMapFilterPanelPM25Checkbox,
      await mapsPage.getMapFilterPanelPM10Checkbox,
      await mapsPage.getMapFilterPanelNO2Checkbox,
      await mapsPage.getMapFilterPanelOzoneCheckbox,
      await mapsPage.getMapFilterPanelSulphurDioxideCheckbox
    ]

    const getMapFilterPanelPM25CheckboxProperties = [
      'margin-left',
      'width',
      'height',
      'margin'
    ]

    for (const element of getMapFilterPanelPM25Checkbox) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelPM25CheckboxProperties
      )
      expect(styles['margin-left']).toBe('-10px')
      expect(styles.width).toBe('44px')
      expect(styles.height).toBe('44px')
      expect(styles.margin).toBe('0px 0px 0px -10px')
    }

    const getMapFilterPanelPM25Label = [
      await mapsPage.getMapFilterPanelPM25Label,
      await mapsPage.getMapFilterPanelPM10Label,
      await mapsPage.getMapFilterPanelNO2Label,
      await mapsPage.getMapFilterPanelOzoneLabel,
      await mapsPage.getMapFilterPanelSulphurDioxideLabel
    ]

    const getMapFilterPanelPM25LabelProperties = [
      'padding-left',
      'touch-action',
      'align-self',
      'max-width',
      'margin-bottom',
      'padding',
      'color',
      'font-size',
      'line-height',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapFilterPanelPM25Label) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelPM25LabelProperties
      )
      expect(styles['padding-left']).toBe('1px')
      expect(styles['touch-action']).toBe('manipulation')
      expect(styles['align-self']).toBe('center')
      expect(styles['max-width']).toBe('calc(100% - 74px)')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px 7px 1px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getMapFilterPanelDataSourcesDropdownLink = [
      await mapsPage.getMapFilterPanelDataSourcesDropdownLink
    ]

    const getMapFilterPanelDataSourcesDropdownLinkProperties = [
      'margin-bottom',
      'color',
      'width',
      'padding-left',
      'position',
      'font-size',
      'line-height',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapFilterPanelDataSourcesDropdownLink) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelDataSourcesDropdownLinkProperties
      )
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles.width).toBe('107.344px')
      expect(styles['padding-left']).toBe('25px')
      expect(styles.position).toBe('relative')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getMapFilterPanelDataSourceAURNText = [
      await mapsPage.getMapFilterPanelDataSourceAURNText
    ]

    const getMapFilterPanelDataSourceAURNTextProperties = [
      'border-left',
      'padding-top',
      'padding-bottom',
      'padding-left',
      'color',
      'font-size',
      'line-height',
      'font-weight',
      'font-family'
    ]

    for (const element of getMapFilterPanelDataSourceAURNText) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelDataSourceAURNTextProperties
      )
      expect(styles['border-left']).toBe('5px solid rgb(177, 180, 182)')
      expect(styles['padding-top']).toBe('15px')
      expect(styles['padding-bottom']).toBe('15px')
      expect(styles['padding-left']).toBe('20px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    await mapsPage.getMapFilterPanelOtherPollutantsButton.click()

    const getMapFilterPanelOtherPollutantsText = [
      await mapsPage.getMapFilterPanelOtherPollutantsText
    ]

    const getMapFilterPanelOtherPollutantsTextProperties = [
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'font-weight',
      'font-family',
      'color'
    ]

    for (const element of getMapFilterPanelOtherPollutantsText) {
      const styles = await common.getStyles(
        element,
        getMapFilterPanelOtherPollutantsTextProperties
      )
      expect(styles['margin-top']).toBe('10px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }
  })
})
