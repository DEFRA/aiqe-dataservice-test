import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
import fs from 'node:fs'
import path from 'node:path'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
import addYearPage from '../../page-objects/addYearPage.js'
import addLocationPage from '../../page-objects/addLocationPage.js'
import DownloadYourDataPage from '../../page-objects/DownloadYourDataPage.js'

describe('Download Your Data page validation AQD-889', () => {
  it('content, titles and styling', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide (so2)')
    await common.continueButton.click()

    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getAnyYearOption.click()
    await addYearPage.getAnyYearInput.setValue('2025')
    await addYearPage.continueButton.click()

    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getEnglandOption.click()
    await addLocationPage.getLocationContinueButton.click()

    await customselectionPage.getContinueButton.click()

    const pageContent =
      await DownloadYourDataPage.getDownloadYourDataPageContent.getText()
    const expectedContent = `Download your data
File format and metadata
Near real-time data from Defra
Near real-time data from Defra
This data is automatically measured and published every hour.
Automatic Urban and Rural Network (AURN)
The most reliable air pollution data in the UK. Provides hourly measurements of fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), nitric oxide (NO), nitrogen oxides as nitrogen dioxide (NOx), ozone (O3), sulphur dioxide (SO2) and carbon monoxide (CO).
19 stations available
Download hourly data
(Visual only)`
    await expect(pageContent).toMatch(expectedContent)
    await DownloadYourDataPage.getFileFormatDropDownLink.click()
    await common.legalWait()
    const fileFormatInfo =
      await DownloadYourDataPage.getFileFormatInformation.getText()
    const expectedFileFormatInfo = `File format
This data will download in a long format (CSV).
Data in a long format is stacked vertically.
Metadata
These files could contain the following metadata:
name of monitoring station
site type
site ID
map coordinates
local authority
region
instrument type
inlet height`
    await expect(fileFormatInfo).toMatch(expectedFileFormatInfo)

    const DownloadYourDataHeading = [
      await DownloadYourDataPage.getDownloadYourDataHeading
    ]

    const DownloadYourDataHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of DownloadYourDataHeading) {
      const styles = await common.getStyles(
        element,
        DownloadYourDataHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getFileFormatDropDownLink = [
      await DownloadYourDataPage.getFileFormatDropDownLink
    ]

    const getFileFormatDropDownLinkProperties = [
      'color',
      'font-family',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getFileFormatDropDownLink) {
      const styles = await common.getStyles(
        element,
        getFileFormatDropDownLinkProperties
      )
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const DownloadYourDataH2Heading = [
      await DownloadYourDataPage.getSubTitlesStyles
    ]

    const DownloadYourDataH2HeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of DownloadYourDataH2Heading) {
      const styles = await common.getStyles(
        element,
        DownloadYourDataH2HeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadYourDataH3Heading = [
      await DownloadYourDataPage.getH3HeadingStyles
    ]

    const DownloadYourDataH3HeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of DownloadYourDataH3Heading) {
      const styles = await common.getStyles(
        element,
        DownloadYourDataH3HeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadYourDataParagraphStyles = [
      await DownloadYourDataPage.getParagraphStyles
    ]

    const DownloadYourDataParagraphProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of DownloadYourDataParagraphStyles) {
      const styles = await common.getStyles(
        element,
        DownloadYourDataParagraphProperties
      )
      expect(styles['margin-bottom']).toBe('25px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getNumberOfStationsAvailable = [
      await DownloadYourDataPage.getNumberOfStationsAvailable
    ]

    const getNumberOfStationsAvailableProperties = [
      'margin-bottom',
      'margin-top',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight',
      'padding',
      'background-color',
      'border-left'
    ]

    for (const element of getNumberOfStationsAvailable) {
      const styles = await common.getStyles(
        element,
        getNumberOfStationsAvailableProperties
      )
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['margin-top']).toBe('5px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles.padding).toBe('15px')
      expect(styles['background-color']).toBe('rgb(212, 250, 226)')
      expect(styles['border-left']).toBe('10px solid rgb(0, 112, 61)')
    }

    const DownloadHourlyDataButton = [
      await DownloadYourDataPage.getDownloadHourlyDataButton
    ]

    const getDownloadHourlyDataButtonProperties = [
      'font-size',
      'line-height',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadHourlyDataButton) {
      const styles = await common.getStyles(
        element,
        getDownloadHourlyDataButtonProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('0.666667px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 2.66667px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })

  it('links', async () => {
    await DownloadYourDataPage.getFileFormatDropDownLink.click()
    await common.legalWait()
    const hiddenContent = await DownloadYourDataPage.getFileFormatInformation
    await common.notDisplayed(hiddenContent)

    await common.getBackLink.click()
    await common.legalWait()
    const currentUrl = await browser.getUrl()
    await expect(currentUrl).toContain('customdataset')
  })

  it(`download data not working AQD-1070, 
    AQD-1063 defect - download pm2.5 after downloading pm10, 
    AQD-1047 defect - back button disappears after user downloads data
    AQD-1103 -  Display a download notification`, async () => {
    // download data not working AQD-1070
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('PM10')
    await common.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getScotlandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateOption.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()

    // Ensure downloads directory is clean before validating download
    const DOWNLOAD_DIR = path.resolve(process.cwd(), 'downloads')
    try {
      fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true })
    } catch {}
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })

    await DownloadYourDataPage.getDownloadHourlyDataButton.click()
    const downloadNotification = await DownloadYourDataPage.getDownloadProgress
    const downloadNotificationisDisplayed =
      await downloadNotification.isDisplayed()
    await expect(downloadNotificationisDisplayed).toBe(true)

    // Wait until a non-empty file (not .crdownload) appears in downloads
    await browser.waitUntil(
      () => {
        try {
          const files = fs
            .readdirSync(DOWNLOAD_DIR)
            .filter((f) => !f.endsWith('.crdownload'))
          if (files.length === 0) return false
          const fullPath = path.join(DOWNLOAD_DIR, files[0])
          const size = fs.statSync(fullPath).size
          return size > 0
        } catch {
          return false
        }
      },
      {
        timeout: 240000,
        interval: 500,
        timeoutMsg: 'No downloaded file detected in downloads within 240s'
      }
    )

    // Optional: basic assertion that at least one file exists
    const finalFiles = fs
      .readdirSync(DOWNLOAD_DIR)
      .filter((f) => !f.endsWith('.crdownload'))
    expect(finalFiles.length).toBeGreaterThan(0)

    // AQD-1047 defect - back button disappears after user downloads data
    await common.legalWait()
    const isBackLinkDisplayed = await common.getBackLink.isDisplayed()
    await expect(isBackLinkDisplayed).toBe(true)

    // AQD-1063 defect - automatic download for pm2.5 after downloading pm10
    await common.getBackLink.click()
    await customselectionPage.getChangePollutantLink.click()
    await addPollutantPage.getFirstAddedPollutantRemoveLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('Fine particulate matter (PM2.5)')
    await common.continueButton.click()
    await customselectionPage.getContinueButton.click()
    await common.legalWait()
    // AQD-1063: Verify download loading container is NOT displayed (no auto-download)
    const loadingContainer = await DownloadYourDataPage.getDownloadProgress
    const isDisplayed = await loadingContainer.isDisplayed()
    await expect(isDisplayed).toBe(false)
    await common.getBackLink.click()
  })

  it(`AQD-885 No Stations Available - Validation
      AQD-1292 change year error link not working`, async () => {
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getScotlandCheckbox.click()
    await addLocationPage.getNorthernIrelandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getAnyYearOption.click()
    await addYearPage.getAnyYearInput.setValue('1975')
    await addYearPage.continueButton.click()

    const errorSummaryMessage =
      await customselectionPage.getNoDataAvailableErrorSummaryMessage.getText()
    const expectedErrorSummaryMessage = `There is a problem
No monitoring stations are available for your selection. Please try:
Change year
Change location`
    await expect(errorSummaryMessage).toMatch(expectedErrorSummaryMessage)

    const changeYearErrorMessage = await common
      .errorSummaryItemByText('Change year')
      .getText()
    const changeYearErrorLink =
      await common.errorSummaryItemByText('Change year')
    const expectedChangeYearErrorMessage = 'Change year'
    await expect(changeYearErrorMessage).toMatch(expectedChangeYearErrorMessage)
    await changeYearErrorLink.click()
    const changeYearUrl = await browser.getUrl()
    await expect(changeYearUrl).toContain('year-aurn?change=true')
    await common.getBackLink.click()

    const changeLocationErrorMessage = await common
      .errorSummaryItemByText('Change location')
      .getText()
    const changeLocationErrorLink =
      await common.errorSummaryItemByText('Change location')
    const expectedChangeLocationErrorMessage = 'Change location'
    await expect(changeLocationErrorMessage).toMatch(
      expectedChangeLocationErrorMessage
    )
    await changeLocationErrorLink.click()
    const changeLocationUrl = await browser.getUrl()
    await expect(changeLocationUrl).toContain('location-aurn?change=true')
    await common.getBackLink.click()

    await customselectionPage.getContinueButton.click()
    await common.legalWait()
    const noStationsAvailabletag =
      await DownloadYourDataPage.get0StationsAvailableTag.getText()
    const expectedNoStationsAvailableContent = `0 stations available`
    await expect(noStationsAvailabletag).toBe(
      expectedNoStationsAvailableContent
    )
  })

  it('AQD-1195 - Rural NO₂ Network Download your data', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('nitrogen dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getEnglandCheckbox.click()
    await addLocationPage.getNorthernIrelandCheckbox.click()
    await addLocationPage.getScotlandCheckbox.click()
    await addLocationPage.getWalesCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateOption.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()

    await DownloadYourDataPage.getOtherDataFromDefraTab.click()
    const pageContent =
      await DownloadYourDataPage.getDownloadYourDataPageContent.getText()
    const expectedContent = `Download your data
File format and metadata
Near real-time data from Defra
Other data from Defra
Other data from Defra
Data is measured hourly, weekly or monthly depending on the network.
UKEAP - Rural NO2 Network
Monthly diffusion tube measurements of nitrogen dioxide at rural background locations.
25 stations available
Download data
(Visual only)`
    await expect(pageContent).toMatch(expectedContent)

    const isDownloadDataButtonDisplayed =
      await DownloadYourDataPage.getDownloadDataButton.isDisplayed()
    await expect(isDownloadDataButtonDisplayed).toBe(true)

    const isAvailableStationsTagDisplayed =
      await DownloadYourDataPage.getNoNAURNAvailableStationsTag.isDisplayed()
    await expect(isAvailableStationsTagDisplayed).toBe(true)

    await DownloadYourDataPage.getDownloadDataButton.click()
    const downloadNotification = await DownloadYourDataPage.getDownloadProgress
    const downloadNotificationisDisplayed =
      await downloadNotification.isDisplayed()
    await expect(downloadNotificationisDisplayed).toBe(true)

    const DOWNLOAD_DIR = path.resolve(process.cwd(), 'downloads')
    try {
      fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true })
    } catch {}
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })

    await browser.waitUntil(
      () => {
        try {
          const files = fs
            .readdirSync(DOWNLOAD_DIR)
            .filter((f) => !f.endsWith('.crdownload'))
          if (files.length === 0) return false
          const fullPath = path.join(DOWNLOAD_DIR, files[0])
          const size = fs.statSync(fullPath).size
          return size > 0
        } catch {
          return false
        }
      },
      {
        timeout: 240000,
        interval: 500,
        timeoutMsg: 'No downloaded file detected in downloads within 240s'
      }
    )

    // Optional: basic assertion that at least one file exists
    const finalFiles = fs
      .readdirSync(DOWNLOAD_DIR)
      .filter((f) => !f.endsWith('.crdownload'))
    expect(finalFiles.length).toBeGreaterThan(0)
  })

  it('Display 0 stations available for networks with 0 stations, when data is available for other networks', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('nitrogen dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getEnglandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getAnyYearRadio.click()
    await addYearPage.getAnyYearInput.setValue('1986')
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()

    const AurnAvailableStationsTag =
      await DownloadYourDataPage.getNumberOfStationsAvailable
    const AurnAvailableStationsTagText =
      await AurnAvailableStationsTag.getText()
    const expectedAurnAvailableStationsTagText = `2 stations available`
    await expect(AurnAvailableStationsTagText).toBe(
      expectedAurnAvailableStationsTagText
    )

    const AurnAvailableStationsTagcolour = [
      await DownloadYourDataPage.getNumberOfStationsAvailable
    ]

    const AurnAvailableStationsTagcolourProperties = [
      'background-color',
      'border-left',
      'color'
    ]

    for (const element of AurnAvailableStationsTagcolour) {
      const styles = await common.getStyles(
        element,
        AurnAvailableStationsTagcolourProperties
      )
      expect(styles['background-color']).toBe('rgb(212, 250, 226)')
      expect(styles['border-left']).toBe('10px solid rgb(0, 112, 61)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    await DownloadYourDataPage.getOtherDataFromDefraTab.click()
    const UKEAPRuralNO2NetworkAvailableStationsTag =
      await DownloadYourDataPage.getNoStationsAvailable
    const UKEAPRuralNO2NetworkAvailableStationsTagText =
      await UKEAPRuralNO2NetworkAvailableStationsTag.getText()
    const expectedUKEAPRuralNO2NetworkAvailableStationsTagText = `0 stations available`
    await expect(UKEAPRuralNO2NetworkAvailableStationsTagText).toBe(
      expectedUKEAPRuralNO2NetworkAvailableStationsTagText
    )

    const UKEAPRuralNO2NetworkNoAvailableStationsTagcolour = [
      await DownloadYourDataPage.getNoStationsAvailable
    ]

    const UKEAPRuralNO2NetworkNoAvailableStationsTagcolourProperties = [
      'background-color',
      'border-left',
      'color'
    ]

    for (const element of UKEAPRuralNO2NetworkNoAvailableStationsTagcolour) {
      const styles = await common.getStyles(
        element,
        UKEAPRuralNO2NetworkNoAvailableStationsTagcolourProperties
      )
      expect(styles['background-color']).toBe('rgb(249, 226, 215)')
      expect(styles['border-left']).toBe('10px solid rgb(244, 119, 56)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }
  })
})
