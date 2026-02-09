import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
import addLocationPage from '../../page-objects/addLocationPage.js'
import addYearPage from '../../page-objects/addYearPage.js'
import DownloadYourDataPage from '../../page-objects/DownloadYourDataPage.js'
import requestDataPage from '../../page-objects/requestDataPage.js'

describe('request data page validation', () => {
  it('AQD-982 defect - request data flow', async () => {
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
  })
})
