import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
import viewDataSourcesPage from '../../page-objects/viewDataSourcesPage.js'

describe('view data sources validation', () => {
  it('Display applicable Data Sources on create a custom dataset page - AQD-833', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    const pollutantsToCheck = [
      'Nitrogen dioxide',
      'Nitric oxide',
      'Nitrogen oxides as nitrogen dioxide',
      'Ozone',
      'Sulphur dioxide',
      'Carbon monoxide',
      'Particulate matter (PM10)',
      'Fine particulate matter (PM2.5)'
    ]
    for (const pollutant of pollutantsToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource1 =
        await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource1 =
        'Near real-time data from Defra Automatic Urban and Rural Network (AURN)'
      await expect(dataSource1).toMatch(expectedDataSource1)
    }

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getAQSROptionTitle.click()
    await common.continueButton.click()
    const AQSRdataSource =
      await customselectionPage.getDataSourcesValue.getText()
    const expectedAQSRDataSource =
      'Near real-time data from Defra Automatic Urban and Rural Network (AURN)'
    await expect(AQSRdataSource).toMatch(expectedAQSRDataSource)

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getDAQIOptionTitle.click()
    await common.continueButton.click()
    const DAQIRdataSource =
      await customselectionPage.getDataSourcesValue.getText()
    const expectedDAQIDataSource =
      'Near real-time data from Defra Automatic Urban and Rural Network (AURN)'
    await expect(DAQIRdataSource).toMatch(expectedDAQIDataSource)
  })
  it('content', async () => {
    await customselectionPage.getViewDataSourcesLink.click()
    const pageContent =
      await viewDataSourcesPage.getViewDataSourcesPageContent.getText()
    const expectedPageContent = `View data sources
Near real-time data from Defra
This data is automatically measured and published every hour.
Automatic Urban and Rural Network (AURN)
The most reliable air pollution data in the UK.
Pollutants: fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), nitric oxide (NO), nitrogen oxides as nitrogen dioxide (NOx), ozone (O3), sulphur dioxide (SO2) and carbon monoxide (CO)
Start date: 1972
Time resolution: Hourly
Published: Hourly
Instrument and method: TEOM-FDMS/BAM and gravimetric (PM2.5, PM10), chemiluminescence (NO2, NO, NOx), UV photometry (O3), UV fluorescence (SO2) and NDIR (CO)`
    await expect(pageContent).toMatch(expectedPageContent)
  })

  it('AQD-990 Remove More info... hyperlink in View Data Sources Page', async () => {
    await common.elementRemoved(
      await viewDataSourcesPage.getMoreInformationLink
    )
  })

  it('link checks', async () => {
    await common.getBackLink.click()
    const url = await browser.getUrl()
    const expectedUrl =
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/customdataset'
    await expect(url).toBe(expectedUrl)
    await customselectionPage.getViewDataSourcesLink.click()
  })

  it('styling checks', async () => {
    const DownloadYourDataHeading = [
      await viewDataSourcesPage.getViewDataSourcesHeading
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

    const h2Heading = [await viewDataSourcesPage.getH2Heading]

    const h2HeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of h2Heading) {
      const styles = await common.getStyles(element, h2HeadingProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const H3Heading = [await viewDataSourcesPage.getH3Heading]

    const h3HeadingProperties = [
      'padding-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of H3Heading) {
      const styles = await common.getStyles(element, h3HeadingProperties)
      expect(styles['padding-top']).toBe('10px')
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const PStyling = [await viewDataSourcesPage.getPStyling]

    const pStylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of PStyling) {
      const styles = await common.getStyles(element, pStylingProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getP2Styling = [await viewDataSourcesPage.getP2Styling]

    const getP2StylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getP2Styling) {
      const styles = await common.getStyles(element, getP2StylingProperties)
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getP3Styling = [await viewDataSourcesPage.getP3Styling]

    const getP3StylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getP3Styling) {
      const styles = await common.getStyles(element, getP3StylingProperties)
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
  })
})
