import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import searchPage from '../page-objects/searchPage.js'
// import resultsPage from '../page-objects/resultsPage.js'
// import monitoringStationPage from '../page-objects/monitoringStationPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
import disambigurationPage from '../page-objects/disambigurationPage.js'
import common from '../page-objects/common.js'
import passwordPage from '../page-objects/passwordPage.js'
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'

describe('exceedences, AQD-632', () => {
  it('hourly exceedences ', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    await passwordPage.inputPassword('airqualitydataset')
    await common.continueButton.click()
    await startNowPage.startNowBtnClick()
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Bloomsbury')
      .click()

    const getCurrentURLOfLondonBloomsbury = await browser.getUrl()
    const expectedURLOfLondonBloomsbury =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/stationdetails/LondonBloomsbury'
    await expect(getCurrentURLOfLondonBloomsbury).toMatch(
      expectedURLOfLondonBloomsbury
    )
    await monitoringStationPage.get2024Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        return true
      },
      { timeout: 3000 }
    )
    const PM25HourlyExceedence =
      await monitoringStationPage.getPM25HourlyExceedence.getText()
    const PM10HourlyExceedence =
      await monitoringStationPage.getPM10HourlyExceedence.getText()
    const NOHourlyExceedence =
      await monitoringStationPage.getNOHourlyExceedence.getText()
    const OzoneHourlyExceedence =
      await monitoringStationPage.getOzoneHourlyExceedence.getText()
    const SDHourlyExceedence =
      await monitoringStationPage.getSDHourlyExceedence.getText()

    const expectedPM25HourlyExceedence = `n/a`
    const expectedPM10HourlyExceedence = `n/a`
    const expectedNOHourlyExceedence = `0`
    const expectedOzoneHourlyExceedence = `n/a`
    const expectedSDHourlyExceedence = `0`

    await expect(PM25HourlyExceedence).toMatch(expectedPM25HourlyExceedence)

    await expect(PM10HourlyExceedence).toMatch(expectedPM10HourlyExceedence)

    await expect(NOHourlyExceedence).toMatch(expectedNOHourlyExceedence)

    await expect(OzoneHourlyExceedence).toMatch(expectedOzoneHourlyExceedence)

    await expect(SDHourlyExceedence).toMatch(expectedSDHourlyExceedence)

    const getPM10HourlyExceedence = [
      await monitoringStationPage.getPM10HourlyExceedence
    ]

    const getPM10HourlyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getPM10HourlyExceedence) {
      const styles = await common.getStyles(
        element,
        getPM10HourlyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getPM25HourlyExceedence = [
      await monitoringStationPage.getPM25HourlyExceedence
    ]

    const getPM25HourlyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getPM25HourlyExceedence) {
      const styles = await common.getStyles(
        element,
        getPM25HourlyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getNOHourlyExceedence = [
      await monitoringStationPage.getNOHourlyExceedence
    ]

    const getNOHourlyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getNOHourlyExceedence) {
      const styles = await common.getStyles(
        element,
        getNOHourlyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getOzoneHourlyExceedence = [
      await monitoringStationPage.getOzoneHourlyExceedence
    ]

    const getOzoneHourlyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getOzoneHourlyExceedence) {
      const styles = await common.getStyles(
        element,
        getOzoneHourlyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getSDHourlyExceedence = [
      await monitoringStationPage.getSDHourlyExceedence
    ]

    const getSDHourlyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getSDHourlyExceedence) {
      const styles = await common.getStyles(
        element,
        getSDHourlyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it('daily exceedences ', async () => {
    const PM25DailyExceedence =
      await monitoringStationPage.getPM25DailyExceedence.getText()
    const PM10DailyExceedence =
      await monitoringStationPage.getPM10DailyExceedence.getText()
    const NODailyExceedence =
      await monitoringStationPage.getNODailyExceedence.getText()
    const OzoneDailyExceedence =
      await monitoringStationPage.getOzoneDailyExceedence.getText()
    const SDDailyExceedence =
      await monitoringStationPage.getSDDailyExceedence.getText()

    const expectedPM25DailyExceedence = `n/a`
    const expectedPM10DailyExceedence = `0`
    const expectedNODailyExceedence = `n/a`
    const expectedOzoneDailyExceedence = `n/a`
    const expectedSDDailyExceedence = `0`

    await expect(PM25DailyExceedence).toMatch(expectedPM25DailyExceedence)

    await expect(PM10DailyExceedence).toMatch(expectedPM10DailyExceedence)

    await expect(NODailyExceedence).toMatch(expectedNODailyExceedence)

    await expect(OzoneDailyExceedence).toMatch(expectedOzoneDailyExceedence)

    await expect(SDDailyExceedence).toMatch(expectedSDDailyExceedence)

    const getPM10DailyExceedence = [
      await monitoringStationPage.getPM10DailyExceedence
    ]

    const getPM10DailyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getPM10DailyExceedence) {
      const styles = await common.getStyles(
        element,
        getPM10DailyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getPM25DailyExceedence = [
      await monitoringStationPage.getPM25DailyExceedence
    ]

    const getPM25DailyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getPM25DailyExceedence) {
      const styles = await common.getStyles(
        element,
        getPM25DailyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getNODailyExceedence = [
      await monitoringStationPage.getNODailyExceedence
    ]

    const getNODailyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getNODailyExceedence) {
      const styles = await common.getStyles(
        element,
        getNODailyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getOzoneDailyExceedence = [
      await monitoringStationPage.getOzoneDailyExceedence
    ]

    const getOzoneDailyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getOzoneDailyExceedence) {
      const styles = await common.getStyles(
        element,
        getOzoneDailyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getSDDailyExceedence = [
      await monitoringStationPage.getSDDailyExceedence
    ]

    const getSDDailyExceedenceProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'display',
      'font-size',
      'line-height',
      'font-family',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of getSDDailyExceedence) {
      const styles = await common.getStyles(
        element,
        getSDDailyExceedenceProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })
})
