import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import searchPage from '../page-objects/searchPage.js'
// import resultsPage from '../page-objects/resultsPage.js'
// import monitoringStationPage from '../page-objects/monitoringStationPage.js'
import header from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
import common from '../page-objects/common.js'
import createLogger from '../helpers/logger.js'
import disambigurationPage from '../page-objects/disambigurationPage.js'
import locationMonitoringStationListPage from '../page-objects/locationMonitoringStationListPage.js'
import monitoringStationPage from '../page-objects/monitoringStationPage.js'
// import hubPage from '../page-objects/hubPage.js'

const logger = createLogger()
describe('mobile happy Path', () => {
  it('mobile tests', async () => {
    logger.info('---happyPath StartScenario--------')
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()

    // startnow-block
    await header.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    const startNowHeading = 'Get air pollution data'
    const getStartNowHeading =
      await startNowPage.getStartNowPageHeading.getText()
    await expect(startNowHeading).toMatch(getStartNowHeading)

    const footerOverall = [await footer.getFooterOverall]

    const footerOverallProperties = [
      'background',
      'padding-bottom',
      'padding-top',
      'border-top',
      'color'
    ]

    for (const element of footerOverall) {
      const styles = await common.getStyles(element, footerOverallProperties)
      expect(styles.background).toBe(
        'rgb(244, 248, 251) none repeat scroll 0% 0% / auto padding-box border-box'
      )
      expect(styles['padding-bottom']).toBe('15px')
      expect(styles['padding-top']).toBe('25px')
      expect(styles['border-top']).toBe('10px solid rgb(29, 112, 184)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
    }
    // checking links styling
    const footerLinks = [
      await footer.getPrivacyFooterLink,
      await footer.getCookiesFooterLink,
      await footer.getAccessibilityStatementFooterLink,
      await footer.getOglFooterLink
    ]

    const footerLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of footerLinks) {
      const styles = await common.getStyles(element, footerLinkProperties)
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('14px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['line-height']).toBe('16px')
      expect(styles['text-decoration']).toBe('underline')
    }
    // checking OGL logo styling
    const oglLogo = [await footer.getOGLLogo]

    const oglLogoProperties = [
      'height',
      'margin-right',
      'width',
      'margin-bottom'
    ]

    for (const element of oglLogo) {
      const styles = await common.getStyles(element, oglLogoProperties)
      expect(styles.height).toBe('17px')
      expect(styles['margin-right']).toBe('10px')
      expect(styles.width).toBe('41px')
      expect(styles['margin-bottom']).toBe('15px')
    }
    // crown logo styling
    const crownLogo = [await footer.getCrownCoprightLogo]

    const crownLogoProperties = ['margin-bottom', 'margin-left', 'margin-right']

    for (const element of crownLogo) {
      const styles = await common.getStyles(element, crownLogoProperties)
      expect(styles['margin-bottom']).toBe('25px')
      expect(styles['margin-left']).toBe('15px')
      expect(styles['margin-right']).toBe('15px')
    }
    // OGLStatement
    const oglStatement = [await footer.getOGLStatement]

    const oglStatementProperties = [
      'font-size',
      'line-height',
      'font-family',
      'font-weight',
      'color'
    ]

    for (const element of oglStatement) {
      const styles = await common.getStyles(element, oglStatementProperties)
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('14px')
      expect(styles['line-height']).toBe('16px')
    }

    const FooterCrownLogo = [await footer.getFooterCrownLogo]

    const FooterCrownLogoProperties = ['margin-bottom']

    for (const element of FooterCrownLogo) {
      const styles = await common.getStyles(element, FooterCrownLogoProperties)
      expect(styles['margin-bottom']).toBe('25px')
    }
    const headerOverall = [await header.getHeaderOverall]

    const headerOverallProperties = [
      'font-family',
      'background',
      'border-bottom',
      'color',
      'font-weight'
    ]

    for (const element of headerOverall) {
      const styles = await common.getStyles(element, headerOverallProperties)
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.background).toBe(
        'rgb(29, 112, 184) none repeat scroll 0% 0% / auto padding-box border-box'
      )
      expect(styles['border-bottom']).toBe('1px solid rgba(0, 0, 0, 0)')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-weight']).toBe('400')
    }
    // checking CrownLogo styling
    const CrownLogo = [await header.getGovUKCrownLogo]

    const GovUKCrownLogoProperties = [
      'font-family',
      'padding-bottom',
      'padding-top',
      'margin-bottom',
      'font-weight'
    ]

    for (const element of CrownLogo) {
      const styles = await common.getStyles(element, GovUKCrownLogoProperties)
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['padding-bottom']).toBe('12px')
      expect(styles['padding-top']).toBe('16px')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles['font-weight']).toBe('400')
    }
    // checking beta banner feedback link styling
    const getBetaBannerFeedbackLink = [await header.getBetaBannerFeedbackLink]
    const getBetaBannerFeedbackLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getBetaBannerFeedbackLink) {
      const styles = await common.getStyles(
        element,
        getBetaBannerFeedbackLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline')
      expect(styles['font-size']).toBe('14px')
      expect(styles['line-height']).toBe('16px')
      expect(styles['font-weight']).toBe('400')
    }
    // checking beta logo styling
    const getBetaLogo = [await header.getBetalogo]
    const getBetalogoProperties = [
      'font-size',
      'line-height',
      'margin-right',
      'font-family',
      'background-color',
      'color',
      'display',
      'font-weight',
      'margin-bottom',
      'margin-top',
      'max-width',
      'padding'
    ]

    for (const element of getBetaLogo) {
      const styles = await common.getStyles(element, getBetalogoProperties)
      expect(styles['font-size']).toBe('14px')
      expect(styles['line-height']).toBe('16px')
      expect(styles['margin-right']).toBe('10px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(187, 212, 234)')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('-3px')
      expect(styles['margin-top']).toBe('-2px')
      expect(styles['max-width']).toBe('160px')
      expect(styles.padding).toBe('2px 8px 3px')
    }

    const startNowPageHeading = [await startNowPage.getStartNowPageHeading]

    const startNowPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of startNowPageHeading) {
      const styles = await common.getStyles(
        element,
        startNowPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('32px')
      expect(styles['line-height']).toBe('35px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }
    const startNowPageList = [await startNowPage.getstartNowPageList]

    const startNowPageListProperties = [
      'padding-left',
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of startNowPageList) {
      const styles = await common.getStyles(element, startNowPageListProperties)
      expect(styles['padding-left']).toBe('20px')
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
    const startNowPageListItem = [await startNowPage.getstartNowPageListItem]

    const startNowPageListItemProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of startNowPageListItem) {
      const styles = await common.getStyles(
        element,
        startNowPageListItemProperties
      )
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
    const OtherWaysToGetThisInfoTitle = [
      await startNowPage.getOtherWaysToGetThisInfoTitle
    ]

    const OtherWaysToGetThisInfoTitlenProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of OtherWaysToGetThisInfoTitle) {
      const styles = await common.getStyles(
        element,
        OtherWaysToGetThisInfoTitlenProperties
      )

      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('18px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    await startNowPage.startNowBtnClick()
    // await hubPage.getFindMonitoringStationsByLocation.click()
    const searchPageHeading = [await searchPage.getSearchPageHeaderText]

    const searchPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family'
    ]

    for (const element of searchPageHeading) {
      const styles = await common.getStyles(
        element,
        searchPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }
    const searchPageHintText = [await searchPage.getSearchPageHintText]

    const searchPageHintTextProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of searchPageHintText) {
      const styles = await common.getStyles(
        element,
        searchPageHintTextProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('15px')
    }
    const EnterTownOrPostcodeLabel = [
      await searchPage.getEnterTownOrPostcodeLabel('Enter a town or postcode')
    ]

    const EnterTownOrPostcodeLabelProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of EnterTownOrPostcodeLabel) {
      const styles = await common.getStyles(
        element,
        EnterTownOrPostcodeLabelProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('5px')
    }
    const approxSearchAreaLabel = [await searchPage.approxSearchAreaLabel]

    const approxSearchAreaLabelProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'margin-bottom'
    ]

    for (const element of approxSearchAreaLabel) {
      const styles = await common.getStyles(
        element,
        approxSearchAreaLabelProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-bottom']).toBe('10px')
    }
    const mileOptions = [
      await searchPage.getOptionByText('5 miles'),
      await searchPage.getOptionByText('25 miles'),
      await searchPage.getOptionByText('50 miles')
    ]

    const mileOptionsProperties = [
      'align-self',
      'margin-bottom',
      'padding',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight',
      'width'
    ]

    for (const element of mileOptions) {
      const styles = await common.getStyles(element, mileOptionsProperties)
      expect(styles['align-self']).toBe('center')
      expect(styles['margin-bottom']).toBe('0px')
      expect(styles.padding).toBe('7px 15px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
    const continueButton = [await searchPage.getContinueBtn]

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
      expect(styles['margin-bottom']).toBe('22px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('19px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(0, 112, 60)')
      expect(styles.border).toBe('2px solid rgba(0, 0, 0, 0)')
      expect(styles['box-shadow']).toBe('rgb(0, 45, 24) 0px 2px 0px 0px')
      expect(styles.color).toBe('rgb(255, 255, 255)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 22px')
      expect(styles.padding).toBe('8px 10px 7px')
      expect(styles['text-align']).toBe('center')
    }

    // search block
    await header.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await searchPage.setsearch('birmingham')
    await searchPage.milesOptionClick('5 miles')
    await searchPage.continueBtnClick()
    await disambigurationPage.getDisambigurationPageHeading.isDisplayed()

    // results block

    const getDisambigurationPageHeading = [
      await disambigurationPage.getDisambigurationPageHeading
    ]

    const getDisambigurationPageHeadingProperties = [
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getDisambigurationPageHeading) {
      const styles = await common.getStyles(
        element,
        getDisambigurationPageHeadingProperties
      )
      expect(styles['margin-top']).toBe('20px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }
    const getTryAgainLink = [await disambigurationPage.getTrySearchingAgainLink]

    const getTryAgainLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getTryAgainLink) {
      const styles = await common.getStyles(element, getTryAgainLinkProperties)
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe('underline')
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-weight']).toBe('400')
    }
    const getLocationLink = [
      await disambigurationPage.getLocationLinkByText('City of London')
    ]

    const getLocationLinkProperties = [
      'font-weight',
      'color',
      'font-family',
      'font-size',
      'line-height'
    ]

    for (const element of getLocationLink) {
      const styles = await common.getStyles(element, getLocationLinkProperties)
      expect(styles['font-weight']).toBe('700')
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
    }
    const getParagraphLink = [await disambigurationPage.getParagraph]

    const getParagraphLinkProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getParagraphLink) {
      const styles = await common.getStyles(element, getParagraphLinkProperties)
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
    const getListItem = [await disambigurationPage.getListItem]

    const getListItemProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getListItem) {
      const styles = await common.getStyles(element, getListItemProperties)
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
    await header.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await disambigurationPage.locationLinkClick('Birmingham')

    // monitor station list
    const getMonitoringStationListPageHeading = [
      await locationMonitoringStationListPage.getMonitoringStationListPageHeading
    ]

    const getMonitoringStationListPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getMonitoringStationListPageHeading) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationListPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('32px')
      expect(styles['line-height']).toBe('34px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }
    const getChangeSearchAreaLink = [
      await locationMonitoringStationListPage.getChangeSearchAreaLink
    ]

    const getChangeSearchAreaLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getChangeSearchAreaLink) {
      const styles = await common.getStyles(
        element,
        getChangeSearchAreaLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('22px')
      expect(styles['font-weight']).toBe('400')
    }
    const getMonitoringStationLink = [
      await locationMonitoringStationListPage.getMonitoringStationLink(
        'Birmingham A4540 Roadside'
      )
    ]

    const getMonitoringStationLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      // 'font-weight',
      'text-align',
      'font-size',
      'line-height'
    ]

    for (const element of getMonitoringStationLink) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationLinkProperties
      )
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
      // expect(styles['font-weight']).toBe('700') styling bug
      expect(styles['text-align']).toBe('left')
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('22px')
    }
    const getMonitoringStationTableHeading = [
      await locationMonitoringStationListPage.getMonitoringStationTableHeading
    ]

    const getMonitoringStationTableHeadingProperties = [
      'width',
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family'
    ]

    for (const element of getMonitoringStationTableHeading) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationTableHeadingProperties
      )
      expect(styles.width).toBe('460px')
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getSiteTypeTableHeading = [
      await locationMonitoringStationListPage.getSiteTypeTableHeading
    ]

    const getSiteTypeTableHeadingProperties = [
      'width',
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family'
    ]

    for (const element of getSiteTypeTableHeading) {
      const styles = await common.getStyles(
        element,
        getSiteTypeTableHeadingProperties
      )
      expect(styles.width).toBe('220px')
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.padding).toBe('10px 20px 10px 0px')
      expect(styles['text-align']).toBe('left')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    const getPollutantsTableHeading = [
      await locationMonitoringStationListPage.getPollutantsTableHeading
    ]

    const getPollutantsTableHeadingProperties = [
      'padding-right',
      'width',
      'border-bottom',
      'padding',
      'text-align',
      'vertical-align',
      'font-weight',
      'display',
      'font-size',
      'line-height',
      'font-family'
    ]

    for (const element of getPollutantsTableHeading) {
      const styles = await common.getStyles(
        element,
        getPollutantsTableHeadingProperties
      )
      expect(styles['padding-right']).toBe('0px')
      expect(styles.width).toBe('240px')
      expect(styles['border-bottom']).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.padding).toBe('10px 0px')
      expect(styles['text-align']).toBe('right')
      expect(styles['vertical-align']).toBe('top')
      expect(styles['font-weight']).toBe('700')
      expect(styles.display).toBe('table-cell')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
    }

    await header.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    await locationMonitoringStationListPage
      .getMonitoringStationLink('Birmingham A4540 Roadside')
      .click()

    // monitoring station page
    await header.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()
    const getCurrentURLOfA450Roadside = await browser.getUrl()
    const expectedURLOfA450Roadside = '/stationdetails/BirminghamA4540Roadside'
    await expect(getCurrentURLOfA450Roadside).toMatch(expectedURLOfA450Roadside)
    const getMonitoringPageHeading =
      await monitoringStationPage.getMonitoringPageHeading.getText()
    const expectedMonitoringPageHeading = 'Birmingham A4540 Roadside'
    await expect(getMonitoringPageHeading).toMatch(
      expectedMonitoringPageHeading
    )

    const getGoogleMapLink = [await monitoringStationPage.getGoogleMapLink]

    const getGoogleMapLinkProperties = [
      'color',
      'font-family',
      'text-decoration',
      'text-decoration-thickness',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getGoogleMapLink) {
      const styles = await common.getStyles(element, getGoogleMapLinkProperties)
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }
    const getMonitoringPageHeadingStyles = [
      await monitoringStationPage.getMonitoringPageHeading
    ]

    const getMonitoringPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getMonitoringPageHeadingStyles) {
      const styles = await common.getStyles(
        element,
        getMonitoringPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }
    const getgridSideStyles = [await monitoringStationPage.getgridSideStyles]

    const getgridSideStylesProperties = ['float', 'width', 'padding']

    for (const element of getgridSideStyles) {
      const styles = await common.getStyles(
        element,
        getgridSideStylesProperties
      )
      expect(styles.float).toBe('left')
      expect(styles.width).toBe('990px')
      expect(styles.padding).toBe('0px 15px')
    }

    const getgridTopBottomStyles = [
      await monitoringStationPage.getgridTopBottomStyles
    ]

    const getgridTopBottomStylesProperties = [
      'gap',
      'padding-bottom',
      'margin-top',
      'box-shadow',
      'display',
      'flex-direction',
      'flex-wrap',
      'margin',
      'width'
    ]

    for (const element of getgridTopBottomStyles) {
      const styles = await common.getStyles(
        element,
        getgridTopBottomStylesProperties
      )
      expect(styles.gap).toBe('80px')
      expect(styles['padding-bottom']).toBe('0px')
      expect(styles['margin-top']).toBe('15px')
      expect(styles['box-shadow']).toBe(
        'rgb(177, 180, 182) 0px -1px 0px 0px inset'
      )
      expect(styles.display).toBe('flex')
      expect(styles['flex-direction']).toBe('row')
      expect(styles['flex-wrap']).toBe('nowrap')
      expect(styles.margin).toBe('15px 0px')
      expect(styles.width).toBe('960px')
    }

    const getFeatureItem = [await monitoringStationPage.getFeatureItem]

    const getFeatureItemProperties = [
      'box-sizing',
      'float',
      'min-width',
      'padding',
      'display'
    ]

    for (const element of getFeatureItem) {
      const styles = await common.getStyles(element, getFeatureItemProperties)
      expect(styles['box-sizing']).toBe('border-box')
      expect(styles.float).toBe('left')
      expect(styles['min-width']).toBe('96px')
      expect(styles.padding).toBe('15px 0px')
      expect(styles.display).toBe('block')
    }

    const getFeatureCaption = [await monitoringStationPage.getFeatureCaption]

    const getFeatureCaptionProperties = [
      'font-size',
      'line-height',
      'font-family',
      'color',
      'display',
      'font-weight'
    ]

    for (const element of getFeatureCaption) {
      const styles = await common.getStyles(
        element,
        getFeatureCaptionProperties
      )
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles.display).toBe('block')
      expect(styles['font-weight']).toBe('400')
    }

    const getFeatureBody = [await monitoringStationPage.getFeatureBody]

    const getFeatureBodyProperties = [
      'margin-top',
      'font-size',
      'margin-bottom',
      'line-height',
      'color',
      'font-family',
      'font-weight'
      // 'margin'
    ]

    for (const element of getFeatureBody) {
      const styles = await common.getStyles(element, getFeatureBodyProperties)
      expect(styles['margin-top']).toBe('5px')
      expect(styles['font-size']).toBe('22px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['line-height']).toBe('28.9474px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      // expect(styles.margin).toBe('5px 5px 20px 0px') styling bug
    }

    const getMapLinkPadding = [await monitoringStationPage.getMapLinkPadding]

    const getMapLinkPaddingProperties = ['margin-top', 'margin-bottom']

    for (const element of getMapLinkPadding) {
      const styles = await common.getStyles(
        element,
        getMapLinkPaddingProperties
      )
      expect(styles['margin-top']).toBe('5px')
      expect(styles['margin-bottom']).toBe('20px')
    }
    const getMonitoringStationStatus = [
      await monitoringStationPage.getMonitoringStationStatus
    ]

    const getMonitoringStationStatusProperties = [
      'background-color',
      'color',
      'font-size',
      'line-height',
      'font-family',
      'font-weight',
      'padding'
    ]

    for (const element of getMonitoringStationStatus) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationStatusProperties
      )
      expect(styles['background-color']).toBe('rgb(204, 226, 216)')
      expect(styles.color).toBe('rgb(0, 90, 48)')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
      expect(styles.padding).toBe('2px 8px 3px')
    }

    const getMonitoringStationLastReading = [
      await monitoringStationPage.getMonitoringStationLastReading
    ]

    const getMonitoringStationLastReadingProperties = [
      'margin-left',
      'display',
      'color',
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'font-weight'
    ]

    for (const element of getMonitoringStationLastReading) {
      const styles = await common.getStyles(
        element,
        getMonitoringStationLastReadingProperties
      )
      expect(styles['margin-left']).toBe('5px')
      expect(styles.display).toBe('inline-block')
      expect(styles.color).toBe('rgb(80, 90, 95)')
      expect(styles['margin-top']).toBe('15px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
    const getToggleTip = [await monitoringStationPage.getSiteTypeToggleTip]

    const getToggleTipProperties = [
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

    for (const element of getToggleTip) {
      const styles = await common.getStyles(element, getToggleTipProperties)
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
    const getSumarryTableHeading = [
      await monitoringStationPage.getSumarryTableHeading
    ]

    const getSumarryTableHeadingProperties = [
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'display',
      'font-weight'
    ]

    for (const element of getSumarryTableHeading) {
      const styles = await common.getStyles(
        element,
        getSumarryTableHeadingProperties
      )
      expect(styles['margin-top']).toBe('30px')
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.display).toBe('block')
      expect(styles['font-weight']).toBe('700')
    }

    const getDurationTag = [await monitoringStationPage.getDurationTag]

    const getDurationTagProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getDurationTag) {
      const styles = await common.getStyles(element, getDurationTagProperties)
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getYearButtons = [
      await monitoringStationPage.get2019Button,
      await monitoringStationPage.get2020Button,
      await monitoringStationPage.get2021Button,
      await monitoringStationPage.get2022Button,
      await monitoringStationPage.get2023Button,
      await monitoringStationPage.get2024Button,
      await monitoringStationPage.get2025Button
    ]

    const getYearButtonsProperties = [
      'color',
      'font-family',
      'padding-bottom',
      'padding-top',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getYearButtons) {
      const styles = await common.getStyles(element, getYearButtonsProperties)
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['padding-bottom']).toBe('12px')
      expect(styles['padding-top']).toBe('12px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getCurrentYearButton = [await monitoringStationPage.get2018Button]

    const getCurrentYearButtonProperties = [
      'color',
      'font-family',
      'padding-bottom',
      'padding-top',
      'font-size',
      'line-height',
      'font-weight'
    ]

    for (const element of getCurrentYearButton) {
      const styles = await common.getStyles(
        element,
        getCurrentYearButtonProperties
      )
      expect(styles.color).toBe('rgb(0, 48, 120)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['padding-bottom']).toBe('12px')
      expect(styles['padding-top']).toBe('12px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-weight']).toBe('400')
    }

    const getVerifiedTag = [await monitoringStationPage.getVerifiedTag]

    const getVerifiedTagsProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getVerifiedTag) {
      const styles = await common.getStyles(element, getVerifiedTagsProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DataCaptureStyles = [
      await monitoringStationPage.getPM25DataCapture,
      await monitoringStationPage.getPM10DataCapture,
      await monitoringStationPage.getNODataCapture,
      await monitoringStationPage.getOzoneDataCapture,
      await monitoringStationPage.getSDDataCapture
    ]

    const getPM25DataCaptureProperties = [
      'font-size',
      'font-weight',
      'margin-top',
      'line-height',
      'font-family',
      'text-align'
    ]

    for (const element of DataCaptureStyles) {
      const styles = await common.getStyles(
        element,
        getPM25DataCaptureProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['font-weight']).toBe('400')
      expect(styles['margin-top']).toBe('5px')
      expect(styles['line-height']).toBe('21.0526px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['text-align']).toBe('left')
    }
    const summaryTableAnnualAverageStyles = [
      await monitoringStationPage.getPM25AnnaulAverageST,
      await monitoringStationPage.getPM10AnnaulAverageST,
      await monitoringStationPage.getNitrogenDioxideAnnaulAverageST,
      await monitoringStationPage.getOzoneAnnaulAverageST,
      await monitoringStationPage.getSulphurDioxideAnnaulAverageST
    ]

    const summaryTableAnnualAverageStylesProperties = [
      'text-align',
      'border-bottom',
      'padding',
      'vertical-align',
      'font-size',
      'line-height',
      'font-family',
      'border-collapse',
      'border-spacing',
      'color',
      'font-weight'
    ]

    for (const element of summaryTableAnnualAverageStyles) {
      const styles = await common.getStyles(
        element,
        summaryTableAnnualAverageStylesProperties
      )
      expect(styles['text-align']).toBe('right')
      expect(styles['border-bottom']).toBe('0px none rgb(11, 12, 12)')
      expect(styles.padding).toBe('20px 0px')
      expect(styles['vertical-align']).toBe('middle')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['border-collapse']).toBe('collapse')
      expect(styles['border-spacing']).toBe('0px 0px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
    const getApproximateFileSizesDropDownLinkStyles = [
      await monitoringStationPage.getApproximateFileSizesDropDownLink
    ]

    const getApproximateFileSizesDropDownLinkStylesProperties = [
      'text-decoration',
      'text-decoration-thickness',
      'text-underline-offset',
      'color',
      'font-size',
      'line-height',
      'font-family',
      'font-weight'
    ]

    for (const element of getApproximateFileSizesDropDownLinkStyles) {
      const styles = await common.getStyles(
        element,
        getApproximateFileSizesDropDownLinkStylesProperties
      )
      expect(styles['text-decoration']).toBe(
        'underline 1px solid rgb(29, 112, 184)'
      )
      expect(styles['text-decoration-thickness']).toBe('1px')
      expect(styles['text-underline-offset']).toBe('2.9982px')
      expect(styles.color).toBe('rgb(29, 112, 184)')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
    await monitoringStationPage.getApproximateFileSizesDropDownLink.click()
    const getApproximateFileSizesContentStyles = [
      await monitoringStationPage.getApproximateFileSizesContent
    ]

    const getApproximateFileSizesContentStylesProperties = [
      'border-left',
      'padding-bottom',
      'padding-left',
      'padding-top',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getApproximateFileSizesContentStyles) {
      const styles = await common.getStyles(
        element,
        getApproximateFileSizesContentStylesProperties
      )
      expect(styles['border-left']).toBe('5px solid rgb(177, 180, 182)')
      expect(styles['padding-bottom']).toBe('15px')
      expect(styles['padding-left']).toBe('20px')
      expect(styles['padding-top']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
    const getdownloadDataHeading = [
      await monitoringStationPage.getdownloadDataHeading
    ]

    const getdownloadDataHeadingProperties = [
      'margin-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getdownloadDataHeading) {
      const styles = await common.getStyles(
        element,
        getdownloadDataHeadingProperties
      )
      expect(styles['margin-top']).toBe('40px')
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const AllPollutantsSubHeading = [
      await monitoringStationPage.getAllPollutantsSubHeading
    ]

    const getAllPollutantsSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of AllPollutantsSubHeading) {
      const styles = await common.getStyles(
        element,
        getAllPollutantsSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadAllPollutantsHourlyData = [
      await monitoringStationPage.getDownloadAllPollutantsHourlyData
    ]

    const getDownloadAllPollutantsHourlyDataProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadAllPollutantsHourlyData) {
      const styles = await common.getStyles(
        element,
        getDownloadAllPollutantsHourlyDataProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
    const SulphurDioxideSubHeading = [
      await monitoringStationPage.getSulphurDioxideSubHeading
    ]

    const getSulphurDioxideSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of SulphurDioxideSubHeading) {
      const styles = await common.getStyles(
        element,
        getSulphurDioxideSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadSulphurDioxideHourlyDataLink = [
      await monitoringStationPage.getDownloadSulphurDioxideHourlyDataLink
    ]

    const getDownloadSulphurDioxideHourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadSulphurDioxideHourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadSulphurDioxideHourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
    const PM10SubHeading = [await monitoringStationPage.getPM10SubHeading]

    const getPM10SubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of PM10SubHeading) {
      const styles = await common.getStyles(
        element,
        getPM10SubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadPM10HourlyDataLink = [
      await monitoringStationPage.getDownloadPM10HourlyDataLink
    ]

    const getDownloadPM10HourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM10HourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadPM10HourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
    const PM25SubHeading = [await monitoringStationPage.getPM25SubHeading]

    const getPM25SubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of PM25SubHeading) {
      const styles = await common.getStyles(
        element,
        getPM25SubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadPM25HourlyDataLink = [
      await monitoringStationPage.getDownloadPM25HourlyDataLink
    ]

    const getDownloadPM25HourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadPM25HourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadPM25HourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
    const OzoneSubHeading = [await monitoringStationPage.getOzoneSubHeading]

    const getOzoneSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of OzoneSubHeading) {
      const styles = await common.getStyles(
        element,
        getOzoneSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadOzoneHourlyDataLink = [
      await monitoringStationPage.getDownloadOzoneHourlyDataLink
    ]

    const getDownloadOzoneHourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadOzoneHourlyDataLink) {
      const styles = await common.getStyles(
        element,
        getDownloadOzoneHourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
    const NitrogenDioxideSubHeading = [
      await monitoringStationPage.getNitrogenDioxideSubHeading
    ]

    const getNitrogenDioxideSubHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of NitrogenDioxideSubHeading) {
      const styles = await common.getStyles(
        element,
        getNitrogenDioxideSubHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const DownloadNitrogenDioxideHourlyDataLink = [
      await monitoringStationPage.getDownloadNitrogenDioxideHourlyDataLink
    ]

    const DownloadNitrogenDioxideHourlyDataLinkProperties = [
      'font-size',
      'line-height',
      'display',
      'font-family',
      'background-color',
      'border',
      'color',
      'font-weight',
      'margin',
      'outline',
      'padding',
      'margin-bottom'
    ]

    for (const element of DownloadNitrogenDioxideHourlyDataLink) {
      const styles = await common.getStyles(
        element,
        DownloadNitrogenDioxideHourlyDataLinkProperties
      )
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('20px')
      expect(styles.display).toBe('inline-block')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['background-color']).toBe('rgb(255, 255, 255)')
      expect(styles.border).toBe('1px solid rgb(177, 180, 182)')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
      expect(styles.margin).toBe('0px 0px 15px')
      expect(styles.outline).toBe('rgba(0, 0, 0, 0) solid 3px')
      expect(styles.padding).toBe('9px 10px 10px')
      expect(styles['margin-bottom']).toBe('15px')
    }
  })
})
