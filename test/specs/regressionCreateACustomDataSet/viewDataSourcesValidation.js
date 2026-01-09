import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'

describe('view data sources validation', () => {
  it('Display applicable Data Sources - AQD-833', async () => {
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
  // page tests

  it('content and titles - ', async () => {})

  it('link checks', async () => {})

  it('styling checks', async () => {})
})
