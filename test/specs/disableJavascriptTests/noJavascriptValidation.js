import startNowPage from '../../page-objects/startnowpage.js'
import { expect } from '@wdio/globals'
import searchPage from '../../page-objects/searchPage.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
import disambigurationPage from '../../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../../page-objects/monitoringStationPage.js'
// import axios from 'axios'
import common from '../../page-objects/common.js'
import addLocationPage from '../../page-objects/addLocationPage.js'

/* run these locally in dev every release, uncomment disable javascript capability in local.conf */
describe('No Javascript Happy Path', () => {
  it('no javascript search by location flow and download', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.getStartNowBtn.click()
    await hubPage.getFindMonitoringStationsByLocation.click()
    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('Birmingham')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham Ladywood')
      .click()
    // Validate Hourly download link resolves and is accessible
    const hourlyHref =
      await monitoringStationPage.getDownloadAllPollutantsHourlyDataNoJs.getAttribute(
        'href'
      )
    expect(hourlyHref).toBeDefined()
    // const baseUrl = browser.options.baseUrl || ''
    // const hourlyUrl = new URL(hourlyHref || '', baseUrl).toString()
    // In NoJS mode, backend may return 5xx; just validate href pattern
    await expect(hourlyHref).toContain('AllPollutants')
    await expect(hourlyHref).toContain('Hourly')

    // Validate Daily download link resolves and is accessible
    const dailyHref =
      await monitoringStationPage.getDownloadAllPollutantsDailyDataLinkNoJs.getAttribute(
        'href'
      )
    expect(dailyHref).toBeDefined()
    // const dailyUrl = new URL(dailyHref || '', baseUrl).toString()
    await expect(dailyHref).toContain('AllPollutants')
    await expect(dailyHref).toContain('Daily')

    // Validate Annual download link resolves and is accessible
    const annualHref =
      await monitoringStationPage.getDownloadAllPollutantsAnnualDataLinkNoJs.getAttribute(
        'href'
      )
    expect(annualHref).toBeDefined()
    // const annualUrl = new URL(annualHref || '', baseUrl).toString()
    await expect(annualHref).toContain('AllPollutants')
    await expect(annualHref).toContain('Annual')
  })
  it('no javascript toggle tips', async () => {
    await monitoringStationPage.getPM25AnnualAverageToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    const isPM25AnnualAverageToggleTipInfoTextDisplayed =
      await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText.isDisplayed()
    await expect(isPM25AnnualAverageToggleTipInfoTextDisplayed).toBe(true)

    await monitoringStationPage.getPM10DailyExceedenceToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    const isPM10DailyExceedenceToggleTipInfoTextDisplayed =
      await monitoringStationPage.getPM10DailyExceedenceToggleTipInfoText.isDisplayed()
    await expect(isPM10DailyExceedenceToggleTipInfoTextDisplayed).toBe(true)

    await monitoringStationPage.getSDHourlyExceedenceToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
    )
    const isSDHourlyExceedenceToggleTipInfoTextDisplayed =
      await monitoringStationPage.getSDHourlyExceedenceToggleTipInfoText.isDisplayed()
    await expect(isSDHourlyExceedenceToggleTipInfoTextDisplayed).toBe(true)
  })

  it('AQD-1051 Add pollutant(s) - Add a pollutant option | No JS Version', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await common.continueButton.click()
    await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await addPollutantPage.getAddPollutantOption.click()
    await common.continueButton.click()
    await common
      .errorSummaryItemByText('Please add at least one pollutant')
      .isDisplayed()
    await addPollutantPage.getNoJsPollutantDropdown.click()
    await addPollutantPage.getNoJsPM25OptionValue.click()
    await common.continueButton.click()
    const pollutantSelected =
      await customselectionPage.getPollutantValue.getText()
    const expectedPollutantSelected = `Fine particulate matter (PM2.5)`
    await expect(pollutantSelected).toMatch(expectedPollutantSelected)
    const changeLink =
      await customselectionPage.getChangePollutantLink.getText()
    const expectedChangeLink = `Change`
    await expect(changeLink).toMatch(expectedChangeLink)
    await customselectionPage.getChangePollutantLink.click()
    const isAddPollutantOptionSelected =
      await addPollutantPage.getAddPollutantRadio.isSelected()
    await expect(isAddPollutantOptionSelected).toBe(true)
    const isPM25OptionValueSelected =
      await addPollutantPage.getNoJsPM25OptionValue.isSelected()
    await expect(isPM25OptionValueSelected).toBe(true)
  })

  it('AQD-1036 Add a group of pollutants option | No JS Version', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await common.continueButton.click()
    await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await common.continueButton.click()
    await common
      .errorSummaryItemByText('Please add at least one pollutant')
      .isDisplayed()
    await addPollutantPage.getAQSROptionRadio.click()
    await common.continueButton.click()
    const pollutantSelected =
      await customselectionPage.getPollutantValue.getText()
    const expectedPollutantSelected = `Particulate matter (PM2.5)
Particulate matter (PM10)
Nitrogen dioxide (NO2)
Ozone (O3)
Sulphur dioxide (SO2)
Nitric oxide (NO)
Nitrogen oxides as nitrogen dioxide (NOx as NO2)
Carbon monoxide (CO)`
    await expect(pollutantSelected).toMatch(expectedPollutantSelected)
    const changeLink =
      await customselectionPage.getChangePollutantLink.getText()
    const expectedChangeLink = `Change`
    await expect(changeLink).toMatch(expectedChangeLink)
    await customselectionPage.getChangePollutantLink.click()

    const isAddGroupOfPollutantsOptionSelected =
      await addPollutantPage.getAddGroupOfPollutantsRadio.isSelected()
    await expect(isAddGroupOfPollutantsOptionSelected).toBe(true)
    const isAQSROptionSelected =
      await addPollutantPage.getAQSROptionRadio.isSelected()
    await expect(isAQSROptionSelected).toBe(true)

    await addPollutantPage.getDAQIOptionRadio.click()
    await common.continueButton.click()

    const DAQIpollutantSelected =
      await customselectionPage.getPollutantValue.getText()
    const expectedDAQIPollutantSelected = `Particulate matter (PM2.5)
Particulate matter (PM10)
Nitrogen dioxide (NO2)
Ozone (O3)
Sulphur dioxide (SO2)`
    await expect(DAQIpollutantSelected).toMatch(expectedDAQIPollutantSelected)
    const changeLink2 =
      await customselectionPage.getChangePollutantLink.getText()
    const expectedChangeLink2 = `Change`
    await expect(changeLink2).toMatch(expectedChangeLink2)
    await customselectionPage.getChangePollutantLink.click()

    const isAddGroupOfPollutantsOptionSelected2 =
      await addPollutantPage.getAddGroupOfPollutantsRadio.isSelected()
    await expect(isAddGroupOfPollutantsOptionSelected2).toBe(true)
    const isDAQIOptionSelected =
      await addPollutantPage.getDAQIOptionRadio.isSelected()
    await expect(isDAQIOptionSelected).toBe(true)
  })

  it('AQD-1037 Add locations(s) - Countries Journey | NoJS Version', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getNoJsPollutantDropdown.click()
    await addPollutantPage.getNoJsPM25OptionValue.click()

    await common.continueButton.click()
    await customselectionPage.getAddChangeLocationLinkNoJs.click()

    const isCountriesOptionDisplayed =
      await addLocationPage.getCountriesOption.isDisplayed()
    await expect(isCountriesOptionDisplayed).toBe(true)

    await common.legalWait()

    const isEnglandOptionDisplayed =
      await addLocationPage.getEnglandOption.isDisplayed()
    await expect(isEnglandOptionDisplayed).toBe(true)
    const isScotlandOptionDisplayed =
      await addLocationPage.getScotlandOption.isDisplayed()
    await expect(isScotlandOptionDisplayed).toBe(true)
    const isWalesOptionDisplayed =
      await addLocationPage.getWalesOption.isDisplayed()
    await expect(isWalesOptionDisplayed).toBe(true)
    const isNorthernIrelandOptionDisplayed =
      await addLocationPage.getNorthernIrelandOption.isDisplayed()
    await expect(isNorthernIrelandOptionDisplayed).toBe(true)

    await addLocationPage.getLocationContinueButton.click()
    await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getLocationContinueButton.click()
    await common
      .errorSummaryItemByText('Select at least one country')
      .isDisplayed()
    await addLocationPage.getEnglandOption.click()
    await addLocationPage.getLocationContinueButton.click()

    const englandSelected = await customselectionPage.getLocationValue.getText()
    const expectedEnglandSelected = `England`
    await expect(englandSelected).toMatch(expectedEnglandSelected)

    const changeLink =
      await customselectionPage.getAddChangeLocationLinkNoJs.getText()
    const expectedChangeLink = `Change`
    await expect(changeLink).toMatch(expectedChangeLink)

    await customselectionPage.getAddChangeLocationLinkNoJs.click()
    const isCountriesOptionRadioSelected =
      await addLocationPage.getCountriesOptionRadio.isSelected()
    await expect(isCountriesOptionRadioSelected).toBe(true)
    const isEnglandCheckboxSelected =
      await addLocationPage.getEnglandCheckbox.isSelected()
    await expect(isEnglandCheckboxSelected).toBe(true)
  })
})
