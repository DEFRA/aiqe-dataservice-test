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
import DownloadYourDataPage from '../../page-objects/DownloadYourDataPage.js'

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

  it('Add locations(s) - Countries Journey - AQD-868, AQD-961 country choices retained for change functionality', async () => {
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
    const isEnglandSelected =
      await addLocationPage.getEnglandCheckbox.isSelected()
    await expect(isEnglandSelected).toBe(true)

    await addLocationPage.getEnglandOption.click()
    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const scotlandSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedScotlandSelected = `Scotland`
    await expect(scotlandSelected).toMatch(expectedScotlandSelected)
    await customselectionPage.getAddChangeLocationLink.click()
    const isScotlandSelected =
      await addLocationPage.getScotlandCheckbox.isSelected()
    await expect(isScotlandSelected).toBe(true)

    await addLocationPage.getScotlandOption.click()
    await addLocationPage.getWalesOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const walesSelected = await customselectionPage.getLocationValue.getText()
    const expectedWalesSelected = `Wales`
    await expect(walesSelected).toMatch(expectedWalesSelected)
    await customselectionPage.getAddChangeLocationLink.click()
    const isWalesSelected = await addLocationPage.getWalesCheckbox.isSelected()
    await expect(isWalesSelected).toBe(true)

    await addLocationPage.getWalesOption.click()
    await addLocationPage.getNorthernIrelandOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const northernIrelandSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedNorthernIrelandSelected = `Northern Ireland`
    await expect(northernIrelandSelected).toMatch(
      expectedNorthernIrelandSelected
    )
    await customselectionPage.getAddChangeLocationLink.click()
    const isNISelected =
      await addLocationPage.getNorthernIrelandCheckbox.isSelected()
    await expect(isNISelected).toBe(true)
  })

  it('Add locations - local authority AQD-869, content and styling', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateOption.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getLocalAuthorityOption.click()
    const getLocalAuthorityOptionText =
      await addLocationPage.getLocalAuthorityOption.getText()
    const expectedgetLocalAuthorityOptionText = 'Local authority'
    await expect(getLocalAuthorityOptionText).toMatch(
      expectedgetLocalAuthorityOptionText
    )

    const localAuthorityHintText =
      await addLocationPage.getLocalAuthorityHintText.getText()
    const expectedLocalAuthorityHintText = 'Add up to 10 local authorities'
    await expect(localAuthorityHintText).toMatch(expectedLocalAuthorityHintText)

    const getLocalAuthorityOption = [
      await addLocationPage.getLocalAuthorityOption
    ]
    const getLocalAuthorityOptionProperties = [
      'align-self',
      'margin-bottom',
      'padding',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]
    for (const element of getLocalAuthorityOption) {
      const styles = await common.getStyles(
        element,
        getLocalAuthorityOptionProperties
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

    const getLocalAuthorityHintText = [
      await addLocationPage.getLocalAuthorityHintText
    ]
    const getLocalAuthorityHintTextProperties = [
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
    for (const element of getLocalAuthorityHintText) {
      const styles = await common.getStyles(
        element,
        getLocalAuthorityHintTextProperties
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
  })

  it('AQD-869 - checking case sensitivity', async () => {
    await addLocationPage.getLocalAuthoritySearchBox.setValue(
      'BARNET - LONDON BOROUGH OF'
    )
    const uppercaseCheck =
      await addLocationPage.getLocalAuthorityListOption.getText()
    const expectedUppercaseCheck = 'Barnet - London Borough of'
    await expect(uppercaseCheck).toMatch(expectedUppercaseCheck)

    await addLocationPage.getLocalAuthoritySearchBox.click()
    await browser.keys('Escape')
    await addLocationPage.getLocalAuthoritySearchBox.clearValue()
    await browser.waitUntil(
      async () =>
        (await addLocationPage.getLocalAuthoritySearchBox.getValue()) === '',
      { timeout: 3000, timeoutMsg: 'Search box did not clear' }
    )
    await addLocationPage.getLocalAuthoritySearchBox.setValue(
      'barnet - london borough of'
    )
    const lowercaseCheck =
      await addLocationPage.getLocalAuthorityListOption.getText()
    const expectedLowercaseCheck = 'Barnet - London Borough of'
    await expect(lowercaseCheck).toMatch(expectedLowercaseCheck)
    const addLocalAuthorityButtonText =
      await addLocationPage.getAddLocalAuthorityButton.getText()
    const expectedAddLocalAuthorityButtonText = 'Add local authority'
    await expect(addLocalAuthorityButtonText).toMatch(
      expectedAddLocalAuthorityButtonText
    )
  })

  it('AQD-869 - Once a selection of a local authority has been made, this pre-populates the entry text box', async () => {
    await addLocationPage.getLocalAuthorityListOption.click()
    await common.legalWait()
    const prePopulateCheck =
      await addLocationPage.getLocalAuthoritySearchBox.getValue()
    const expectedPrePopulateCheck = 'Barnet - London Borough of'
    await expect(prePopulateCheck).toMatch(expectedPrePopulateCheck)

    await addLocationPage.getLocalAuthoritySearchBox.click()
    await browser.keys('Escape')
    await addLocationPage.getLocalAuthoritySearchBox.clearValue()
    await browser.waitUntil(
      async () =>
        (await addLocationPage.getLocalAuthoritySearchBox.getValue()) === '',
      { timeout: 3000, timeoutMsg: 'Search box did not clear' }
    )
  })
  it('AQD-869 - add/change local authority ', async () => {
    await addLocationPage.getLocalAuthoritySearchBox.setValue(
      'barnet - london borough of'
    )
    await addLocationPage.getLocalAuthorityListOption.click()
    await addLocationPage.getAddLocalAuthorityButton.click()
    await addLocationPage.getLocationContinueButton.click()
    const locationSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedLocationSelected = `Barnet - London Borough of`
    await expect(locationSelected).toMatch(expectedLocationSelected)

    const addLocationLinkChange =
      await customselectionPage.getAddChangeLocationLink.getText()
    const expectedAddLocationLinkChange = 'Change'
    await expect(addLocationLinkChange).toMatch(expectedAddLocationLinkChange)

    await customselectionPage.getAddChangeLocationLink.click()
    const isLocalAuthorityRadioSelected =
      await addLocationPage.getLocalAuthorityRadio.isSelected()
    await expect(isLocalAuthorityRadioSelected).toBe(true)
    const AddedLocalAuthoritiesTitle =
      await addLocationPage.getAddedLocalAuthoritiesTitle.getText()
    const expectedAddedLocalAuthoritiesTitle = 'Added local authorities'
    await expect(AddedLocalAuthoritiesTitle).toMatch(
      expectedAddedLocalAuthoritiesTitle
    )
    const getAddedLocalAuthorityOneLabel =
      await addLocationPage.getAddedLocalAuthorityOneLabel.getText()
    const expectedgetAddedLocalAuthorityOneLabel = 'Local authority 1'
    await expect(getAddedLocalAuthorityOneLabel).toMatch(
      expectedgetAddedLocalAuthorityOneLabel
    )
    const getAddedLocalAuthorityOneName =
      await addLocationPage.getAddedLocalAuthorityOneName.getText()
    const expectedgetAddedLocalAuthorityOneName = 'Barnet - London Borough of'
    await expect(getAddedLocalAuthorityOneName).toMatch(
      expectedgetAddedLocalAuthorityOneName
    )
    const getAddedLocalAuthorityOneRemoveLink =
      await addLocationPage.getAddedLocalAuthorityOneRemoveLink.getText()
    const expectedgetAddedLocalAuthorityOneRemoveLink = 'Remove'
    await expect(getAddedLocalAuthorityOneRemoveLink).toMatch(
      expectedgetAddedLocalAuthorityOneRemoveLink
    )

    const addLocalAuthorityButtonText =
      await addLocationPage.getAddLocalAuthorityButton.getText()
    const expectedAddLocalAuthorityButtonText = 'Add another local authority'
    await expect(addLocalAuthorityButtonText).toMatch(
      expectedAddLocalAuthorityButtonText
    )
  })
  it('AQD-869 - The user is only allowed to add a maximum of 10 local authorities', async () => {
    const queries = [
      'barking',
      'bexley',
      'brent',
      'bromley',
      'camden',
      'croydon',
      'ealing',
      'enfield',
      'greenwich',
      'hackney'
    ]

    for (const q of queries) {
      await addLocationPage.getLocalAuthoritySearchBox.setValue(q)
      await addLocationPage.getLocalAuthorityListOption.waitForExist({
        timeout: 5000
      })
      await addLocationPage.getLocalAuthorityListOption.click()
      await addLocationPage.getAddLocalAuthorityButton.click()
    }
    await common.legalWait()
    const moreThanTenError = await common
      .errorSummaryItemByText('Add up to 10 local authorities')
      .getText()
    const expectedmoreThanTenError = 'Add up to 10 local authorities'
    await expect(moreThanTenError).toMatch(expectedmoreThanTenError)
    await addLocationPage.getLocationContinueButton.click()

    const locationSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedLocationSelected = `Barnet - London Borough of
Barking and Dagenham - London Borough of
Bexley - London Borough of
Brent - London Borough of
Bromley Council - London Borough of
Camden - London Borough of
Croydon - London Borough of
Ealing - London Borough of
Enfield - London Borough of
Greenwich - Royal Borough of`
    await expect(locationSelected).toMatch(expectedLocationSelected)
  })
  it('AQD-869 - numbering updated', async () => {
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getAddedLocalAuthorityOneRemoveLink.click()
    const getAddedLocalAuthorityOneLabel =
      await addLocationPage.getAddedLocalAuthorityOneLabel.getText()
    const expectedgetAddedLocalAuthorityOneLabel = 'Local authority 1'
    await expect(getAddedLocalAuthorityOneLabel).toMatch(
      expectedgetAddedLocalAuthorityOneLabel
    )
    await addLocationPage.getAddedLocalAuthorityOneRemoveLink.click()
    await common.legalWait()
    const getAddedLocalAuthorityOneLabelAfterRemove =
      await addLocationPage.getAddedLocalAuthorityOneLabel.getText()
    const expectedgetAddedLocalAuthorityOneLabelAfterRemove =
      'Local authority 1'
    await expect(getAddedLocalAuthorityOneLabelAfterRemove).toMatch(
      expectedgetAddedLocalAuthorityOneLabelAfterRemove
    )
    await addLocationPage.getLocationContinueButton.click()
    await customselectionPage.getContinueButton.click()
    const numberOfStationsAvailable =
      await DownloadYourDataPage.getNumberOfStationsAvailable.getText()
    const expectedNumberOfStationsAvailable = '1 stations available'
    await expect(numberOfStationsAvailable).toMatch(
      expectedNumberOfStationsAvailable
    )
  })

  it('AQD-1028 - defect - local authority api not serving stations', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getDAQIOptionRadio.click()
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateOption.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getLocalAuthorityOption.click()

    const localAuthority = [
      'barking',
      'Wrexham',
      'Belfast',
      'Aberdeen',
      'Liverpool',
      'Manchester',
      'Birmingham',
      'Scottish',
      'Swansea',
      'Cornwall'
    ]

    for (const a of localAuthority) {
      await addLocationPage.getLocalAuthoritySearchBox.setValue(a)
      await addLocationPage.getLocalAuthorityListOption.waitForExist({
        timeout: 5000
      })
      await addLocationPage.getLocalAuthorityListOption.click()
      await addLocationPage.getAddLocalAuthorityButton.click()
    }
    await addLocationPage.getLocationContinueButton.click()
    const locationSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedLocationSelected = `Barking and Dagenham - London Borough of
Wrexham County Borough Council
Belfast City Council
Aberdeen City Council
Liverpool City Council
Manchester City Council
Birmingham City Council
Scottish Borders Council
Swansea City and County Council
Cornwall County Council`
    await expect(locationSelected).toMatch(expectedLocationSelected)
    await customselectionPage.getContinueButton.click()
    const numberOfStationsAvailable =
      await DownloadYourDataPage.getNumberOfStationsAvailable.getText()
    const expectedNumberOfStationsAvailable = '63 stations available'
    await expect(numberOfStationsAvailable).toMatch(
      expectedNumberOfStationsAvailable
    )
  })

  it('AQD-869,AQD-1044 - error validation for countries and local authority', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getDAQIOptionRadio.click()
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateOption.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    // continue without selecting any options
    await addLocationPage.getLocationContinueButton.click()
    const continueError = await common
      .errorSummaryItemByText('Select an option before continuing')
      .isDisplayed()
    await expect(continueError).toBe(true)
    // continue after selecting country but not selecting a country
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const countryContinueError = await common
      .errorSummaryItemByText('Select at least one country')
      .isDisplayed()
    await expect(countryContinueError).toBe(true)
    // continue after selecting local authority but not selecting any local authority
    await addLocationPage.getLocalAuthorityOption.click()
    await addLocationPage.getLocationContinueButton.click()
    const localAuthorityContinueError = await common
      .errorSummaryItemByText('Add at least one local authority')
      .isDisplayed()
    await expect(localAuthorityContinueError).toBe(true)
    // selecting add local authority button with empty search box
    await addLocationPage.getAddLocalAuthorityButton.click()
    const addLocalAuthorityError = await common
      .errorSummaryItemByText('Enter a local authority')
      .isDisplayed()
    await expect(addLocalAuthorityError).toBe(true)
    // fake local authority
    await addLocationPage.getLocalAuthoritySearchBox.setValue(
      'fake local authority'
    )
    await addLocationPage.getAddLocalAuthorityButton.click()
    await addLocationPage.getAddLocalAuthorityButton.click()
    await common.legalWait()
    const fakeLocalAuthorityError = await common
      .errorSummaryItemByText('Select local authorities from the list')
      .isDisplayed()
    await expect(fakeLocalAuthorityError).toBe(true)
  })

  it('AQD-1048, defect - user shouldnt be able to add a local authority without using the add local authority button', async () => {
    await addLocationPage.getLocalAuthoritySearchBox.click()
    await browser.keys('Escape')
    await addLocationPage.getLocalAuthoritySearchBox.clearValue()
    await browser.waitUntil(
      async () =>
        (await addLocationPage.getLocalAuthoritySearchBox.getValue()) === '',
      { timeout: 3000, timeoutMsg: 'Search box did not clear' }
    )
    await addLocationPage.getLocationContinueButton.click()
    const localAuthorityContinueError = await common
      .errorSummaryItemByText('Add at least one local authority')
      .isDisplayed()
    await expect(localAuthorityContinueError).toBe(true)

    await addLocationPage.getLocalAuthoritySearchBox.setValue(
      'Barnet - London Borough of'
    )
    await addLocationPage.getLocalAuthorityListOption.click()
    await addLocationPage.getAddLocalAuthorityButton.click()
    await addLocationPage.getLocationContinueButton.click()
    const locationSelected =
      await customselectionPage.getLocationValue.getText()
    const expectedLocationSelected = `Barnet - London Borough of`
    await expect(locationSelected).toMatch(expectedLocationSelected)
    await common.legalWait()

    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getLocalAuthoritySearchBox.setValue(
      'Camden - London Borough of'
    )
    await addLocationPage.getLocalAuthorityListOption.click()
    await addLocationPage.getLocationContinueButton.click()

    const locationSelected2 =
      await customselectionPage.getLocationValue.getText()
    const expectedLocationSelected2 = `Barnet - London Borough of`
    await expect(locationSelected2).toMatch(expectedLocationSelected2)
  })
})
