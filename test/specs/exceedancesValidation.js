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
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'

describe('exceedences', () => {
  it('hourly exceedences , AQD-632', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
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
    const expectedURLOfLondonBloomsbury = '/stationdetails/LondonBloomsbury'
    await expect(getCurrentURLOfLondonBloomsbury).toMatch(
      expectedURLOfLondonBloomsbury
    )
    await monitoringStationPage.get2024Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return true
      },
      { timeout: 5000 }
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

    const getHourlyExceedenceStyles = [
      await monitoringStationPage.getPM10HourlyExceedence,
      await monitoringStationPage.getPM25HourlyExceedence,
      await monitoringStationPage.getNOHourlyExceedence,
      await monitoringStationPage.getOzoneHourlyExceedence,
      await monitoringStationPage.getSDHourlyExceedence
    ]

    const getHourlyExceedenceStylesProperties = [
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

    for (const element of getHourlyExceedenceStyles) {
      const styles = await common.getStyles(
        element,
        getHourlyExceedenceStylesProperties
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

  it('daily exceedences, AQD-633', async () => {
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

    const getDailyExceedenceStyles = [
      await monitoringStationPage.getPM10DailyExceedence,
      await monitoringStationPage.getPM25DailyExceedence,
      await monitoringStationPage.getNODailyExceedence,
      await monitoringStationPage.getOzoneDailyExceedence,
      await monitoringStationPage.getSDDailyExceedence
    ]

    const getDailyExceedenceStylesProperties = [
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

    for (const element of getDailyExceedenceStyles) {
      const styles = await common.getStyles(
        element,
        getDailyExceedenceStylesProperties
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

  it('Toggle Tips for annaul average,display and styling, AQD-686', async () => {
    await monitoringStationPage.getPM25AnnualAverageToggleTip.isDisplayed()
    await monitoringStationPage.getPM25AnnualAverageToggleTip.isClickable()

    await monitoringStationPage.getPM10AnnualAverageToggleTip.isDisplayed()
    await monitoringStationPage.getPM10AnnualAverageToggleTip.isClickable()

    await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTip.isDisplayed()
    await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTip.isClickable()

    await monitoringStationPage.getOzoneAnnualAverageToggleTip.isDisplayed()
    await monitoringStationPage.getOzoneAnnualAverageToggleTip.isClickable()

    await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTip.isDisplayed()
    await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTip.isClickable()

    const getAnnualAverageToggleTipsStyles = [
      await monitoringStationPage.getPM25AnnualAverageToggleTip,
      await monitoringStationPage.getPM10AnnualAverageToggleTip,
      await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTip,
      await monitoringStationPage.getOzoneAnnualAverageToggleTip,
      await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTip
    ]

    const getAnnualAverageToggleTipProperties = [
      'background-color',
      'border',
      'color',
      'cursor',
      'height',
      'left',
      'padding',
      'position',
      'text-align',
      'top',
      'width'
    ]

    for (const element of getAnnualAverageToggleTipsStyles) {
      const styles = await common.getStyles(
        element,
        getAnnualAverageToggleTipProperties
      )
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('0px none rgb(11, 12, 12)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles.cursor).toBe('help')
      expect(styles.height).toBe('26px')
      expect(styles.left).toBe('0px')
      expect(styles.padding).toBe('0px')
      expect(styles.position).toBe('absolute')
      expect(styles['text-align']).toBe('center')
      expect(styles.top).toBe('0px')
      expect(styles.width).toBe('26px')
    }
    // checking that toggle tip doesnt show if theres no data
    await monitoringStationPage.get2020Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        return true
      },
      { timeout: 4000 }
    )
    await common.notDisplayed(
      await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTip
    )
  })

  it('Annual Average Toggle Tips text and hover functionality, AQD-687', async () => {
    await monitoringStationPage.get2025Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        return true
      },
      { timeout: 4000 }
    )

    const getAnnualAverageToggleTipInfoText = [
      await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText,
      await monitoringStationPage.getPM10AnnualAverageToggleTipInfoText,
      await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTipInfoText,
      await monitoringStationPage.getOzoneAnnualAverageToggleTipInfoText,
      await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTipInfoText
    ]

    const getAnnualAverageToggleTipInfoTextProperties = ['visibility']

    for (const element of getAnnualAverageToggleTipInfoText) {
      const styles = await common.getStyles(
        element,
        getAnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('hidden')
    }

    await monitoringStationPage.getPM25AnnualAverageToggleTip.moveTo()
    const getPM25AnnualAverageToggleTipInfoTextHover = [
      await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText
    ]

    const getPM25AnnualAverageToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM25AnnualAverageToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getPM25AnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getPM25ToggleTipText =
      await monitoringStationPage.getPM25AnnualAverageToggleTipInfoText.getText()
    const PM25ToggleTipText = `Annual average PM2.5 levels at any site must not go above 20 micrograms per cubic metre (µg/m³) in a calendar year (when rounded to a whole number).`
    await expect(getPM25ToggleTipText).toMatch(PM25ToggleTipText)
    await monitoringStationPage.getPM25AnnualAverageToggleTip.click()

    await monitoringStationPage.getPM10AnnualAverageToggleTip.moveTo()
    const getPM10AnnualAverageToggleTipInfoTextHover = [
      await monitoringStationPage.getPM10AnnualAverageToggleTipInfoText
    ]

    const getPM10AnnualAverageToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM10AnnualAverageToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getPM10AnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getPM10ToggleTipText =
      await monitoringStationPage.getPM10AnnualAverageToggleTipInfoText.getText()
    const PM10ToggleTipText = `Annual average PM10 levels at any site must not go above 40 micrograms per cubic metre (µg/m³) in a calendar year (when rounded to a whole number).`
    await expect(getPM10ToggleTipText).toMatch(PM10ToggleTipText)
    await monitoringStationPage.getPM10AnnualAverageToggleTip.click()

    await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTip.moveTo()
    const getNitrogenDioxideAnnualAverageToggleTipInfoTextHover = [
      await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTipInfoText
    ]

    const getNitrogenDioxideAnnualAverageToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getNitrogenDioxideAnnualAverageToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getNitrogenDioxideAnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getNitrogenDioxideToggleTipText =
      await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTipInfoText.getText()
    const NitrogenDioxideToggleTipText = `Annual average nitrogen dioxide levels at any site must not go above 40 micrograms per cubic metre (µg/m³) in a calendar year (when rounded to a whole number).`
    await expect(getNitrogenDioxideToggleTipText).toMatch(
      NitrogenDioxideToggleTipText
    )
    await monitoringStationPage.getNitrogenDioxideAnnualAverageToggleTip.click()

    await monitoringStationPage.getOzoneAnnualAverageToggleTip.moveTo()
    const getOzoneAnnualAverageToggleTipInfoTextHover = [
      await monitoringStationPage.getOzoneAnnualAverageToggleTipInfoText
    ]

    const getOzoneAnnualAverageToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getOzoneAnnualAverageToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getOzoneAnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getOzoneToggleTipText =
      await monitoringStationPage.getOzoneAnnualAverageToggleTipInfoText.getText()
    const OzoneToggleTipText = `There is no annual average limit value for ozone.`
    await expect(getOzoneToggleTipText).toMatch(OzoneToggleTipText)
    await monitoringStationPage.getOzoneAnnualAverageToggleTip.click()

    await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTip.moveTo()
    const getSulphurDioxideAnnualAverageToggleTipInfoTextHover = [
      await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTipInfoText
    ]

    const getSulphurDioxideAnnualAverageToggleTipInfoTextProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getSulphurDioxideAnnualAverageToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getSulphurDioxideAnnualAverageToggleTipInfoTextProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getSulphurDioxideToggleTipText =
      await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTipInfoText.getText()
    const SulphurDioxideToggleTipText = `There is no annual average limit value for sulphur dioxide.`
    await expect(getSulphurDioxideToggleTipText).toMatch(
      SulphurDioxideToggleTipText
    )
    await monitoringStationPage.getSulphurDioxideAnnualAverageToggleTip.click()
  })

  it('Toggle Tips for Hourly exceedances, AQD-634', async () => {
    await monitoringStationPage.getNOHourlyExceedenceToggleTip.isDisplayed()
    await monitoringStationPage.getNOHourlyExceedenceToggleTip.isClickable()

    await monitoringStationPage.getSDHourlyExceedenceToggleTip.isDisplayed()
    await monitoringStationPage.getSDHourlyExceedenceToggleTip.isClickable()

    const getNOHourlyExceedenceToggleTip = [
      await monitoringStationPage.getNOHourlyExceedenceToggleTip,
      await monitoringStationPage.getSDHourlyExceedenceToggleTip
    ]

    const getNOHourlyExceedenceToggleTipProperties = [
      'background-color',
      'border',
      'color',
      'cursor',
      'height',
      'left',
      'padding',
      'position',
      'text-align',
      'top',
      'width'
    ]

    for (const element of getNOHourlyExceedenceToggleTip) {
      const styles = await common.getStyles(
        element,
        getNOHourlyExceedenceToggleTipProperties
      )
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('0px none rgb(11, 12, 12)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles.cursor).toBe('help')
      expect(styles.height).toBe('26px')
      expect(styles.left).toBe('0px')
      expect(styles.padding).toBe('0px')
      expect(styles.position).toBe('absolute')
      expect(styles['text-align']).toBe('center')
      expect(styles.top).toBe('0px')
      expect(styles.width).toBe('26px')
    }
  })

  it('Toggle Tip text for Hourly exceedances, AQD-708', async () => {
    const getHourlyExceedenceToggleTipInfoTextHidden = [
      await monitoringStationPage.getNOHourlyExceedenceToggleTipInfoText,
      await monitoringStationPage.getSDHourlyExceedenceToggleTipInfoText
    ]

    const getHourlyExceedenceToggleTipInfoTextHiddenProperties = ['visibility']

    for (const element of getHourlyExceedenceToggleTipInfoTextHidden) {
      const styles = await common.getStyles(
        element,
        getHourlyExceedenceToggleTipInfoTextHiddenProperties
      )
      expect(styles.visibility).toBe('hidden')
    }

    await monitoringStationPage.getNOHourlyExceedenceToggleTip.moveTo()
    const getNOHourlyExceedenceToggleTipInfoTextHover = [
      await monitoringStationPage.getNOHourlyExceedenceToggleTipInfoText
    ]

    const getNOHourlyExceedenceToggleTipInfoTextHoverProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getNOHourlyExceedenceToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getNOHourlyExceedenceToggleTipInfoTextHoverProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getNOHourlyExceedenceToggleTipInfoText =
      await monitoringStationPage.getNOHourlyExceedenceToggleTipInfoText.getText()
    const expectedNOHourlyExceedenceToggleTipInfoText = `Hourly nitrogen dioxide levels must not go above 200 micrograms per cubic metre (µg/m³) more than 18 times in a calendar year (when rounded to a whole number).`
    await expect(getNOHourlyExceedenceToggleTipInfoText).toMatch(
      expectedNOHourlyExceedenceToggleTipInfoText
    )

    await monitoringStationPage.getSDHourlyExceedenceToggleTip.moveTo()
    const getSDHourlyExceedenceToggleTipInfoTextHover = [
      await monitoringStationPage.getSDHourlyExceedenceToggleTipInfoText
    ]

    const getSDHourlyExceedenceToggleTipInfoTextHoverProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getSDHourlyExceedenceToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getSDHourlyExceedenceToggleTipInfoTextHoverProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getSDHourlyExceedenceToggleTipInfoText =
      await monitoringStationPage.getSDHourlyExceedenceToggleTipInfoText.getText()
    const expectedSDHourlyExceedenceToggleTipInfoText = `Hourly sulphur dioxide levels must not go above 350 micrograms per cubic metre (µg/m³) more than 24 times in a calendar year (when rounded to a whole number).`
    await expect(getSDHourlyExceedenceToggleTipInfoText).toMatch(
      expectedSDHourlyExceedenceToggleTipInfoText
    )
  })

  it('Toggle Tips for daily exceedances, AQD-652', async () => {
    await monitoringStationPage.getPM10DailyExceedenceToggleTip.isDisplayed()
    await monitoringStationPage.getPM10DailyExceedenceToggleTip.isClickable()

    await monitoringStationPage.getSDDailyExceedenceToggleTip.isDisplayed()
    await monitoringStationPage.getSDDailyExceedenceToggleTip.isClickable()

    const getPM10DailyExceedenceToggleTip = [
      await monitoringStationPage.getPM10DailyExceedenceToggleTip,
      await monitoringStationPage.getSDDailyExceedenceToggleTip
    ]

    const getPM10DailyExceedenceToggleTipProperties = [
      'background-color',
      'border',
      'color',
      'cursor',
      'height',
      'left',
      'padding',
      'position',
      'text-align',
      'top',
      'width'
    ]

    for (const element of getPM10DailyExceedenceToggleTip) {
      const styles = await common.getStyles(
        element,
        getPM10DailyExceedenceToggleTipProperties
      )
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('0px none rgb(11, 12, 12)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles.cursor).toBe('help')
      expect(styles.height).toBe('26px')
      expect(styles.left).toBe('0px')
      expect(styles.padding).toBe('0px')
      expect(styles.position).toBe('absolute')
      expect(styles['text-align']).toBe('center')
      expect(styles.top).toBe('0px')
      expect(styles.width).toBe('26px')
    }
  })

  it('Toggle Tip text for Daily exceedances, AQD-708', async () => {
    const getDailyExceedenceToggleTipInfoTextHidden = [
      await monitoringStationPage.getPM10DailyExceedenceToggleTipInfoText,
      await monitoringStationPage.getSDDailyExceedenceToggleTipInfoText
    ]

    const getDailyExceedenceToggleTipInfoTextHiddenProperties = ['visibility']

    for (const element of getDailyExceedenceToggleTipInfoTextHidden) {
      const styles = await common.getStyles(
        element,
        getDailyExceedenceToggleTipInfoTextHiddenProperties
      )
      expect(styles.visibility).toBe('hidden')
    }

    await monitoringStationPage.getPM10DailyExceedenceToggleTip.moveTo()
    const getPM10DailyExceedenceToggleTipInfoTextHover = [
      await monitoringStationPage.getPM10DailyExceedenceToggleTipInfoText
    ]

    const getPM10DailyExceedenceToggleTipInfoTextHoverProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getPM10DailyExceedenceToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getPM10DailyExceedenceToggleTipInfoTextHoverProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getPM10DailyExceedenceToggleTipInfoText =
      await monitoringStationPage.getPM10DailyExceedenceToggleTipInfoText.getText()
    const expectedPM10DailyExceedenceToggleTipInfoText = `Daily average PM10 levels must not go above 50 micrograms per cubic metre (µg/m³) more than 35 times in a calendar year (when rounded to a whole number).`
    await expect(getPM10DailyExceedenceToggleTipInfoText).toMatch(
      expectedPM10DailyExceedenceToggleTipInfoText
    )

    await monitoringStationPage.getSDDailyExceedenceToggleTip.moveTo()
    const getSDDailyExceedenceToggleTipInfoTextHover = [
      await monitoringStationPage.getSDDailyExceedenceToggleTipInfoText
    ]

    const getSDDailyExceedenceToggleTipInfoTextHoverProperties = [
      'visibility',
      'color',
      'background-color'
    ]

    for (const element of getSDDailyExceedenceToggleTipInfoTextHover) {
      const styles = await common.getStyles(
        element,
        getSDDailyExceedenceToggleTipInfoTextHoverProperties
      )
      expect(styles.visibility).toBe('visible')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['background-color']).toBe('rgb(0, 0, 0)')
    }
    const getSDDailyExceedenceToggleTipInfoText =
      await monitoringStationPage.getSDDailyExceedenceToggleTipInfoText.getText()
    const expectedSDDailyExceedenceToggleTipInfoText = `Daily average sulphur dioxide levels must not go above 125 micrograms per cubic metre (µg/m³) more than 3 times in a calendar year (when rounded to a whole number).`
    await expect(getSDDailyExceedenceToggleTipInfoText).toMatch(
      expectedSDDailyExceedenceToggleTipInfoText
    )
  })

  it('Station Summary Data - Hourly Exceedances - Above Limit Flag, AQD-791', async () => {
    await browser.url('')
    await startNowPage.startNowBtnClick()
    await searchPage.setsearch('London')
    await searchPage.milesOptionClick('50 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.locationLinkClick('City of London')
    await locationMonitoringStationListPage
      .getMonitoringStationLink('London Marylebone Road')
      .click()
    await monitoringStationPage.get2018Button.click()
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        return true
      },
      { timeout: 4000 }
    )
    await monitoringStationPage.getAboveLimitFlag.isDisplayed()
    const getAboveLimitFlagText =
      await monitoringStationPage.getAboveLimitFlag.getText()
    const expectedAboveLimitFlagText = `Above limit`
    await expect(getAboveLimitFlagText).toMatch(expectedAboveLimitFlagText)
    const getAboveLimitFlagStyles = [
      await monitoringStationPage.getAboveLimitFlag
    ]
    const getAboveLimitFlagStylesProperties = [
      'font-size',
      'line-height',
      'background-color',
      'color'
    ]
    for (const element of getAboveLimitFlagStyles) {
      const styles = await common.getStyles(
        element,
        getAboveLimitFlagStylesProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['background-color']).toBe('rgb(244, 205, 198)')
      expect(styles.color).toBe('rgb(42, 11, 6)')
    }
  })
})
