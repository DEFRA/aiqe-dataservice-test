import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
describe('add pollutant', () => {
  it('content and titles AQD-828', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    // page content validation
    const addPollutantPagecontent = `Add pollutant(s)
Select one option
Add pollutant(s)
Add a group of pollutants
Continue`
    const getaddPollutantPagecontent =
      await addPollutantPage.getAddPollutantPageContent.getText()
    await expect(addPollutantPagecontent).toMatch(getaddPollutantPagecontent)
  })

  it('link checks', async () => {
    await common.getBackLink.click()
    const getCurrentUrl1 = await browser.getUrl()
    const expectedCurrentURL = '/customdataset'
    await expect(getCurrentUrl1).toMatch(expectedCurrentURL)
    await customselectionPage.getAddPollutantLink.click()
  })
  it('styling checks', async () => {
    const getAddPollutantHeading = [
      await addPollutantPage.getAddPollutantHeading
    ]

    const addPollutantHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getAddPollutantHeading) {
      const styles = await common.getStyles(
        element,
        addPollutantHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const pageContent = [await addPollutantPage.getAddPollutantPageContent]

    const pageContentProperties = ['padding-bottom', 'padding-top']

    for (const element of pageContent) {
      const styles = await common.getStyles(element, pageContentProperties)
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const getSelectOneOptionText = [
      await addPollutantPage.getSelectOneOptionText
    ]

    const getSelectOneOptionTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getSelectOneOptionText) {
      const styles = await common.getStyles(
        element,
        getSelectOneOptionTextProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('15px')
    }

    const getAddPollutantOption = [await addPollutantPage.getAddPollutantOption]

    const getAddPollutantOptionProperties = [
      'align-self',
      'margin-bottom',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'height',
      'width'
    ]

    for (const element of getAddPollutantOption) {
      const styles = await common.getStyles(
        element,
        getAddPollutantOptionProperties
      )
      expect(styles['align-self']).toBe('center')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.height).toBe('25px')
    }

    const getAddGroupOfPollutantsOption = [
      await addPollutantPage.getAddGroupOfPollutantsOption
    ]

    const getAddGroupOfPollutantsOptionProperties = [
      'align-self',
      'margin-bottom',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'height',
      'width'
    ]

    for (const element of getAddGroupOfPollutantsOption) {
      const styles = await common.getStyles(
        element,
        getAddGroupOfPollutantsOptionProperties
      )
      expect(styles['align-self']).toBe('center')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.height).toBe('25px')
    }
  })

  it('add one pollutant - AQD-984,AQD-829', async () => {
    await addPollutantPage.getAddPollutantOption.click()

    const getAddUpToTenPollutantsText =
      await addPollutantPage.getAddUpToTenPollutantsText.getText()
    const addUpToTenPollutantsText = 'Add up to 10 pollutants'
    await expect(getAddUpToTenPollutantsText).toMatch(addUpToTenPollutantsText)

    const getAddUpToTenPollutantsTextStyles = [
      await addPollutantPage.getAddUpToTenPollutantsText
    ]
    const getAddUpToTenPollutantsTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of getAddUpToTenPollutantsTextStyles) {
      const styles = await common.getStyles(
        element,
        getAddUpToTenPollutantsTextProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('15px')
    }

    const getAddPollutantButtonStyles = [
      await addPollutantPage.getAddPollutantButton
    ]
    const getAddPollutantButtonProperties = [
      'margin-right',
      'margin-bottom',
      'color',
      'background-color',
      'font-size',
      'line-height',
      'font-family',
      'padding',
      'text-align'
    ]

    for (const element of getAddPollutantButtonStyles) {
      const styles = await common.getStyles(
        element,
        getAddPollutantButtonProperties
      )
      expect(styles['margin-right']).toBe('15px')
      expect(styles['margin-bottom']).toBe('17px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['background-color']).toBe('rgb(243, 242, 241)')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles['text-align']).toBe('center')
    }

    await addPollutantPage.addPollutant('Sulphur dioxide')
    /* const addedPollutantsTitleText =
      await addPollutantPage.getAddedPollutantsTitle.getText()
    const expectedAddedPollutantsTitleText = 'Added pollutants'
    await expect(addedPollutantsTitleText).toMatch(
      expectedAddedPollutantsTitleText
    ) */

    const FirstAddedPollutantLabel =
      await addPollutantPage.getFirstAddedPollutantLabel.getText()
    const expectedFirstAddedPollutantLabelText = 'Pollutant 1'
    await expect(FirstAddedPollutantLabel).toMatch(
      expectedFirstAddedPollutantLabelText
    )

    const firstAddedPollutantValue =
      await addPollutantPage.getFirstAddedPollutantValue.getText()
    const expectedgetFirstAddedPollutantValue = 'Sulphur dioxide (SO2)'
    await expect(firstAddedPollutantValue).toMatch(
      expectedgetFirstAddedPollutantValue
    )

    const firstAddedPollutantRemoveLink =
      await addPollutantPage.getFirstAddedPollutantRemoveLink.getText()
    const expectedFirstAddedPollutantRemoveLink = 'Remove'
    await expect(firstAddedPollutantRemoveLink).toMatch(
      expectedFirstAddedPollutantRemoveLink
    )

    await addPollutantPage.getFirstAddedPollutantRemoveLink.click()
    await common.notDisplayed(
      await addPollutantPage.getFirstAddedPollutantValue
    )

    await addPollutantPage.addPollutant('Sulphur dioxide')
    const addAnotherPollutantButtonText =
      await addPollutantPage.getAddPollutantButton.getText()
    const expectedAddAnotherPollutantButtonText = 'Add another pollutant'
    await expect(addAnotherPollutantButtonText).toMatch(
      expectedAddAnotherPollutantButtonText
    )

    /* const getAddedPollutantsTitle = [
      await addPollutantPage.getAddedPollutantsTitle
    ]
    const getAddedPollutantsTitleProperties = [
      'font-size',
      'line-height',
      'margin-bottom',
      'font-weight',
      'text-align',
      'font-family',
      'color'
    ]
    for (const element of getAddedPollutantsTitle) {
      const styles = await common.getStyles(
        element,
        getAddedPollutantsTitleProperties
      )
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-weight']).toBe('700')
      expect(styles['text-align']).toBe('left')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    } */

    const getFirstAddedPollutantLabel = [
      await addPollutantPage.getFirstAddedPollutantLabel
    ]
    const getFirstAddedPollutantLabelProperties = [
      'padding',
      'text-align',
      'font-weight',
      'font-size',
      'line-height',
      'font-family',
      'color'
    ]
    for (const element of getFirstAddedPollutantLabel) {
      const styles = await common.getStyles(
        element,
        getFirstAddedPollutantLabelProperties
      )
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['font-weight']).toBe('700')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getFirstAddedPollutantValue = [
      await addPollutantPage.getFirstAddedPollutantValue
    ]
    const getFirstAddedPollutantValueProperties = [
      'padding',
      'text-align',
      'font-weight',
      'font-size',
      'line-height',
      'font-family',
      'color'
    ]
    for (const element of getFirstAddedPollutantValue) {
      const styles = await common.getStyles(
        element,
        getFirstAddedPollutantValueProperties
      )
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['font-weight']).toBe('400')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getFirstAddedPollutantRemoveLink = [
      await addPollutantPage.getFirstAddedPollutantRemoveLink
    ]
    const getFirstAddedPollutantRemoveLinkProperties = [
      'color',
      'font-family',
      'font-size',
      'line-height',
      'text-align',
      'font-weight'
    ]
    for (const element of getFirstAddedPollutantRemoveLink) {
      const styles = await common.getStyles(
        element,
        getFirstAddedPollutantRemoveLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['text-align']).toBe('left')
      expect(styles['font-weight']).toBe('400')
    }
    await common.continueButton.click()
    const selectedPollutantValue =
      await customselectionPage.getPollutantValue.getText()
    const expectedSelectedPollutantValue = 'Sulphur dioxide (SO2)'
    await expect(selectedPollutantValue).toMatch(expectedSelectedPollutantValue)

    const changePollutantLink =
      await customselectionPage.getAddPollutantLink.getText()
    const expectedchangePollutantLink = 'Change'
    await expect(changePollutantLink).toMatch(expectedchangePollutantLink)
  })

  it('previous selected pollutants are retained when change link is selected - AQD-984,AQD-829', async () => {
    await customselectionPage.getChangePollutantLink.click()
    await addPollutantPage.getAddPollutantRadio.isSelected()
    const retainedPollutant =
      await addPollutantPage.getFirstAddedPollutantValue.getText()
    const expectedRetainedPollutant = 'Sulphur dioxide (SO2)'
    await expect(retainedPollutant).toMatch(expectedRetainedPollutant)
  })

  it('add and confirm more than one pollutant - AQD-984,AQD-829', async () => {
    await addPollutantPage.addPollutant('Nitrogen dioxide')
    await addPollutantPage.addPollutant('Ozone')
    await common.continueButton.click()
    const PollutantList = await customselectionPage.getPollutantValue.getText()
    const expectedPollutantList = `Sulphur dioxide (SO2)
Nitrogen dioxide (NO2)
Ozone (O3)`
    await expect(PollutantList).toMatch(expectedPollutantList)
  })

  it('clear selections - AQD-890,AQD-925,AQD-930', async () => {
    await customselectionPage.getClearSelectionsLink.click()
    const clearedPollutantList =
      await customselectionPage.getPollutantValue.getText()
    const expectedClearedPollutantList = 'None selected'
    await expect(clearedPollutantList).toMatch(expectedClearedPollutantList)
    await common.getBackLink.isDisplayed()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await common.notDisplayed(await addPollutantPage.getAddedPollutantsTitle)
    const addPollutantButtonText =
      await addPollutantPage.getAddPollutantButton.getText()
    const expectedAddPollutantButtonText = 'Add'
    await expect(addPollutantButtonText).toMatch(expectedAddPollutantButtonText)
  })

  it('error validation - AQD-984,AQD-829', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    await customselectionPage.getAddPollutantLink.click()
    await common.continueButton.click()

    const continueErrorMessage = await common
      .errorSummaryItemByText('Select an option before continuing')
      .getText()
    const expectedErrorMessage = 'Select an option before continuing'
    await expect(continueErrorMessage).toMatch(expectedErrorMessage)

    await addPollutantPage.getAddPollutantOption.click()
    await common.continueButton.click()
    const addOnePollutantErrorMessage = await common
      .errorSummaryItemByText('Please add at least one pollutant')
      .getText()
    const expectedaddOnePollutantErrorMessage =
      'Please add at least one pollutant'
    await expect(addOnePollutantErrorMessage).toMatch(
      expectedaddOnePollutantErrorMessage
    )

    await addPollutantPage.getAddPollutantButton.click()
    const getAddAPollutantErrorMessage = await common
      .errorSummaryItemByText('Please add a pollutant')
      .getText()
    const expectedgetAddAPollutantErrorMessage = 'Please add a pollutant'
    await expect(getAddAPollutantErrorMessage).toMatch(
      expectedgetAddAPollutantErrorMessage
    )
  })

  it('search is not case sensitive - AQD-984,AQD-829', async () => {
    await addPollutantPage.getAddPollutantSearchBox.setValue('sulphur dioxide')
    const lowerCaseSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedlowerCaseSearchMatch = 'Sulphur dioxide (SO2)'
    await expect(lowerCaseSearchMatch).toMatch(expectedlowerCaseSearchMatch)
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)
    await addPollutantPage.getAddPollutantSearchBox.setValue('SULPHUR DIOXIDE')
    const upperCaseSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedupperCaseSearchMatch = 'Sulphur dioxide (SO2)'
    await expect(upperCaseSearchMatch).toMatch(expectedupperCaseSearchMatch)
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)
  })

  it('only relevant pollutants that match the search criteria is displayed - AQD-984,AQD-829', async () => {
    await addPollutantPage.getAddPollutantSearchBox.setValue('SULPHUR DIOXIDE')
    const searchMissMatch =
      await addPollutantPage.getAddPollutantSearchBox.getText()
    const expectedMisMatch = 'Fine particulate matter (PM2.5)'
    await expect(searchMissMatch).not.toMatch(expectedMisMatch)
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)
  })

  it('all pollutants on the AURN are available - AQD-984,AQD-829', async () => {
    await addPollutantPage.getAddPollutantSearchBox.setValue(
      'Particulate matter (PM10)'
    )
    const ParticulateMatterSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedParticulateMatterSearchMatch = 'Particulate matter (PM10)'
    await expect(ParticulateMatterSearchMatch).toMatch(
      expectedParticulateMatterSearchMatch
    )
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)

    await addPollutantPage.getAddPollutantSearchBox.setValue(
      'Fine particulate matter'
    )
    const fineParticulateMatterSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedFineParticulateMatterSearchMatch =
      'Fine particulate matter (PM2.5)'
    await expect(fineParticulateMatterSearchMatch).toMatch(
      expectedFineParticulateMatterSearchMatch
    )
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)

    await addPollutantPage.getAddPollutantSearchBox.setValue('Nitrogen dioxide')
    const nitrogenDioxideSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedNitrogenDioxideSearchMatch = 'Nitrogen dioxide (NO2)'
    await expect(nitrogenDioxideSearchMatch).toMatch(
      expectedNitrogenDioxideSearchMatch
    )
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)

    await addPollutantPage.getAddPollutantSearchBox.setValue('Nitrogen oxides')
    const nitrogenOxidesSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedNitrogenOxidesSearchMatch =
      'Nitrogen oxides as nitrogen dioxide (NOx as NO2)'
    await expect(nitrogenOxidesSearchMatch).toMatch(
      expectedNitrogenOxidesSearchMatch
    )
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)

    await addPollutantPage.getAddPollutantSearchBox.setValue('Ozone')
    const ozoneSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedOzoneSearchMatch = 'Ozone (O3)'
    await expect(ozoneSearchMatch).toMatch(expectedOzoneSearchMatch)
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)

    await addPollutantPage.getAddPollutantSearchBox.setValue('Carbon monoxide')
    const carbonMonoxideSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedCarbonMonoxideSearchMatch = 'Carbon monoxide (CO)'
    await expect(carbonMonoxideSearchMatch).toMatch(
      expectedCarbonMonoxideSearchMatch
    )
    await addPollutantPage.getAddPollutantSearchBox.click()
    await browser.keys('Escape')
    await addPollutantPage.getAddPollutantSearchBox.clearValue()
    await browser.waitUntil(
      async () =>
        (await addPollutantPage.getAddPollutantSearchBox.getValue()) === '',
      { timeout: 3000, timeoutMsg: 'Search box did not clear' }
    )

    await addPollutantPage.getAddPollutantSearchBox.setValue('Nitric oxide')
    const nitricOxideSearchMatch =
      await addPollutantPage.getSearchFirstAutocomplete.getText()
    const expectedNitricOxideSearchMatch = 'Nitric oxide (NO)'
    await expect(nitricOxideSearchMatch).toMatch(expectedNitricOxideSearchMatch)
    await common.clearInput(addPollutantPage.getAddPollutantSearchBox)
  })

  it('pollutant numbering is updated When a pollutant is added or removed- AQD-984,AQD-829', async () => {
    const pollutantsToAdd = ['Sulphur dioxide', 'Nitrogen dioxide', 'Ozone']
    for (const pollutant of pollutantsToAdd) {
      await addPollutantPage.addPollutant(pollutant)
    }
    await common.legalWait()
    const firstAddedPollutantLabel =
      await addPollutantPage.getFirstAddedPollutantLabel.getText()
    const expectedFirstAddedPollutantLabel = 'Pollutant 1'
    await expect(firstAddedPollutantLabel).toMatch(
      expectedFirstAddedPollutantLabel
    )
    const secondAddedPollutantLabel =
      await addPollutantPage.getSecondAddedPollutantLabel.getText()
    const expectedSecondAddedPollutantLabel = 'Pollutant 2'
    await expect(secondAddedPollutantLabel).toMatch(
      expectedSecondAddedPollutantLabel
    )
    const thirdAddedPollutantLabel =
      await addPollutantPage.getThirdAddedPollutantLabel.getText()
    const expectedThirdAddedPollutantLabel = 'Pollutant 3'
    await expect(thirdAddedPollutantLabel).toMatch(
      expectedThirdAddedPollutantLabel
    )
    await addPollutantPage.getSecondAddedPollutantRemoveLink.click()
    await common.legalWait()
    const updatedFirstAddedPollutantLabel =
      await addPollutantPage.getFirstAddedPollutantLabel.getText()
    const expectedUpdatedFirstAddedPollutantLabel = 'Pollutant 1'
    await expect(updatedFirstAddedPollutantLabel).toMatch(
      expectedUpdatedFirstAddedPollutantLabel
    )
    const updatedSecondAddedPollutantLabel =
      await addPollutantPage.getSecondAddedPollutantLabel.getText()
    const expectedUpdatedSecondAddedPollutantLabel = 'Pollutant 2'
    await expect(updatedSecondAddedPollutantLabel).toMatch(
      expectedUpdatedSecondAddedPollutantLabel
    )
    await common.continueButton.click()
  })

  it('when selecting Sulphur dioxide individually , there are duplicate options - AQD-917', async () => {
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getChangePollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getAddPollutantSearchBox.setValue('Sulphur dioxide')
    const sulphurDioxideAutomcompleteList =
      await addPollutantPage.getAllSearchAutocompleteResults.getText()
    const expectedSulphurDioxideAutomcompleteList = 'Sulphur dioxide (SO2)'
    await expect(sulphurDioxideAutomcompleteList).toMatch(
      expectedSulphurDioxideAutomcompleteList
    )
    await common.getBackLink.click()
  })

  it('defect - adding fake pollutants - AQD-923', async () => {
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getChangePollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.getAddPollutantSearchBox.setValue('fake pollutant')
    await addPollutantPage.getAddPollutantButton.click()
    await addPollutantPage.getAddPollutantButton.click()
    const fakePollutantError = await common
      .errorSummaryItemByText('Please select a pollutant from the allowed list')
      .getText()
    const expectedfakePollutantError =
      'Please select a pollutant from the allowed list'
    await expect(fakePollutantError).toMatch(expectedfakePollutantError)
  })
})
