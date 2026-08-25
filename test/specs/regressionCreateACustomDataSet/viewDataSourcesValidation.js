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

  it('data source for Automatic Urban and Rural Network (AURN) and UKEAP - Acid Gas & Aerosol Network on create a custom dataset page', async () => {
    const pollutantsToCheck = ['sulphur dioxide']
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
UKEAP - Acid Gas & Aerosol Network`
      await expect(dataSource1).toMatch(expectedDataSource1)
    }
  })

  it('Display applicable Data Sources for AURN Network, UKEAP - Rural NO2 Network and UKEAP - Acid Gas & Aerosol Network', async () => {
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
UKEAP - Rural NO2 Network
UKEAP - Acid Gas & Aerosol Network`
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
UKEAP - Rural NO2 Network
UKEAP - Acid Gas & Aerosol Network`
    await expect(DAQIRdataSource).toEqual(expectedDAQIDataSource)
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

  it('add polltants for UKEAP - Precip-Net and Display applicable Data Sources AQD-1373', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    const PrecipNetpollutantsToCheck = [
      'Calcium in precipitation',
      'Chloride in precipitation',
      'Potassium in precipitation',
      'Magnesium in precipitation',
      'Sodium in precipitation',
      'Phosphate as P in precipitation',
      'Nitrate as N in precipitation',
      'Ammonium as N in precipitation',
      'Sulphate as S in precipitation',
      'Non-marine sulphate as S in precipitation',
      'Acidity in precipitation',
      'Conductivity',
      'pH in precipitation',
      'Rainfall'
      // 'Sulphur dioxide as S',
      // 'Strong acid in precipitation'
    ]
    for (const pollutant of PrecipNetpollutantsToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource1 =
        await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource1 = `Other data from Defra
UKEAP - Precip-Net`
      await expect(dataSource1).toMatch(expectedDataSource1)
    }
  })

  it('add UKEAP: National Ammonia Monitoring Network and Display applicable Data Sources AQD-1382', async () => {
    await browser.url('')
    await browser.deleteCookies()
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    const NationalAmmoniaPollutantsToCheck = [
      'Particulate ammonium (NH4)',
      'gaseous ammonia (active)',
      'gaseous ammonia (passive)',
      'gaseous ammonia (diffusion tube)'
    ]
    for (const pollutant of NationalAmmoniaPollutantsToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource = await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource = `UKEAP - National Ammonia Monitoring Network`
      await expect(dataSource).toMatch(expectedDataSource)
    }
  })

  it('add polltants for Non-Automatic Hydrocarbon Network and Display applicable Data Sources AQD-1385', async () => {
    await browser.url('')
    await browser.deleteCookies()
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    const NonAutomaticHydrocarbonNetworkPollutantsToCheck = ['Benzene (C6H6)']
    for (const pollutant of NonAutomaticHydrocarbonNetworkPollutantsToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource = await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource = `Non-Automatic Hydrocarbon Network`
      await expect(dataSource).toMatch(expectedDataSource)
    }
  })

  it('add polltants for PAH Andersen Network and Display applicable Data Sources AQD-1426', async function () {
    this.timeout(300000) // 5 minutes - large pollutant list (42 items)
    await browser.url('')
    await browser.deleteCookies()
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    const PAHAndersenToCheck = [
      'Dibenzo(ah)anthracene (DBAhA)',
      'Dibenzo(ac)anthracene (DBAcA)',
      'Benzo(k)fluoranthene (BkF)',
      'Benzo(j)fluoranthene (BjF)',
      'Benzo(b)fluoranthene (BbF)',
      'Benzo(a)pyrene (BaP)',
      'Benzo(a)anthracene (BaA)',
      'Benzo(b+j)fluoranthene (B(b+j)F)',
      'Benzo(k)fluoranthene (BkF)',
      'Indeno(1,2,3-cd)pyrene (IP)',
      'Dibenzo(ah+ac)anthracene (DBA(ah+ac)A)',
      '1-Methyl anthracene (1-MeA)',
      '1-Methyl Naphthalene (1-MeNAPH)',
      '1-Methyl phenanthrene (1-MePHE)',
      '2-Methyl anthracene (2-MeA)',
      '2-Methyl Naphthalene (2-MeNAPH)',
      '2-Methyl phenanthrene (2-MePHE)',
      '4.5-Methylene phenanthrene (METH-PHE)',
      '5-Methyl Chrysene (5-MeCHR)',
      '9-Methyl anthracene (9-MeA)',
      'Acenaphthene (ACE)',
      'Acenaphthylene (ACY)',
      'Anthanthrene (ANTHT)',
      'Anthracene (ANT)',
      'Benzo(b)naphtho (2,1-d)thiophene(BNT)',
      'Benzo(c)phenanthrene (BCP)',
      'Benzo(e)pyrene (BeP)',
      'Benzo(ghi)perylene (BghiP)',
      'Biphenyl (BP)',
      'Cholanthrene (CHOL)',
      'Chrysene (CHR)',
      'Coronene (COR)',
      'Cyclopenta(c,d)pyrene (CPP)',
      'Dibenzo(al)pyrene (DBalP)',
      'Dibenzo(ae)pyrene (DBaeP)',
      'Dibenzo(ai)pyrene (DBaiP)',
      'Dibenzo(ah)pyrene (DBAhP)',
      'Fluoranthene (FLA)',
      'Fluorene (FLU)',
      'Perylene (PER)',
      'Phenanthrene (PHE)',
      'Pyrene (PYR)',
      'Retene (RET)'
    ]
    for (const pollutant of PAHAndersenToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource = await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource = `PAH Andersen
PAH Deposition`
      await expect(dataSource).toMatch(expectedDataSource)
    }
  })
})
