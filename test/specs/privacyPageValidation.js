// import startNowPage from '../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../page-objects/common.js'
import passwordPage from '../page-objects/passwordPage.js'
// import searchPage from '../page-objects/searchPage.js'
import headersObject from '../page-objects/header.js'
import footer from '../page-objects/footer.js'
import privacyPage from '../page-objects/privacyPage.js'

describe('privacy page content/functionality checks/styling checks', () => {
  it('content checks and titles', async () => {
    // await browser.deleteCookies(['airaqie_cookie'])
    await browser.url('')
    await browser.maximizeWindow()
    await passwordPage.inputPassword('airqualitydataset')
    await common.continueButton.click()
    // Handle the cookie banner
    // if (await cookieBanner.cookieBannerDialog.isDisplayed()) {
    // await cookieBanner.rejectButtonCookiesDialog.click()
    // await cookieBanner.hideButtonHideDialog.click()
    await footer.getPrivacyFooterLink.click()
    // page content validation
    await headersObject.getHeaderOverall.isDisplayed()
    await footer.getFooterOverall.isDisplayed()

    const privacyPageHeading = `Privacy notice`
    const getPrivacyPageHeading =
      await privacyPage.getPrivacyPageHeading.getText()
    await expect(getPrivacyPageHeading).toMatch(privacyPageHeading)

    const privacyPageContent = `Get air pollution data privacy notice
This privacy notice explains how the Get air pollution data service processes and shares your personal data. If you have any queries about the content of this privacy notice, email data.protection@defra.gov.uk
Who collects your personal data
The Department for Environment, Food and Rural Affairs (Defra) is the controller for the personal data we collect.
If you want more information about how Defra uses your personal data and your associated rights, contact the Defra data protection manager by email or post.
Email: data.protection@defra.gov.uk
Post: Department for Environment, Food and Rural Affairs
        Seacole Building
        2 Marsham Street
        London
        SW1P 4DF
The data protection officer for Defra is responsible for checking that Defra complies with legislation. You can contact them at DefraGroupDataProtectionOfficer@defra.gov.uk or at the above postal address.
What personal data we collect and how it’s used
For the service to be functional, we collect the postcode or placename that you search for. This is essential data for the service to work.
If you accept Google Analytics cookies, we will collect:
your IP address so that we can collect your location information - this will help us see what geographical locations our users are in
your device and operating system to help us improve our service
the search term you used to find the 'Get air pollution data' service to help us improve it
the pages you interact with in the 'Get air pollution data' service to help us improve it
You can opt in and out of cookies.
Lawful basis for processing your personal data
The lawful basis for processing your personal data to conduct research on the effectiveness of this service is ‘consent’. You do not have to provide your consent, and you can withdraw it at any time.
Consent to process your personal data
The processing of your personal data is based on consent. We do not collect any information that could be personally linked to an individual. However, we will need to record your IP address for the service to work.
If you have consented to cookies, any information that we collect cannot be removed. This is because we will not be able to identify that information to a specific individual.
Who we share your personal data with
We do not share the personal data we collect under this privacy notice with other organisations
We respect your personal privacy when we respond to access to information requests. We only share information when necessary to meet the statutory requirements of the Environmental Information Regulations 2004 and the Freedom of Information Act 2000.
How long we keep personal data
We will keep your personal data for 7 years in line with legislative requirements.
What happens if you do not provide personal data
If you do not provide the personal data of the postcode or location you’re searching for, you will not be able to use this service. We will not be able to provide you with any air pollution data.
The other personal data is optional and only required for service improvement.
Use of automated decision-making or profiling
The personal data you provide is not used for:
automated decision making (making a decision by automated means without any human involvement)
profiling (automated processing of personal data to evaluate certain things about an individual)
Transfer of your personal data outside the UK
We will only transfer your personal data to a country that is deemed adequate for data protection purposes.
Your rights
Based on the lawful processing above, your individual rights are:
consent
the right to be informed
the right of access
the right to rectification
the right to erasure
the right to restrict processing
the right to data portability
rights in relation to automated decision making and profiling
You can find more information about your rights under the UK General Data Protection Regulation and the Data Protection Act 2018 at the Information Commissioner’s Office.
Complaints
You have the right to make a complaint to the Information Commissioner’s Office at any time.
Personal information charter
Our personal information charter explains more about your rights over your personal data.`
    const getPrivacyPagecontent =
      await privacyPage.getPrivacyPageContent.getText()
    await expect(privacyPageContent).toMatch(getPrivacyPagecontent)
  })

  it('link validation', async () => {
    await privacyPage.getGetAirPollutionDataLink.click()
    const getAirPolutionDataLinkURL = await browser.getUrl()
    const expectedgetAirPolutionDataLinkURL =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/'
    await expect(getAirPolutionDataLinkURL).toMatch(
      expectedgetAirPolutionDataLinkURL
    )
    await browser.back()
    await browser.refresh()

    await privacyPage.getCookieOptLink.click()
    const getCookieOptLinkURL = await browser.getUrl()
    const expectedGetCookieOptLinkURL =
      'https://aqie-dataselector-frontend.test.cdp-int.defra.cloud/cookies'
    await expect(getCookieOptLinkURL).toMatch(expectedGetCookieOptLinkURL)
    await browser.back()
    await browser.refresh()

    await privacyPage
      .getInformationCommisionersOfficeLink(
        'Information Commissioner’s Office.'
      )
      .click()
    const getInformationCommisionersOfficeLinkURL = await browser.getUrl()
    const expectedgetInformationCommisionersOfficeLinkURL =
      'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/'
    await expect(getInformationCommisionersOfficeLinkURL).toMatch(
      expectedgetInformationCommisionersOfficeLinkURL
    )
    await browser.back()
    await browser.refresh()

    await privacyPage.getMakeAComplaintLink.click()
    const getMakeAComplaintLinkURL = await browser.getUrl()
    const expectedgetMakeAComplaintLinkURL =
      'https://ico.org.uk/make-a-complaint/'
    await expect(getMakeAComplaintLinkURL).toMatch(
      expectedgetMakeAComplaintLinkURL
    )
    await browser.back()
    await browser.refresh()

    await privacyPage.getPersonalInformationCharterLink.click()
    const getPersonalInformationCharterLinkURL = await browser.getUrl()
    const expectedgetPersonalInformationCharterLinkURL =
      'https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs/about/personal-information-charter'
    await expect(getPersonalInformationCharterLinkURL).toMatch(
      expectedgetPersonalInformationCharterLinkURL
    )
    await browser.back()
    await browser.refresh()

    // checking mailto links
    const mailtoLinks = await $$('a[href^="mailto:"]')
    const currentURL = await browser.getUrl()
    expect(mailtoLinks.length).toBe(3)
    for (const link of mailtoLinks) {
      const hrefValue = await link.getAttribute('href')
      expect(hrefValue).toMatch(/^mailto:/)
      await link.click()
      expect(await browser.getUrl()).toBe(currentURL)
    }

    await browser.refresh()
  })

  it('styling checks', async () => {
    const PrivacyPageHeading = [await privacyPage.getPrivacyPageHeading]

    const privacyPageHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of PrivacyPageHeading) {
      const styles = await common.getStyles(
        element,
        privacyPageHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('50px')
      expect(styles['font-size']).toBe('48px')
      expect(styles['line-height']).toBe('50px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const PrivacyPageContent = [await privacyPage.getPrivacyPageContent]

    const PrivacyPageContentProperties = ['padding-bottom', 'padding-top']

    for (const element of PrivacyPageContent) {
      const styles = await common.getStyles(
        element,
        PrivacyPageContentProperties
      )
      expect(styles['padding-bottom']).toBe('40px')
      expect(styles['padding-top']).toBe('40px')
    }

    /* const privacyLinks = [
      await privacyPage.getGetAirPollutionDataLink,
      await privacyPage.getCookieOptLink,
      // await privacyPage.getInformationCommisionersOfficeLink,
      await privacyPage.getMakeAComplaintLink,
      await privacyPage.getPersonalInformationCharterLink
    ]

    const privacyLinksProperties = [
       'color',
       'font-family',
       'font-size',
       'line-height',
       'font-weight'
    ]

    for (const element of privacyLinks) {
      const styles = await common.getStyles(element, privacyLinksProperties)
      expect(styles.color).toBe('rgb(0, 0, 238)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif') this is a styling bug
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('normal')
      expect(styles['font-weight']).toBe('400')
    } */

    /* const getparagraph = [await privacyPage.getparagraph]

    const getparagraphProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getparagraph) {
      const styles = await common.getStyles(element, getparagraphProperties)
      expect(styles['margin-bottom']).toBe('16px') 
      expect(styles['font-size']).toBe('16px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    } */ // bug raised

    const getSubTitle = [await privacyPage.getSubTitle]

    const getSubTitleProperties = [
      'padding-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getSubTitle) {
      const styles = await common.getStyles(element, getSubTitleProperties)
      expect(styles['padding-top']).toBe('0px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const getList = [await privacyPage.getList]

    const getListProperties = [
      'padding-left',
      'margin-bottom',
      'font-size',
      'line-height',
      'font-family',
      'color',
      'font-weight'
    ]

    for (const element of getList) {
      const styles = await common.getStyles(element, getListProperties)
      expect(styles['padding-left']).toBe('20px')
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }

    const getListItem = [await privacyPage.getListItem]

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
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-weight']).toBe('400')
    }
  })
})
