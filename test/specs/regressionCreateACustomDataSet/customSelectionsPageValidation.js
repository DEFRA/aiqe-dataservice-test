import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import headersObject from '../../page-objects/header.js'
import footer from '../../page-objects/footer.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
describe('custom selections page', () => {
  it('content and titles AQD-803', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()
    // page content validation
    const isHeaderOverallDisplayed =
      await headersObject.getHeaderOverall.isDisplayed()
    const isFooterOverallDisplayed = await footer.getFooterOverall.isDisplayed()
    await expect(isHeaderOverallDisplayed).toBe(true)
    await expect(isFooterOverallDisplayed).toBe(true)

    const customSelectionPageContent = `Create a custom dataset
Clear selections
Pollutant None selected Add
pollutant
Data sources Any
Year None selected
Location None selected
Continue`
    const getCustomSelectionPagecontent =
      await customselectionPage.getCustomSelectionPageContent.getText()
    await expect(customSelectionPageContent).toMatch(
      getCustomSelectionPagecontent
    )
  })

  it('link checks', async () => {
    await common.getBackLink.click()
    const getCurrentUrl1 = await browser.getUrl()
    const expectedCurrentURL = '/hubpage'
    await expect(getCurrentUrl1).toMatch(expectedCurrentURL)
    await hubPage.getCreateCustomDataSet.click()
  })

  it('styling checks', async () => {
    const getCustomSelectionHeading = [
      await customselectionPage.getCustomSelectionHeading
    ]

    const customSelectionHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getCustomSelectionHeading) {
      const styles = await common.getStyles(
        element,
        customSelectionHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const pageContent = [
      await customselectionPage.getCustomSelectionPageContent
    ]

    const pageContentProperties = ['padding-bottom', 'padding-top']

    for (const element of pageContent) {
      const styles = await common.getStyles(element, pageContentProperties)
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    const getClearSelectionsLink = [
      await customselectionPage.getClearSelectionsLink
    ]

    const getClearSelectionsLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getClearSelectionsLink) {
      const styles = await common.getStyles(
        element,
        getClearSelectionsLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline 1px')
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getlabel = [await customselectionPage.getPollutantLabel]

    const getlabelProperties = [
      'font-weight',
      'margin-bottom',
      'padding-bottom',
      'padding-right',
      'padding-top',
      'font-size',
      'line-height',
      'font-family',
      'color'
    ]

    for (const element of getlabel) {
      const styles = await common.getStyles(element, getlabelProperties)
      expect(styles['font-weight']).toBe('700')
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['padding-bottom']).toBe('10px')
      expect(styles['padding-right']).toBe('20px')
      expect(styles['padding-top']).toBe('10px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getValue = [await customselectionPage.getPollutantValue]

    const getValueProperties = [
      'font-weight',
      'padding-bottom',
      'padding-right',
      'padding-top',
      'font-size',
      'line-height',
      'font-family',
      'color'
    ]

    for (const element of getValue) {
      const styles = await common.getStyles(element, getValueProperties)
      expect(styles['font-weight']).toBe('400')
      expect(styles['padding-bottom']).toBe('10px')
      expect(styles['padding-right']).toBe('20px')
      expect(styles['padding-top']).toBe('10px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }

    const getAddPollutantLink = [await customselectionPage.getAddPollutantLink]

    const getAddPollutantLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getAddPollutantLink) {
      const styles = await common.getStyles(
        element,
        getAddPollutantLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline 1px')
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const continueButton = [await customselectionPage.getContinueButton]

    const continueButtonProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'background-color',
      'border',
      'box-shadow',
      'color',
      'font-weight',
      'margin',
      'padding',
      'text-align'
    ]

    for (const element of continueButton) {
      const styles = await common.getStyles(element, continueButtonProperties)
      expect(styles['margin-bottom']).toBe('32px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 32px')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles['text-align']).toBe('center')
    }
  })

  it('view source/add year/add location links appear only after pollutant added - AQD-839', async () => {
    await common.elementRemoved(customselectionPage.getViewDataSourcesLink)
    await common.elementRemoved(customselectionPage.getAddChangeYearLink)
    await common.elementRemoved(customselectionPage.getAddChangeLocationLink)

    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('Nitrogen dioxide')
    await common.continueButton.click()

    const isViewDataSourcesLinkDisplayed =
      await customselectionPage.getViewDataSourcesLink.isDisplayed()
    const isAddChangeYearLinkDisplayed =
      await customselectionPage.getAddChangeYearLink.isDisplayed()
    const isAddChangeLocationLinkDisplayed =
      await customselectionPage.getAddChangeLocationLink.isDisplayed()
    await expect(isViewDataSourcesLinkDisplayed).toBe(true)
    await expect(isAddChangeYearLinkDisplayed).toBe(true)
    await expect(isAddChangeLocationLinkDisplayed).toBe(true)
  })
})
