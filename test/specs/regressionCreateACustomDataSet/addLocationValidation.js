import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
import addYearPage from '../../page-objects/addYearPage.js'
import addLocationPage from '../../page-objects/addLocationPage.js'

describe('add location validation', () => {
  it('Add locations(s) - Initial Screen AQD-867', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateOption.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()

    // content
    const addLocationPageContent =
      await addLocationPage.getAddLocationPageContent.getText()
    const expectedAddLocationPageContent = `Add location(s)
Countries
Choose one or more: England, Scotland, Wales or Northern Ireland
England
Scotland
Wales
Northern Ireland
Local authority
Add up to 10 local authorities
Continue`
    await expect(addLocationPageContent).toContain(
      expectedAddLocationPageContent
    )

    // styling checks
    const getAddLocationHeading = [await addLocationPage.getAddLocationHeading]
    const getAddLocationHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]
    for (const element of getAddLocationHeading) {
      const styles = await common.getStyles(
        element,
        getAddLocationHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getCountriesOption = [await addLocationPage.getCountriesOption]
    const getCountriesOptionProperties = [
      'align-self',
      'margin-bottom',
      'padding',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]
    for (const element of getCountriesOption) {
      const styles = await common.getStyles(
        element,
        getCountriesOptionProperties
      )
      expect(styles['align-self']).toBe('center')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getCountriesHintText = [await addLocationPage.getCountriesHintText]
    const getCountriesHintTextProperties = [
      'margin-bottom',
      'margin-top',
      'padding-left',
      'padding-right',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]
    for (const element of getCountriesHintText) {
      const styles = await common.getStyles(
        element,
        getCountriesHintTextProperties
      )
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles['margin-top']).toBe('-5px')
      expect(styles['padding-left']).toBe('59px')
      expect(styles['padding-right']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getCountrieslabels = [
      await addLocationPage.getEnglandOption,
      await addLocationPage.getScotlandOption,
      await addLocationPage.getWalesOption,
      await addLocationPage.getNorthernIrelandOption
    ]
    const getCountrieslabelsProperties = [
      'padding-left',
      'align-self',
      'margin-bottom',
      'padding',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]
    for (const element of getCountrieslabels) {
      const styles = await common.getStyles(
        element,
        getCountrieslabelsProperties
      )
      expect(styles['padding-left']).toBe('1px')
      expect(styles['align-self']).toBe('center')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px 7px 1px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
    // back link
    await common.getBackLink.click()
    const url = await browser.getUrl()
    await expect(url).toContain('customdataset')
  })

  it('Add locations(s) - Countries Journey - AQD-868', async () => {
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    // all countries selected
    await addLocationPage.getEnglandOption.click()
    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getWalesOption.click()
    await addLocationPage.getNorthernIrelandOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const allLocationsSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedallLocationsSelected = `England
Scotland
Wales
Northern Ireland`
    await expect(allLocationsSelected).toMatch(expectedallLocationsSelected)
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getWalesOption.click()
    await addLocationPage.getNorthernIrelandOption.click()
    // one country selected at a time
    await addLocationPage.getLocationContinueButton.click()
    const englandSelected = await customselectionPage.getLocationValue.getText()
    const expectedEnglandSelected = `England`
    await expect(englandSelected).toMatch(expectedEnglandSelected)

    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getEnglandOption.click()
    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const scotlandSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedScotlandSelected = `Scotland`
    await expect(scotlandSelected).toMatch(expectedScotlandSelected)

    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getWalesOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const walesSelected = await customselectionPage.getLocationValue.getText()
    const expectedWalesSelected = `Wales`
    await expect(walesSelected).toMatch(expectedWalesSelected)

    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getWalesOption.click()
    await addLocationPage.getNorthernIrelandOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const northernIrelandSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedNorthernIrelandSelected = `Northern Ireland`
    await expect(northernIrelandSelected).toMatch(
      expectedNorthernIrelandSelected
    )
  })

  it('Add locations(s) - local authority', async () => {
    // content , styling, flows
  })
})
