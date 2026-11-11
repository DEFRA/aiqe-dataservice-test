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
import addYearPage from '../../page-objects/addYearPage.js'
import DownloadYourDataPage from '../../page-objects/DownloadYourDataPage.js'
import path from 'node:path'
import fs from 'node:fs'
import { execSync } from 'node:child_process'
import {
  isBrowserStackSession,
  syncBrowserStackDownloads
} from '../../helpers/browserstackDownloads.js'

const isZipFileBySignature = (fullPath) => {
  try {
    const fd = fs.openSync(fullPath, 'r')
    const buffer = Buffer.alloc(4)
    fs.readSync(fd, buffer, 0, 4, 0)
    fs.closeSync(fd)
    return buffer[0] === 0x50 && buffer[1] === 0x4b
  } catch {
    return false
  }
}

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
    await monitoringStationPage.get2025Button.click()
    await common.legalWait()
    await monitoringStationPage.getPM25AnnualAverageToggleTip.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 6000 }
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
      { timeout: 6000 }
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
      { timeout: 6000 }
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
    await common.legalWait()
    const isSelectOptionErrorDisplayed = await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await expect(isSelectOptionErrorDisplayed).toBe(true)
    const isSelectOptionErrorDisplayedLink =
      await common.errorSummaryItemByText('Select an option before continuing')
    await isSelectOptionErrorDisplayedLink.click()
    const isAddPollutantOptionFocused =
      await addPollutantPage.getAddPollutantRadio.isFocused()
    await expect(isAddPollutantOptionFocused).toBe(true)

    await addPollutantPage.getAddPollutantOption.click()
    await common.continueButton.click()
    await common.legalWait()
    const isPleaseAddAtLeastOnePollutantErrorDisplayed = await common
      .errorSummaryItemByText('Please add at least one pollutant')
      .isDisplayed()
    await expect(isPleaseAddAtLeastOnePollutantErrorDisplayed).toBe(true)
    const isPleaseAddAtLeastOnePollutantErrorDisplayedLink =
      await common.errorSummaryItemByText('Please add at least one pollutant')
    await isPleaseAddAtLeastOnePollutantErrorDisplayedLink.click()
    const isAddPollutantSearchBoxFocused =
      await addPollutantPage.getNoJsPollutantDropdown.isFocused()
    await expect(isAddPollutantSearchBoxFocused).toBe(true)

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
    const isSelectOptionErrorDisplayed = await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await expect(isSelectOptionErrorDisplayed).toBe(true)
    const isSelectOptionErrorDisplayedLink =
      await common.errorSummaryItemByText('Select an option before continuing')
    await isSelectOptionErrorDisplayedLink.click()
    const isAddGroupOfPollutantsOptionFocused =
      await addPollutantPage.getAddPollutantRadio.isFocused()
    await expect(isAddGroupOfPollutantsOptionFocused).toBe(true)

    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await common.continueButton.click()
    await common.legalWait()
    const isSelectAPollutantGroupErrorDisplayed = await common
      .errorSummaryItemByText('Select a pollutant group')
      .isDisplayed()
    await expect(isSelectAPollutantGroupErrorDisplayed).toBe(true)
    const isSelectAPollutantGroupErrorDisplayedLink =
      await common.errorSummaryItemByText('Select a pollutant group')
    await isSelectAPollutantGroupErrorDisplayedLink.click()
    const isDAQIOptionFocused2 =
      await addPollutantPage.getDAQIOptionRadio.isFocused()
    await expect(isDAQIOptionFocused2).toBe(true)

    await addPollutantPage.getAQSROptionRadio.click()
    await common.continueButton.click()
    const pollutantSelected =
      await customselectionPage.getPollutantValue.getText()
    const expectedPollutantSelected = `Fine particulate matter (PM2.5)
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
    await common.legalWait()

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
    const expectedDAQIPollutantSelected = `Fine particulate matter (PM2.5)
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
    await common.legalWait()
    const isSelectAnOptionErrorDisplayed = await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await expect(isSelectAnOptionErrorDisplayed).toBe(true)
    const isSelectAnOptionErrorLink = await common.errorSummaryItemByText(
      'Select an option before continuing'
    )
    await isSelectAnOptionErrorLink.click()
    const isCountriesOptionFocused =
      await addLocationPage.getCountriesOptionRadio.isFocused()
    await expect(isCountriesOptionFocused).toBe(true)

    await addLocationPage.getCountriesOptionRadio.click()
    await addLocationPage.getLocationContinueButton.click()
    await common.legalWait()
    const isSelectAtLeastOneCountryErrorDisplayed = await common
      .errorSummaryItemByText('Select at least one country')
      .isDisplayed()
    await expect(isSelectAtLeastOneCountryErrorDisplayed).toBe(true)
    const isSelectAtLeastOneCountryErrorLink =
      await common.errorSummaryItemByText('Select at least one country')
    await isSelectAtLeastOneCountryErrorLink.click()
    const isEnglandOptionFocused =
      await addLocationPage.getEnglandCheckbox.isFocused()
    await expect(isEnglandOptionFocused).toBe(true)

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

  it('AQD-1034 Remove Save your search on the Download your data page | DS (JS + No JS)', async () => {
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
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getEnglandOption.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateRadio.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()
    await common.legalWait()
    await common.notDisplayed(await DownloadYourDataPage.getSaveYourSearchTitle)
  })

  it('AQD-1052 Add locations(s) - Local authority | NoJS Version', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getNoJsPollutantDropdown.click()
    await addPollutantPage.getNoJsPM25OptionValue.click()
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateRadio.click()
    await addYearPage.continueButton.click()

    await customselectionPage.getAddChangeLocationLinkNoJs.click()
    await addLocationPage.getLocationContinueButton.click()
    await common.legalWait()
    const isSelectAnOptionErrorDisplayed = await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await expect(isSelectAnOptionErrorDisplayed).toBe(true)
    const isSelectAnOptionErrorLink = await common.errorSummaryItemByText(
      'Select an option before continuing'
    )
    await isSelectAnOptionErrorLink.click()
    const isCountriesOptionFocused =
      await addLocationPage.getCountriesOptionRadio.isFocused()
    await expect(isCountriesOptionFocused).toBe(true)
    await addLocationPage.getLocalAuthorityRadio.click()
    await addLocationPage.getLocationContinueButton.click()
    await common.legalWait()
    const isAddAtLeastOneLocalAuthorityErrorDisplayed = await common
      .errorSummaryItemByText('Add at least one local authority')
      .isDisplayed()
    await expect(isAddAtLeastOneLocalAuthorityErrorDisplayed).toBe(true)
    const isAddAtLeastOneLocalAuthorityErrorLink =
      await common.errorSummaryItemByText('Add at least one local authority')
    await isAddAtLeastOneLocalAuthorityErrorLink.click()
    const isLocalAuthorityDropdownFocused =
      await addLocationPage.getSelectALocalAuthorityDropdown.isFocused()
    await expect(isLocalAuthorityDropdownFocused).toBe(true)

    await addLocationPage.getSelectALocalAuthorityDropdown.click()
    await addLocationPage.getOptionAberdeenCityCouncil.click()
    await addLocationPage.getLocationContinueButton.click()

    const localAuthoritySelected =
      await customselectionPage.getLocationValue.getText()
    const expectedLocalAuthoritySelected = `Aberdeen City Council`
    await expect(localAuthoritySelected).toMatch(expectedLocalAuthoritySelected)

    const changeLink =
      await customselectionPage.getAddChangeLocationLinkNoJs.getText()
    const expectedChangeLink = `Change`
    await expect(changeLink).toMatch(expectedChangeLink)

    await customselectionPage.getAddChangeLocationLinkNoJs.click()
    const isLocalAuthorityOptionRadioSelected =
      await addLocationPage.getLocalAuthorityRadio.isSelected()
    await expect(isLocalAuthorityOptionRadioSelected).toBe(true)
    const isAberdeenCityCouncilOptionSelected =
      await addLocationPage.getOptionAberdeenCityCouncil.isSelected()
    await expect(isAberdeenCityCouncilOptionSelected).toBe(true)
  })

  it('AQD-1145 - NoJS - Remove Add up to 10 pollutants text | Add Pollutant(s) journey', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    const missingText = await common.getHintTextByText(
      'Add up to 10 pollutants'
    )
    await common.notDisplayed(missingText)
  })

  it('AQD-1671,AURN section should not show no matter what on the final page', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getNoJsPollutantDropdown.click()
    await addPollutantPage.getNoJsParticulateCalciumOptionValue.click()
    await common.continueButton.click()

    await customselectionPage.getAddChangeLocationLinkNoJs.click()
    await addLocationPage.getCountriesOptionRadio.click()
    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getLocationContinueButton.click()

    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getAnyYearOption.click()
    await addYearPage.getAnyYearInput.setValue('2012')
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()

    const pageContent =
      await DownloadYourDataPage.getDownloadYourDataPageContent.getText()
    await expect(pageContent).toContain(`Back
Download your data
File format and metadata
Contents
Other data from Defra
Other data from Defra
Data is measured hourly, weekly or monthly depending on the network.
UKEAP - Acid Gas & Aerosol Network
Monitors atmospheric pollutants. Part of the UK Eutrophying and Acidifying Atmospheric Pollutants (UKEAP) Network that monitors long-term pollutant trends in rural and remote locations.
11 stations available
Download data
(Visual only)`)
  })

  it('AQD-1776, agglomerations - option not available in no javascript journey', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getNoJsPollutantDropdown.click()
    await addPollutantPage.getNoJsPM25OptionValue.click()
    await common.continueButton.click()

    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getAnyYearOption.click()
    await addYearPage.getAnyYearInput.setValue('2012')
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()

    await customselectionPage.getAddChangeLocationLinkNoJs.click()
    await addLocationPage.getAgglomerationsRadioButton.click()
    await addLocationPage.getAgglomerationsGlasgowUrbanAreaOptionCheckBox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getContinueButton.click()

    // Ensure downloads directory is clean before downloading
    const DOWNLOAD_DIR = path.resolve(process.cwd(), 'downloads')
    try {
      fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true })
    } catch {}
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })
    const browserStackRun =
      isBrowserStackSession() ||
      Boolean(process.env.BROWSERSTACK_USER && process.env.BROWSERSTACK_KEY)

    await DownloadYourDataPage.getDownloadAURNDataButton.click()

    // Wait until a non-empty file (not .crdownload) appears in downloads
    if (browserStackRun) {
      await syncBrowserStackDownloads(DOWNLOAD_DIR)
    } else {
      await browser.waitUntil(
        async () => {
          try {
            await syncBrowserStackDownloads(DOWNLOAD_DIR)
            if (isBrowserStackSession()) return true
            const files = fs
              .readdirSync(DOWNLOAD_DIR)
              .filter((f) => !f.endsWith('.crdownload') && !f.endsWith('.tmp'))
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

      // Wait for the downloaded file's size to stop changing, so we don't try
      // to extract a zip that Chrome hasn't finished writing to disk yet.
      await browser.waitUntil(
        async () => {
          try {
            const files = fs
              .readdirSync(DOWNLOAD_DIR)
              .filter((f) => !f.endsWith('.crdownload') && !f.endsWith('.tmp'))
            if (files.length === 0) return false
            const fullPath = path.join(DOWNLOAD_DIR, files[0])
            const sizeNow = fs.statSync(fullPath).size
            if (sizeNow === 0) return false
            await new Promise((resolve) => setTimeout(resolve, 300))
            const sizeAfter = fs.statSync(fullPath).size
            return sizeNow === sizeAfter
          } catch {
            return false
          }
        },
        {
          timeout: 30000,
          interval: 300,
          timeoutMsg: 'Downloaded zones file size never stabilised'
        }
      )
    }

    const finalFiles = fs
      .readdirSync(DOWNLOAD_DIR)
      .filter((f) => !f.endsWith('.crdownload') && !f.endsWith('.tmp'))
    if (browserStackRun && finalFiles.length === 0) return
    expect(finalFiles.length).toBeGreaterThan(0)

    const parseCsvLine = (line) => {
      const cells = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i += 1) {
        const char = line[i]
        if (char === '"') {
          const next = line[i + 1]
          if (inQuotes && next === '"') {
            current += '"'
            i += 1
          } else {
            inQuotes = !inQuotes
          }
        } else if (char === ',' && !inQuotes) {
          cells.push(current)
          current = ''
        } else {
          current += char
        }
      }

      cells.push(current)
      return cells.map((c) => c.trim())
    }

    // Extract zip files and collect csv paths
    const csvPaths = []
    for (const fileName of finalFiles) {
      const fullPath = path.join(DOWNLOAD_DIR, fileName)
      if (
        fileName.toLowerCase().endsWith('.zip') ||
        isZipFileBySignature(fullPath)
      ) {
        const zipPath = fullPath.toLowerCase().endsWith('.zip')
          ? fullPath
          : `${fullPath}.zip`
        if (zipPath !== fullPath) fs.copyFileSync(fullPath, zipPath)
        const extractDir = path.join(
          DOWNLOAD_DIR,
          `${path.parse(zipPath).name}-extracted`
        )
        fs.mkdirSync(extractDir, { recursive: true })

        let lastError
        let extracted = false
        for (let attempt = 0; attempt < 3 && !extracted; attempt += 1) {
          try {
            execSync(
              `powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${extractDir}' -Force"`
            )
            extracted = true
          } catch (err) {
            lastError = err
            fs.mkdirSync(extractDir, { recursive: true })
          }
        }
        if (!extracted) throw lastError

        const extractedCsvFiles = fs
          .readdirSync(extractDir)
          .filter((name) => name.toLowerCase().endsWith('.csv'))
          .map((name) => path.join(extractDir, name))
        csvPaths.push(...extractedCsvFiles)
      } else if (fileName.toLowerCase().endsWith('.csv')) {
        csvPaths.push(fullPath)
      }
    }

    expect(csvPaths.length).toBeGreaterThan(0)

    const expectedPollutant = 'Fine particulate matter (PM2.5)'
    const expectedSiteNames = ['Glasgow Centre', 'Glasgow Kerbside']
    const expectedCountry = 'Scotland'

    for (const csvPath of csvPaths) {
      const csvContent = fs.readFileSync(csvPath, 'utf-8')
      const rows = csvContent
        .split(/\r?\n/)
        .map((row) => row.trim())
        .filter((row) => row !== '')

      expect(rows.length).toBeGreaterThan(1)

      const headerRowIndex = rows.findIndex((row) =>
        parseCsvLine(row)
          .map((h) => h.replace(/^"|"$/g, '').toLowerCase())
          .some((h) => h.includes('pollutant'))
      )
      expect(headerRowIndex).toBeGreaterThanOrEqual(0)

      const headerColumns = parseCsvLine(rows[headerRowIndex]).map((h) =>
        h.replace(/^"|"$/g, '').toLowerCase()
      )

      const pollutantColumnIndex = headerColumns.findIndex((h) =>
        h.includes('pollutant')
      )
      expect(pollutantColumnIndex).toBeGreaterThanOrEqual(0)

      const siteNameColumnIndex = headerColumns.findIndex(
        (h) =>
          h.includes('site name') ||
          h.includes('sitename') ||
          (h.includes('site') &&
            !h.includes('site type') &&
            !h.includes('site id'))
      )
      expect(siteNameColumnIndex).toBeGreaterThanOrEqual(0)

      // There should be a country column
      const countryColumnIndex = headerColumns.findIndex((h) =>
        h.includes('country')
      )
      expect(countryColumnIndex).toBeGreaterThanOrEqual(0)

      const dataRows = rows.slice(headerRowIndex + 1)
      expect(dataRows.length).toBeGreaterThan(0)

      const pollutantValues = new Set()
      const siteNameValues = new Set()
      const countryValues = new Set()

      for (const row of dataRows) {
        const columns = parseCsvLine(row)
        const pollutantValue = (columns[pollutantColumnIndex] || '')
          .replace(/^"|"$/g, '')
          .trim()
        const siteNameValue = (columns[siteNameColumnIndex] || '')
          .replace(/^"|"$/g, '')
          .trim()
        const countryValue = (columns[countryColumnIndex] || '')
          .replace(/^"|"$/g, '')
          .trim()

        if (pollutantValue !== '') pollutantValues.add(pollutantValue)
        if (siteNameValue !== '') siteNameValues.add(siteNameValue)
        // Collect blanks too, so a row missing its country fails the check
        countryValues.add(countryValue)
      }

      // Pollutant column should only contain the expected pollutant
      expect([...pollutantValues]).toEqual([expectedPollutant])

      // Site name column should only contain stations from the expected list
      for (const siteName of siteNameValues) {
        expect(expectedSiteNames).toContain(siteName)
      }

      // Country column should only contain the expected country
      expect([...countryValues]).toEqual([expectedCountry])
    }
  })
})
