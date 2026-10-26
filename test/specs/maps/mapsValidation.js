// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import mapsPage from '../../page-objects/mapsPage.js'

describe('maps Validation', () => {
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
    const expectedContent = `Stockton-on-Tees A1305 Roadside Active
Pollutants: NO₂, PM2.5
DAQI (observed): 1 (low)
Local authority: Stockton-on-Tees
Site type: Traffic Urban
Start date: 1 May 2015
View full station summary`
    await expect(panelContent).toMatch(expectedContent)
  })

  it('information panel styling checks, AQD-1523', async () => {
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
  })
})
