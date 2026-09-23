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
import addYearPage from '../../page-objects/addYearPage.js'
import addLocationPage from '../../page-objects/addLocationPage.js'
import DownloadYourDataPage from '../../page-objects/DownloadYourDataPage.js'

describe('add year validation AQD-841', () => {
  it('Add year - content and titles and styling checks', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()

    const AddYearHeading = await addYearPage.getAddYearHeading.getText()
    const expectedgetAddYearHeading = 'Add time period'
    await expect(AddYearHeading).toMatch(expectedgetAddYearHeading)

    const YearToDateOption = await addYearPage.getYearToDateOption.getText()
    const todaysDate = await common.getTodayAsDayMonthString()
    const expectedYearToDateOption = `Year to date (1 January to ${todaysDate})`
    await expect(YearToDateOption).toMatch(expectedYearToDateOption)

    const getAnyYearOption = await addYearPage.getAnyYearOption.getText()
    const expectedAnyYearOption = 'Any year'
    await expect(getAnyYearOption).toMatch(expectedAnyYearOption)

    const getAnyYearHintText = await addYearPage.getAnyYearHintText.getText()
    const expectedgetAnyYearHintText = 'Choose a single whole year'
    await expect(getAnyYearHintText).toMatch(expectedgetAnyYearHintText)

    const getRangeOfYearsOption =
      await addYearPage.getRangeOfYearsOption.getText()
    const expectedgetRangeOfYearsOption = 'Range of years'
    await expect(getRangeOfYearsOption).toMatch(expectedgetRangeOfYearsOption)

    const getRangeOfYearsHintText =
      await addYearPage.getRangeOfYearsHintText.getText()
    const expectedgetRangeOfYearsHintText =
      'Choose up to 5 whole years at a time'
    await expect(getRangeOfYearsHintText).toMatch(
      expectedgetRangeOfYearsHintText
    )

    const getAddYearHeading = [await addYearPage.getAddYearHeading]

    const addYearHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getAddYearHeading) {
      const styles = await common.getStyles(element, addYearHeadingProperties)
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getYearOptionsStyles = [
      await addYearPage.getYearToDateOption,
      await addYearPage.getAnyYearOption,
      await addYearPage.getRangeOfYearsOption
    ]

    const getYearToDateOptionProperties = [
      'align-self',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getYearOptionsStyles) {
      const styles = await common.getStyles(
        element,
        getYearToDateOptionProperties
      )
      expect(styles['align-self']).toBe('center')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getYearHintTextStyles = [
      await addYearPage.getAnyYearHintText,
      await addYearPage.getRangeOfYearsHintText
    ]

    const getYearHintTextProperties = [
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

    for (const element of getYearHintTextStyles) {
      const styles = await common.getStyles(element, getYearHintTextProperties)
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

    await addYearPage.getAnyYearOption.click()
    const getYearSubTitle = await addYearPage.getYearSubTitle.getText()
    const getAnyYearForExample =
      await addYearPage.getAnyYearForExample.getText()
    const expectedYearSubTitle = 'Year'
    const expectedAnyYearForExample = 'For example: 2009'
    await expect(getYearSubTitle).toMatch(expectedYearSubTitle)
    await expect(getAnyYearForExample).toMatch(expectedAnyYearForExample)

    const getYearSubTitleStyles = [await addYearPage.getYearSubTitle]

    const getYearSubTitleProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getYearSubTitleStyles) {
      const styles = await common.getStyles(element, getYearSubTitleProperties)
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('5px')
    }

    const getAnyYearForExampleStyles = [await addYearPage.getAnyYearForExample]

    const getAnyYearForExampleProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getAnyYearForExampleStyles) {
      const styles = await common.getStyles(
        element,
        getAnyYearForExampleProperties
      )
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    await addYearPage.getRangeOfYearsOption.click()
    const getRangeOfYearsStartYearSubTitle =
      await addYearPage.getRangeOfYearsStartYearSubTitle.getText()
    const getRangeOfYearsStartYearHint =
      await addYearPage.getRangeOfYearsStartYearHint.getText()
    const expectedRangeOfYearsStartYearSubTitle = 'Enter start year'
    const expectedRangeOfYearsStartYearHint = 'For example: 2021'
    await expect(getRangeOfYearsStartYearSubTitle).toMatch(
      expectedRangeOfYearsStartYearSubTitle
    )
    await expect(getRangeOfYearsStartYearHint).toMatch(
      expectedRangeOfYearsStartYearHint
    )

    const getRangeOfYearsEndYearSubTitle =
      await addYearPage.getRangeOfYearsEndYearSubTitle.getText()
    const getRangeOfYearsEndYearHint =
      await addYearPage.getRangeOfYearsEndYearHint.getText()
    const expectedRangeOfYearsEndYearSubTitle = 'Enter end year'
    const expectedRangeOfYearsEndYearHint = 'For example: 2025'
    await expect(getRangeOfYearsEndYearSubTitle).toMatch(
      expectedRangeOfYearsEndYearSubTitle
    )
    await expect(getRangeOfYearsEndYearHint).toMatch(
      expectedRangeOfYearsEndYearHint
    )

    const getRangeOfYearsStartYearSubTitleStyles = [
      await addYearPage.getRangeOfYearsStartYearSubTitle
    ]

    const getRangeOfYearsStartYearSubTitleProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getRangeOfYearsStartYearSubTitleStyles) {
      const styles = await common.getStyles(
        element,
        getRangeOfYearsStartYearSubTitleProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('5px')
    }

    const getRangeOfYearsStartYearHintStyles = [
      await addYearPage.getRangeOfYearsStartYearHint
    ]

    const getRangeOfYearsStartYearHintProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getRangeOfYearsStartYearHintStyles) {
      const styles = await common.getStyles(
        element,
        getRangeOfYearsStartYearHintProperties
      )
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getRangeOfYearsEndYearSubTitleStyles = [
      await addYearPage.getRangeOfYearsEndYearSubTitle
    ]

    const getRangeOfYearsEndYearSubTitleProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getRangeOfYearsEndYearSubTitleStyles) {
      const styles = await common.getStyles(
        element,
        getRangeOfYearsEndYearSubTitleProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('5px')
    }

    const getRangeOfYearsEndYearHintStyles = [
      await addYearPage.getRangeOfYearsEndYearHint
    ]

    const getRangeOfYearsEndYearHintProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getRangeOfYearsEndYearHintStyles) {
      const styles = await common.getStyles(
        element,
        getRangeOfYearsEndYearHintProperties
      )
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it('year choices not being retained for change functionality - AQD-961', async () => {
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
    await customselectionPage.getAddChangeYearLink.click()
    const isYearToDateOptionSelected =
      await addYearPage.getYearToDateRadio.isSelected()
    await expect(isYearToDateOptionSelected).toBe(true)

    await addYearPage.getAnyYearOption.click()
    await addYearPage.getAnyYearInput.setValue('2020')
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    const isAnyYearOptionSelected =
      await addYearPage.getAnyYearRadio.isSelected()
    const anyYearInputValue = await addYearPage.getAnyYearInput.getValue()
    await expect(isAnyYearOptionSelected).toBe(true)
    await expect(anyYearInputValue).toBe('2020')

    await addYearPage.getRangeOfYearsOption.click()
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2015')
    await addYearPage.getRangeOfYearsEndYearInput.setValue('2019')
    await addYearPage.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    const isRangeOfYearsOptionSelected =
      await addYearPage.getRangeOfYearsRadio.isSelected()
    const rangeOfYearsStartYearInputValue =
      await addYearPage.getRangeOfYearsStartYearInput.getValue()
    const rangeOfYearsEndYearInputValue =
      await addYearPage.getRangeOfYearsEndYearInput.getValue()
    await expect(isRangeOfYearsOptionSelected).toBe(true)
    await expect(rangeOfYearsStartYearInputValue).toBe('2015')
    await expect(rangeOfYearsEndYearInputValue).toBe('2019')
    await common.getBackLink.click()
    await customselectionPage.getClearSelectionsLink.click()
  })

  it('error scenarios - AQD-841', async () => {
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.continueButton.click()
    const selectAnOptionBeforeContinuingError = await common
      .errorSummaryItemByText('Select an option before continuing')
      .getText()
    const expectedSelectAnOptionBeforeContinuing =
      'Select an option before continuing'
    await expect(selectAnOptionBeforeContinuingError).toMatch(
      expectedSelectAnOptionBeforeContinuing
    )
    const selectAnOptionBeforeContinuingErrorLink =
      await common.errorSummaryItemByText('Select an option before continuing')
    await selectAnOptionBeforeContinuingErrorLink.click()
    await expect(await addYearPage.getLastSevenDaysRadio).toBeFocused()

    await addYearPage.getAnyYearOption.click()
    await addYearPage.continueButton.click()
    const enterAYearError = await common
      .errorSummaryItemByText('Enter a year.')
      .getText()
    const expectedEnterAYearError = 'Enter a year.'
    await expect(enterAYearError).toMatch(expectedEnterAYearError)
    const enterAYearErrorLink =
      await common.errorSummaryItemByText('Enter a year.')
    await enterAYearErrorLink.click()
    await expect(await addYearPage.getAnyYearInput).toBeFocused()

    await addYearPage.getAnyYearInput.setValue('5')
    await addYearPage.continueButton.click()
    const enterAValidYearError = await common
      .errorSummaryItemByText('Enter a 4-digit year, for example 2009.')
      .getText()
    const expectedEnterAValidYearError =
      'Enter a 4-digit year, for example 2009.'
    await expect(enterAValidYearError).toMatch(expectedEnterAValidYearError)
    const enterAValidYearErrorLink = await common.errorSummaryItemByText(
      'Enter a 4-digit year, for example 2009.'
    )
    await enterAValidYearErrorLink.click()
    await expect(await addYearPage.getAnyYearInput).toBeFocused()

    await addYearPage.getRangeOfYearsOption.click()
    await addYearPage.continueButton.click()
    const enterStartYearError = await common
      .errorSummaryItemByText('Enter a start year.')
      .getText()
    const expectedEnterStartYearError = 'Enter a start year.'
    await expect(enterStartYearError).toMatch(expectedEnterStartYearError)
    const enterEndYearError = await common
      .errorSummaryItemByText('Enter an end year.')
      .getText()
    const expectedEnterEndYearError = 'Enter an end year.'
    await expect(enterEndYearError).toMatch(expectedEnterEndYearError)
    const enterStartYearErrorLink = await common.errorSummaryItemByText(
      'Enter a start year.'
    )
    await enterStartYearErrorLink.click()
    await expect(await addYearPage.getRangeOfYearsStartYearInput).toBeFocused()
    const enterEndYearErrorLink =
      await common.errorSummaryItemByText('Enter an end year.')
    await enterEndYearErrorLink.click()
    await expect(await addYearPage.getRangeOfYearsEndYearInput).toBeFocused()

    await addYearPage.getRangeOfYearsStartYearInput.setValue('2009')
    await addYearPage.continueButton.click()
    const enterEndYearError2 = await common
      .errorSummaryItemByText('Enter an end year.')
      .getText()
    const expectedEnterEndYearError2 = 'Enter an end year.'
    await expect(enterEndYearError2).toMatch(expectedEnterEndYearError2)
    await common.clearInput(addYearPage.getRangeOfYearsStartYearInput)

    await addYearPage.getRangeOfYearsEndYearInput.setValue('2009')
    await addYearPage.continueButton.click()
    const enterAStartYearError = await common
      .errorSummaryItemByText('Enter a start year.')
      .getText()
    const expectedEnterAStartYearError = 'Enter a start year.'
    await expect(enterAStartYearError).toMatch(expectedEnterAStartYearError)

    await addYearPage.getRangeOfYearsStartYearInput.setValue('2020')
    await addYearPage.continueButton.click()
    const startYearBeforeEndYearError = await common
      .errorSummaryItemByText(
        'Start year must be the same as or before the end year.'
      )
      .getText()
    const expectedStartYearBeforeEndYearError =
      'Start year must be the same as or before the end year.'
    await expect(startYearBeforeEndYearError).toMatch(
      expectedStartYearBeforeEndYearError
    )
    const endYearAfterStartYearError = await common
      .errorSummaryItemByText(
        'End year must be the same as or after the start year.'
      )
      .getText()
    const expectedEndYearAfterStartYearError =
      'End year must be the same as or after the start year.'
    await expect(endYearAfterStartYearError).toMatch(
      expectedEndYearAfterStartYearError
    )

    const startYearBeforeEndYearErrorLink = await common.errorSummaryItemByText(
      'Start year must be the same as or before the end year.'
    )
    await startYearBeforeEndYearErrorLink.click()
    await expect(await addYearPage.getRangeOfYearsStartYearInput).toBeFocused()
    const endYearAfterStartYearErrorLink = await common.errorSummaryItemByText(
      'End year must be the same as or after the start year.'
    )
    await endYearAfterStartYearErrorLink.click()
    await expect(await addYearPage.getRangeOfYearsEndYearInput).toBeFocused()

    await common.clearInput(addYearPage.getRangeOfYearsStartYearInput)
    await common.clearInput(addYearPage.getRangeOfYearsEndYearInput)
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2010')
    await addYearPage.getRangeOfYearsEndYearInput.setValue('2015')
    await addYearPage.continueButton.click()
    const rangeOfYearsExceedLimitError = await common
      .errorSummaryItemByText('Choose up to 5 whole years at a time')
      .getText()
    const expectedRangeOfYearsExceedLimitError =
      'Choose up to 5 whole years at a time'
    await expect(rangeOfYearsExceedLimitError).toMatch(
      expectedRangeOfYearsExceedLimitError
    )

    const rangeOfYearsExceedLimitErrorLink =
      await common.errorSummaryItemByText(
        'Choose up to 5 whole years at a time'
      )
    await rangeOfYearsExceedLimitErrorLink.click()
    await expect(await addYearPage.getRangeOfYearsStartYearInput).toBeFocused()
  })

  it('Add year to date - AQD-841', async () => {
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

    const selectedYearValue = await customselectionPage.getYearValue.getText()
    const todaysDate = await common.getTodayAsDayMonthString()
    const expectedSelectedYearValue = `1 January to ${todaysDate}`
    await expect(selectedYearValue).toMatch(expectedSelectedYearValue)
    const getAddChangeYearLinkText =
      await customselectionPage.getAddChangeYearLink.getText()
    const expectedGetAddChangeYearLinkText = 'Change'
    await expect(getAddChangeYearLinkText).toMatch(
      expectedGetAddChangeYearLinkText
    )
  })

  it('Add any year - AQD-841', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    // selecting a singular year
    await addYearPage.getAnyYearOption.click()
    await addYearPage.getAnyYearInput.setValue('2020')
    await addYearPage.continueButton.click()
    const selectedYearValue = await customselectionPage.getYearValue.getText()
    const expectedSelectedYearValue = '2020'
    await expect(selectedYearValue).toMatch(expectedSelectedYearValue)
    const getAddChangeYearLinkText =
      await customselectionPage.getAddChangeYearLink.getText()
    const expectedGetAddChangeYearLinkText = 'Change'
    await expect(getAddChangeYearLinkText).toMatch(
      expectedGetAddChangeYearLinkText
    )
    // selecting current year as the singular year
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getAnyYearOption.click()
    await common.clearInput(addYearPage.getAnyYearInput)
    const todaysDate = await common.getTodayAsDayMonthString()
    await addYearPage.getAnyYearInput.setValue(todaysDate.slice(-4))
    await common.legalWait()
    await addYearPage.continueButton.click()
    const selectedCurrentYearValue =
      await customselectionPage.getYearValue.getText()
    const expectedSelectedCurrentYearValue = `1 January to ${todaysDate}`
    await expect(selectedCurrentYearValue).toMatch(
      expectedSelectedCurrentYearValue
    )
  })
  it('Add range year - AQD-841', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    // selecting a range of years
    await addYearPage.getRangeOfYearsOption.click()
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2015')
    await addYearPage.getRangeOfYearsEndYearInput.setValue('2019')
    await addYearPage.continueButton.click()
    const selectedRangeYearValue =
      await customselectionPage.getYearValue.getText()
    const expectedSelectedRangeYearValue = '1 January 2015 to 31 December 2019'
    await expect(selectedRangeYearValue).toMatch(expectedSelectedRangeYearValue)
    const getAddChangeYearLinkText =
      await customselectionPage.getAddChangeYearLink.getText()
    const expectedGetAddChangeYearLinkText = 'Change'
    await expect(getAddChangeYearLinkText).toMatch(
      expectedGetAddChangeYearLinkText
    )

    // selecting a range of years with current year as end year
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getRangeOfYearsOption.click()
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2022')
    const todaysDate = await common.getTodayAsDayMonthString()
    await addYearPage.getRangeOfYearsEndYearInput.setValue(todaysDate.slice(-4))
    await addYearPage.continueButton.click()
    const selectedRangeWithCurrentYearValue =
      await customselectionPage.getYearValue.getText()
    const expectedSelectedRangeWithCurrentYearValue = `1 January 2022 to ${todaysDate}`
    await expect(selectedRangeWithCurrentYearValue).toMatch(
      expectedSelectedRangeWithCurrentYearValue
    )

    // selecting a range of years with current year as start year and end year
    await customselectionPage.getAddChangeYearLink.click()
    await common.clearInput(addYearPage.getRangeOfYearsStartYearInput)
    await common.clearInput(addYearPage.getRangeOfYearsEndYearInput)
    await addYearPage.getRangeOfYearsOption.click()
    const todaysDate2 = await common.getTodayAsDayMonthString()
    await addYearPage.getRangeOfYearsStartYearInput.setValue(
      todaysDate2.slice(-4)
    )
    await addYearPage.getRangeOfYearsEndYearInput.setValue(
      todaysDate2.slice(-4)
    )
    await addYearPage.continueButton.click()
    const selectedRangeWithCurrentYearAsStartAndEndValue =
      await customselectionPage.getYearValue.getText()
    const expectedSelectedRangeWithCurrentYearAsStartAndEndValue = `1 January 2026 to ${todaysDate2}`
    await expect(selectedRangeWithCurrentYearAsStartAndEndValue).toMatch(
      expectedSelectedRangeWithCurrentYearAsStartAndEndValue
    )
  })

  it('AQD-1041 wrong year option retained after range of years is selected', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()

    await addYearPage.getRangeOfYearsOption.click()
    await addYearPage.getRangeOfYearsStartYearInput.setValue('2015')
    await addYearPage.getRangeOfYearsEndYearInput.setValue('2019')
    await addYearPage.continueButton.click()

    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getYearToDateOption.click()
    await addYearPage.continueButton.click()

    await customselectionPage.getAddChangeYearLink.click()
    const isYearToDateRadioSelected =
      await addYearPage.getYearToDateRadio.isSelected()
    await expect(isYearToDateRadioSelected).toBe(true)
  })

  it('AQD-1220, defect - error message box has spread across the page on add year flow', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('sulphur dioxide')
    await common.continueButton.click()
    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.continueButton.click()

    const selectAnOptionBeforeContinuingErrorBox = await addYearPage.errorBox
    const actualWidth = await common.getRenderedWidth(
      selectAnOptionBeforeContinuingErrorBox
    )
    expect(actualWidth).toBe(630)

    await addYearPage.getAnyYearOption.click()
    await addYearPage.continueButton.click()
    await common.legalWait()
    const selectAYearErrorBox = await addYearPage.errorBox
    const selectAYearErrorBoxActualWidth =
      await common.getRenderedWidth(selectAYearErrorBox)
    expect(selectAYearErrorBoxActualWidth).toBe(630)

    await addYearPage.getRangeOfYearsOption.click()
    await addYearPage.continueButton.click()
    await common.legalWait()
    const selectARangeOfYearsErrorBox = await addYearPage.errorBox
    const selectARangeOfYearsErrorBoxActualWidth =
      await common.getRenderedWidth(selectARangeOfYearsErrorBox)
    expect(selectARangeOfYearsErrorBoxActualWidth).toBe(630)
  })

  it('AQD-1604, last 7 days date/data differences', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('PM10')
    await common.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getEnglandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()

    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getLastSevenDaysOption.click()
    await addYearPage.continueButton.click()

    const selectedYearValue = await customselectionPage.getYearValue.getText()
    const normalisedSelectedYearValue = selectedYearValue
      .replace(/\s+/g, ' ')
      .trim()

    const formatDateForUi = (date) =>
      date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })

    const now = new Date()
    const expectedStartDate = new Date(now)
    expectedStartDate.setDate(now.getDate() - 7)
    const expectedEndDate = new Date(now)
    expectedEndDate.setDate(now.getDate() - 1)

    const expectedStartDateText = formatDateForUi(expectedStartDate)
    const expectedEndDateText = formatDateForUi(expectedEndDate)
    const expectedSelectedYearValue = `${expectedStartDateText} to ${expectedEndDateText}`

    await expect(normalisedSelectedYearValue).toBe(expectedSelectedYearValue)

    const DOWNLOAD_DIR = path.resolve(process.cwd(), 'downloads')
    try {
      fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true })
    } catch {}
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true })

    await customselectionPage.getContinueButton.click()
    await DownloadYourDataPage.getDownloadLastSevenDaysHourlyData.click()

    await browser.waitUntil(
      () => {
        try {
          const files = fs
            .readdirSync(DOWNLOAD_DIR)
            .filter(
              (fileName) =>
                !fileName.endsWith('.crdownload') && !fileName.endsWith('.tmp')
            )

          if (files.length === 0) return false

          const mostRecentFile = files
            .map((fileName) => ({
              fileName,
              fullPath: path.join(DOWNLOAD_DIR, fileName),
              mtime: fs.statSync(path.join(DOWNLOAD_DIR, fileName)).mtimeMs
            }))
            .sort((a, b) => b.mtime - a.mtime)[0]

          return fs.statSync(mostRecentFile.fullPath).size > 0
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

    const downloadedFilePath = fs
      .readdirSync(DOWNLOAD_DIR)
      .filter(
        (fileName) =>
          !fileName.endsWith('.crdownload') && !fileName.endsWith('.tmp')
      )
      .map((fileName) => ({
        fileName,
        fullPath: path.join(DOWNLOAD_DIR, fileName),
        mtime: fs.statSync(path.join(DOWNLOAD_DIR, fileName)).mtimeMs
      }))
      .sort((a, b) => b.mtime - a.mtime)[0].fullPath

    const downloadedFileName = path.basename(downloadedFilePath).toLowerCase()

    let csvFilePath = downloadedFilePath
    if (downloadedFileName.endsWith('.zip')) {
      execSync(
        `powershell -Command "Expand-Archive -Path '${downloadedFilePath}' -DestinationPath '${DOWNLOAD_DIR}' -Force"`
      )

      const extractedCsvFiles = fs
        .readdirSync(DOWNLOAD_DIR)
        .filter((fileName) => fileName.toLowerCase().endsWith('.csv'))
        .map((fileName) => ({
          fullPath: path.join(DOWNLOAD_DIR, fileName),
          mtime: fs.statSync(path.join(DOWNLOAD_DIR, fileName)).mtimeMs
        }))
        .sort((a, b) => b.mtime - a.mtime)

      expect(extractedCsvFiles.length).toBeGreaterThan(0)
      csvFilePath = extractedCsvFiles[0].fullPath
    } else {
      await expect(downloadedFileName.endsWith('.csv')).toBe(true)
    }

    const csvContent = fs.readFileSync(csvFilePath, 'utf-8')

    const parseCsvLine = (line) => {
      const values = []
      let currentValue = ''
      let inQuotes = false

      for (let index = 0; index < line.length; index += 1) {
        const character = line[index]
        if (character === '"') {
          if (inQuotes && line[index + 1] === '"') {
            currentValue += '"'
            index += 1
          } else {
            inQuotes = !inQuotes
          }
        } else if (character === ',' && !inQuotes) {
          values.push(currentValue)
          currentValue = ''
        } else {
          currentValue += character
        }
      }

      values.push(currentValue)
      return values.map((value) => value.trim())
    }

    const toIsoDate = (date) => {
      const year = date.getFullYear()
      const month = `${date.getMonth() + 1}`.padStart(2, '0')
      const day = `${date.getDate()}`.padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    const parseDateToIso = (rawValue) => {
      const value = rawValue.replace(/"/g, '').trim()
      if (!value) return null

      const isoMatch = value.match(/^(\d{4}-\d{2}-\d{2})/)
      if (isoMatch) return isoMatch[1]

      const slashDateMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
      if (slashDateMatch) {
        const [, day, month, year] = slashDateMatch
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }

      const longDateMatch = value.match(/^([0-9]{1,2}\s+[A-Za-z]+\s+[0-9]{4})/)
      if (longDateMatch) {
        const parsed = new Date(longDateMatch[1])
        if (!Number.isNaN(parsed.getTime())) return toIsoDate(parsed)
      }

      const fallback = new Date(value)
      if (!Number.isNaN(fallback.getTime())) return toIsoDate(fallback)

      return null
    }

    const rows = csvContent
      .split(/\r?\n/)
      .map((row) => row.trim())
      .filter((row) => row !== '')

    expect(rows.length).toBeGreaterThan(1)

    const headerRowIndex = rows.findIndex((row) => {
      const columns = parseCsvLine(row).map((column) =>
        column.replace(/"/g, '').toLowerCase()
      )

      const hasDateColumn = columns.some((column) => /date|time/.test(column))
      const hasDataColumns = columns.some((column) =>
        /pollutant|value|site|station/.test(column)
      )

      return hasDateColumn && hasDataColumns
    })

    expect(headerRowIndex).toBeGreaterThanOrEqual(0)

    const headers = parseCsvLine(rows[headerRowIndex]).map((header) =>
      header.replace(/"/g, '').trim().toLowerCase()
    )

    const dateColumnIndex = headers.findIndex((header) =>
      /date|time/.test(header)
    )
    expect(dateColumnIndex).toBeGreaterThanOrEqual(0)

    const dataRows = rows.slice(headerRowIndex + 1)
    expect(dataRows.length).toBeGreaterThan(0)

    const parsedIsoDates = []
    for (const dataRow of dataRows) {
      const columns = parseCsvLine(dataRow)
      if (columns.length <= dateColumnIndex) continue
      const parsedIsoDate = parseDateToIso(columns[dateColumnIndex])
      if (parsedIsoDate) parsedIsoDates.push(parsedIsoDate)
    }

    expect(parsedIsoDates.length).toBeGreaterThan(0)

    const expectedStartIso = toIsoDate(expectedStartDate)
    const expectedEndIso = toIsoDate(expectedEndDate)

    const outOfRangeDates = parsedIsoDates.filter(
      (dateValue) => dateValue < expectedStartIso || dateValue > expectedEndIso
    )

    expect(outOfRangeDates.length).toBe(0)

    const minDownloadedIsoDate = [...parsedIsoDates].sort()[0]
    const maxDownloadedIsoDate = [...parsedIsoDates].sort().reverse()[0]

    expect(minDownloadedIsoDate).toBe(expectedStartIso)
    expect(maxDownloadedIsoDate).toBe(expectedEndIso)
  })

  it('AQD-1627,AQD-1526, user should be blocked from download page when selecting last 7 days and non aurn pollutant', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('Particulate calcium (Ca)')
    await common.continueButton.click()
    await customselectionPage.getAddChangeLocationLink.click()
    await addLocationPage.getCountriesOption.click()
    await addLocationPage.getEnglandCheckbox.click()
    await addLocationPage.getLocationContinueButton.click()

    await customselectionPage.getAddChangeYearLink.click()
    await addYearPage.getLastSevenDaysOption.click()
    await addYearPage.continueButton.click()
    await customselectionPage.getContinueButton.click()

    const errorMessage =
      await customselectionPage.getLastSevenDaysErrorSummaryMessage.getText()
    const expectedErrorMessage = `There is a problem
There are no stations available based on your selection. Change the time period
Change the time period`
    await expect(errorMessage).toMatch(expectedErrorMessage)

    await customselectionPage.getChangeTheTimePeriodErrorLink.click()
    const url = await browser.getUrl()
    await expect(url).toContain('/year-aurn/change')
  })
})
