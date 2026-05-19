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
  it('Display applicable Data Sources for AURN Network pollutants and other networks on create a custom dataset page - AQD-833,AQD-1194', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    const pollutantsToCheck = [
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
      const expectedDataSource1 = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)`
      await expect(dataSource1).toMatch(expectedDataSource1)
    }

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getAQSROptionTitle.click()
    await common.continueButton.click()
    const AQSRdataSource =
      await customselectionPage.getDataSourcesValue.getText()
    const expectedAQSRDataSource = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
Other data from Defra
UKEAP - Rural NO2 Network`
    await expect(AQSRdataSource).toEqual(expectedAQSRDataSource)

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getDAQIOptionTitle.click()
    await common.continueButton.click()
    const DAQIRdataSource =
      await customselectionPage.getDataSourcesValue.getText()
    const expectedDAQIDataSource = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
Other data from Defra
UKEAP - Rural NO2 Network`
    await expect(DAQIRdataSource).toEqual(expectedDAQIDataSource)
  })

  it('AQD-1194, Display applicable Data Sources for AURN and UKEAP: Rural NO2 Network (Rural NO2) Network on create a custom dataset page', async () => {
    const pollutantsToCheck = ['Nitrogen dioxide']
    for (const pollutant of pollutantsToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource1 =
        await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource1 = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
Other data from Defra
UKEAP - Rural NO2 Network`
      await expect(dataSource1).toMatch(expectedDataSource1)
    }
  })

  it('link checks', async () => {
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('Nitrogen dioxide')
    await common.continueButton.click()

    await customselectionPage.getViewDataSourcesLink.click()
    const url1 = await browser.getUrl()
    await expect(url1).toContain(
      'https://www.gov.uk/government/collections/air-pollution-in-the-uk-sources-of-monitoring-data'
    )
    await browser.back()
    const url2 = await browser.getUrl()
    await expect(url2).toContain('customdataset')

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('Ozone')
    await common.continueButton.click()

    await customselectionPage.getViewDataSourcesLink.click()
    const url3 = await browser.getUrl()
    await expect(url3).toContain(
      'https://www.gov.uk/government/collections/air-pollution-in-the-uk-sources-of-monitoring-data'
    )
    await browser.back()
    const url4 = await browser.getUrl()
    await expect(url4).toContain('customdataset')

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getDAQIOptionTitle.click()
    await common.continueButton.click()

    await customselectionPage.getViewDataSourcesLink.click()
    const url5 = await browser.getUrl()
    await expect(url5).toContain(
      'https://www.gov.uk/government/collections/air-pollution-in-the-uk-sources-of-monitoring-data'
    )
    await browser.back()
    const url6 = await browser.getUrl()
    await expect(url6).toContain('customdataset')

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getAQSROptionTitle.click()
    await common.continueButton.click()

    await customselectionPage.getViewDataSourcesLink.click()
    const url7 = await browser.getUrl()
    await expect(url7).toContain(
      'https://www.gov.uk/government/collections/air-pollution-in-the-uk-sources-of-monitoring-data'
    )
    await browser.back()
    const url8 = await browser.getUrl()
    await expect(url8).toContain('customdataset')
  })
})
