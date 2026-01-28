import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
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
    await addYearPage.getYearToDateOption.click()
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
This data is automatically measured and published every hour.
Automatic Urban and Rural Network (AURN)
The most reliable air pollution data in the UK. Provides hourly measurements of fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), nitric oxide (NO), nitrogen oxides as nitrogen dioxide (NOx), ozone (O3), sulphur dioxide (SO2) and carbon monoxide (CO).
15 stations available
Download hourly data
(Visual only)
Save your search
Bookmark this URL to save your selections for next time.
https://get-air-pollution-data.defra.gov.uk/data-selector/download-data?saved=url`
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

  /* it('AQD-885 No Stations Available - Validation', async () => {
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getEnglandCheckbox.click()
    await addLocationPage.getNorthernIrelandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getAnyYearOption.click()
    await addYearPage.getAnyYearInput.setValue('1975')
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()
    await common.legalWait()
    

  
  }) */
})
