import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
import addLocationPage from '../../page-objects/addLocationPage.js'
import addYearPage from '../../page-objects/addYearPage.js'
import DownloadYourDataPage from '../../page-objects/DownloadYourDataPage.js'
import requestDataPage from '../../page-objects/requestDataPage.js'
import downloadRequestedDataPage from '../../page-objects/downloadRequestedDataPage.js'
import errorPage from '../../page-objects/errorPage.js'

describe('request data flow', () => {
  it('AQD-982 defect - request data flow and page', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getRangeOfYearsRadio.click()
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2018')
    await addYearPage.getRangeOfYearsEndYearInput.setValue('2020')
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getEnglandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getContinueButton.click()
    await DownloadYourDataPage.getRequestDataLink.click()
    const url = await browser.getUrl()
    expect(url).toContain('emailrequest/AURN')

    const requestDataContent =
      await requestDataPage.getDownloadYourDataPageContent.getText()
    expect(requestDataContent).toContain(`Request data
Enter your email address
We’ll only send you the air pollution data you requested
Continue`)

    const getDownloadYourDataHeading = [
      await requestDataPage.getDownloadYourDataHeading
    ]

    const getDownloadYourDataHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getDownloadYourDataHeading) {
      const styles = await common.getStyles(
        element,
        getDownloadYourDataHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getEnterEmailAddressText = [
      await requestDataPage.getEnterEmailAddressText
    ]

    const getEnterEmailAddressTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getEnterEmailAddressText) {
      const styles = await common.getStyles(
        element,
        getEnterEmailAddressTextProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('5px')
    }

    const getHintText = [await requestDataPage.getHintText]

    const getHintTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getHintText) {
      const styles = await common.getStyles(element, getHintTextProperties)
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('15px')
    }
    await common.getBackLink.click()
    const DownloadYourDataPageUrl = await browser.getUrl()
    expect(DownloadYourDataPageUrl).toContain('download_dataselector')
  })
  it('AQD-1229 - Update Error Content | Request Data - Continuing without entering an Email Address', async () => {
    await DownloadYourDataPage.getRequestDataLink.click()
    await requestDataPage.getRequestDataContinueButton.click()
    await common.legalWait()

    const noInvalidEmailErrorDisplayed = await common
      .errorSummaryItemByText('Enter an email address')
      .isDisplayed()
    await expect(noInvalidEmailErrorDisplayed).toBe(true)
    const noInvalidEmailErrorDisplayedLink =
      await common.errorSummaryItemByText('Enter an email address')
    await noInvalidEmailErrorDisplayedLink.click()
    const isEmailInputFocused = await requestDataPage.getEmailInput.isFocused()
    await expect(isEmailInputFocused).toBe(true)
  })

  it('AQD-1230 - Request Data - Entering an invalid Email Address', async () => {
    await requestDataPage.getEmailInput.setValue('invalid-email')
    await requestDataPage.getRequestDataContinueButton.click()
    await common.legalWait()

    const isInvalidEmailErrorDisplayed = await common
      .errorSummaryItemByText('Enter a valid email address')
      .isDisplayed()
    await expect(isInvalidEmailErrorDisplayed).toBe(true)
    const isInvalidEmailErrorDisplayedLink =
      await common.errorSummaryItemByText('Enter a valid email address')
    await isInvalidEmailErrorDisplayedLink.click()
    const isEmailInputFocused = await requestDataPage.getEmailInput.isFocused()
    await expect(isEmailInputFocused).toBe(true)
  })

  it('AQD-1173 - Content Change | Your link has expired (Data Selector)', async () => {
    await browser.url(
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/download_emailreq/2453edb3556c472a97fcdd0d01713e19/925224.5492'
    )
    const ExpiredRequestDataPageContent =
      await downloadRequestedDataPage.getLinkExpiredPageContent.getText()
    expect(ExpiredRequestDataPageContent).toContain(`Your link has expired
The download link had expired. Download links expire after 48 hours.
To request another download, go to Get air pollution data.`)
  })

  it('AQD-1233 - Rural NO₂ Network | Download your data Page - Request Data via Email (one file for multiple years)', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('nitrogen dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getRangeOfYearsRadio.click()
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2021')
    await addYearPage.getRangeOfYearsEndYearInput.setValue('2025')
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getContinueButton.click()
    await DownloadYourDataPage.getOtherDataFromDefraTab.click()
    await DownloadYourDataPage.getOtherDataRequestDataLink.click()
    const url = await browser.getUrl()
    expect(url).toContain('emailrequest')

    const requestDataContent =
      await requestDataPage.getDownloadYourDataPageContent.getText()
    expect(requestDataContent).toContain(`Request data
Enter your email address
We’ll only send you the air pollution data you requested
Continue`)

    const getDownloadYourDataHeading = [
      await requestDataPage.getDownloadYourDataHeading
    ]

    const getDownloadYourDataHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getDownloadYourDataHeading) {
      const styles = await common.getStyles(
        element,
        getDownloadYourDataHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getEnterEmailAddressText = [
      await requestDataPage.getEnterEmailAddressText
    ]

    const getEnterEmailAddressTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getEnterEmailAddressText) {
      const styles = await common.getStyles(
        element,
        getEnterEmailAddressTextProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('5px')
    }

    const getHintText = [await requestDataPage.getHintText]

    const getHintTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getHintText) {
      const styles = await common.getStyles(element, getHintTextProperties)
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('15px')
    }
    await common.getBackLink.click()
    const DownloadYourDataPageUrl = await browser.getUrl()
    expect(DownloadYourDataPageUrl).toContain('download_dataselector')

    await DownloadYourDataPage.getOtherDataFromDefraTab.click()
    await common.legalWait()
    await DownloadYourDataPage.getOtherDataRequestDataLink.scrollIntoView()
    await DownloadYourDataPage.getOtherDataRequestDataLink.click()
    await requestDataPage.getRequestDataContinueButton.click()
    await common.legalWait()

    const noEmailErrorDisplayed = await common
      .errorSummaryItemByText('Enter an email address')
      .isDisplayed()
    await expect(noEmailErrorDisplayed).toBe(true)
    const noEmailErrorDisplayedLink = await common.errorSummaryItemByText(
      'Enter an email address'
    )
    await noEmailErrorDisplayedLink.click()
    const isEmailInputFocused = await requestDataPage.getEmailInput.isFocused()
    await expect(isEmailInputFocused).toBe(true)

    await requestDataPage.getEmailInput.setValue('invalid-email')
    await requestDataPage.getRequestDataContinueButton.click()
    await common.legalWait()

    const isInvalidEmailErrorDisplayed = await common
      .errorSummaryItemByText('Enter a valid email address')
      .isDisplayed()
    await expect(isInvalidEmailErrorDisplayed).toBe(true)
    const isInvalidEmailErrorDisplayedLink =
      await common.errorSummaryItemByText('Enter a valid email address')
    await isInvalidEmailErrorDisplayedLink.click()
    const isEmailInputFocused2 = await requestDataPage.getEmailInput.isFocused()
    await expect(isEmailInputFocused2).toBe(true)
  })

  it('AQD-1288 - wrong error page showing when download errors', async () => {
    await browser.url(
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/download_emailreq/00459af0fc574d9da6fjfjf8f8fcc649502d34b21/1778767984297'
    )
    const url = await browser.getUrl()
    expect(url).toContain(
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/download_emailreq/00459af0fc574d9da6fjfjf8f8fcc649502d34b21/1778767984297'
    )
    const dowonloadErrorPageContent =
      await errorPage.getCouldNotFindContent.getText()
    const expectedContent = `Your link has expired
The download link had expired. Download links expire after 48 hours.
To request another download, go to Get air pollution data.`
    expect(dowonloadErrorPageContent).toContain(expectedContent)
  })

  it('AQD-1710, request data download journey data comes blank when two automatic hydrocarbons pollutants are selected', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()

    const Pollutants = ['Benzene (C6H6)', 'Ethylbenzene (C8H10)']

    for (const pollutant of Pollutants) {
      await addPollutantPage.addPollutant(pollutant)
    }

    await common.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getScotlandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getRangeOfYearsRadio.click()
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2022')
    await addYearPage.getRangeOfYearsEndYearInput.setValue('2026')
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()
    await common.legalWait()

    // Ensure downloads directory is clean before downloading
    const DOWNLOAD_DIR = path.resolve(process.cwd(), 'downloads')
    try {
      fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true })
    } catch {}
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })

    await DownloadYourDataPage.getDownloadAutomaticHydrocarbonNetworkMonitoringNetworkButtonOnRequestPage.click()

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

    const finalFiles = fs
      .readdirSync(DOWNLOAD_DIR)
      .filter((f) => !f.endsWith('.crdownload'))
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
      if (fileName.toLowerCase().endsWith('.zip')) {
        const extractDir = path.join(
          DOWNLOAD_DIR,
          `${path.parse(fileName).name}-extracted`
        )
        fs.mkdirSync(extractDir, { recursive: true })
        execSync(
          `powershell -Command "Expand-Archive -Path '${fullPath}' -DestinationPath '${extractDir}' -Force"`
        )
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

    const expectedPollutants = ['Benzene', 'Ethylbenzene']
    const foundPollutants = new Set()

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

      const dataRows = rows.slice(headerRowIndex + 1)
      expect(dataRows.length).toBeGreaterThan(0)

      for (const row of dataRows) {
        const columns = parseCsvLine(row)
        const pollutantValue = (columns[pollutantColumnIndex] || '')
          .replace(/^"|"$/g, '')
          .trim()

        if (pollutantValue === '') continue

        const matchedPollutant = expectedPollutants.find(
          (expected) => pollutantValue.toLowerCase() === expected.toLowerCase()
        )

        // Only Benzene and Ethylbenzene data should be present
        expect(matchedPollutant).toBeDefined()
        if (matchedPollutant) foundPollutants.add(matchedPollutant)
      }
    }

    // Both requested pollutants should be present in the downloaded data
    expect([...foundPollutants].sort()).toEqual([...expectedPollutants].sort())
  })
})
