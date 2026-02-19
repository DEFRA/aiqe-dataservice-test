import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
describe('add group of pollutants AQD-832', () => {
  it('content', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()

    const getAddGroupOfPollutantsOptionText =
      await addPollutantPage.getAddGroupOfPollutantsOption.getText()
    const AddGroupOfPollutantsOptionText = 'Add a group of pollutants'
    await expect(getAddGroupOfPollutantsOptionText).toMatch(
      AddGroupOfPollutantsOptionText
    )

    const getPollutantGroupHintText =
      await addPollutantPage.getPollutantGroupHint.getText()
    const PollutantGroupHintText = 'Select one option'
    await expect(getPollutantGroupHintText).toMatch(PollutantGroupHintText)

    const getDAQIOptionTitleText =
      await addPollutantPage.getDAQIOptionTitle.getText()
    const DAQIOptionTitleText = 'Daily Air Quality Index (DAQI) pollutants'
    await expect(getDAQIOptionTitleText).toMatch(DAQIOptionTitleText)

    const getDAQIOptionDescriptionText =
      await addPollutantPage.getDAQIOptionDescription.getText()
    const DAQIOptionDescriptionText =
      'fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), ozone (O3), sulphur dioxide (SO2)'
    await expect(getDAQIOptionDescriptionText).toMatch(
      DAQIOptionDescriptionText
    )

    const getAQSROptionTitleText =
      await addPollutantPage.getAQSROptionTitle.getText()
    const AQSROptionTitleText =
      'Pollutants in the Air Quality Standards Regulations 2010'
    await expect(getAQSROptionTitleText).toMatch(AQSROptionTitleText)

    const getAQSROptionDescriptionText =
      await addPollutantPage.getAQSROptionDescription.getText()
    const AQSROptionDescriptionText =
      'fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), ozone (O3), sulphur dioxide (SO2), nitric oxide (NO), nitrogen oxides as nitrogen dioxide (NOx as NO2), carbon monoxide (CO)'
    await expect(getAQSROptionDescriptionText).toMatch(
      AQSROptionDescriptionText
    )
  })
  it('styling checks', async () => {
    const AddGroupOfPollutantsOption = [
      await addPollutantPage.getAddGroupOfPollutantsOption
    ]

    const AddGroupOfPollutantsOptionProperties = [
      'align-self',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of AddGroupOfPollutantsOption) {
      const styles = await common.getStyles(
        element,
        AddGroupOfPollutantsOptionProperties
      )
      expect(styles['align-self']).toBe('center')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getPollutantGroupHint = [await addPollutantPage.getPollutantGroupHint]

    const getPollutantGroupHintProperties = [
      'margin-bottom',
      'margin-top',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getPollutantGroupHint) {
      const styles = await common.getStyles(
        element,
        getPollutantGroupHintProperties
      )
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['margin-top']).toBe('-5px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getDAQIOptionTitle = [await addPollutantPage.getDAQIOptionTitle]

    const getDAQIOptionTitleProperties = [
      'align-self',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getDAQIOptionTitle) {
      const styles = await common.getStyles(
        element,
        getDAQIOptionTitleProperties
      )
      expect(styles['align-self']).toBe('center')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getDAQIOptionDescription = [
      await addPollutantPage.getDAQIOptionDescription
    ]

    const getDAQIOptionDescriptionProperties = [
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

    for (const element of getDAQIOptionDescription) {
      const styles = await common.getStyles(
        element,
        getDAQIOptionDescriptionProperties
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

    const getAQSROptionTitle = [await addPollutantPage.getAQSROptionTitle]

    const getAQSROptionTitleProperties = [
      'align-self',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getAQSROptionTitle) {
      const styles = await common.getStyles(
        element,
        getAQSROptionTitleProperties
      )
      expect(styles['align-self']).toBe('center')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getAQSROptionDescription = [
      await addPollutantPage.getAQSROptionDescription
    ]

    const getAQSROptionDescriptionProperties = [
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

    for (const element of getAQSROptionDescription) {
      const styles = await common.getStyles(
        element,
        getAQSROptionDescriptionProperties
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

  it('error - Select a pollutant group', async () => {
    await common.continueButton.click()
    await common
      .errorSummaryItemByText('Select a pollutant group')
      .waitForExist({ timeout: 5000 })
    const selectAPollutantGroupMessage = await common
      .errorSummaryItemByText('Select a pollutant group')
      .getText()
    const expectedSelectAPollutantGroupMessage = 'Select a pollutant group'
    await expect(selectAPollutantGroupMessage).toMatch(
      expectedSelectAPollutantGroupMessage
    )
  })

  it('adding a pollutant group', async () => {
    await addPollutantPage.getDAQIOptionTitle.click()
    await common.continueButton.click()
    const selectedDAQIPollutants =
      await customselectionPage.getPollutantValue.getText()
    const expectedSelectedDAQIPollutants = `Particulate matter (PM2.5)
Particulate matter (PM10)
Nitrogen dioxide (NO2)
Ozone (O3)
Sulphur dioxide (SO2)`
    await expect(selectedDAQIPollutants).toMatch(expectedSelectedDAQIPollutants)
    await customselectionPage.getChangePollutantLink.click()
    const isAddGroupOfPollutantsRadioSelected =
      await addPollutantPage.getAddGroupOfPollutantsRadio.isSelected()
    await expect(isAddGroupOfPollutantsRadioSelected).toBe(true)
    const isDAQIOptionRadioSelected =
      await addPollutantPage.getDAQIOptionRadio.isSelected()
    await expect(isDAQIOptionRadioSelected).toBe(true)
    await addPollutantPage.getAQSROptionTitle.click()
    await common.continueButton.click()
    const selectedAQSRPollutants =
      await customselectionPage.getPollutantValue.getText()
    const expectedSelectedAQSRPollutants = `Particulate matter (PM2.5)
Particulate matter (PM10)
Nitrogen dioxide (NO2)
Ozone (O3)
Sulphur dioxide (SO2)
Nitric oxide (NO)
Nitrogen oxides as nitrogen dioxide (NOx as NO2)
Carbon monoxide (CO)`
    await expect(selectedAQSRPollutants).toMatch(expectedSelectedAQSRPollutants)
    await customselectionPage.getChangePollutantLink.click()
    const isAddGroupOfPollutantsRadioSelected2 =
      await addPollutantPage.getAddGroupOfPollutantsRadio.isSelected()
    await expect(isAddGroupOfPollutantsRadioSelected2).toBe(true)
    const isAQSROptionRadioSelected =
      await addPollutantPage.getAQSROptionRadio.isSelected()
    await expect(isAQSROptionRadioSelected).toBe(true)
  })

  it('AQD-1026 session data keeping group of pollutants when individual option is selected', async () => {
    await addPollutantPage.getAddPollutantOption.click()
    const previousPollutantSelection =
      await addPollutantPage.getFirstAddedPollutantLabel
    await common.notDisplayed(previousPollutantSelection)
  })
})
