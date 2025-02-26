import { $ } from '@wdio/globals'

class AccessibilityPage {
  get getAccessibilityPageHeading() {
    return $("h1[class*='govuk-heading-xl odd-page']")
  }

  get getAccessibilityPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getGetAirPollutionDataLink() {
    return $$("a[href='/']")[1]
  }

  get getAccessibilityEmailLink() {
    return $$("a[href='mailto:accessibility@defra.gov.uk']")
  }

  get getEqualityAdvisoryLink() {
    return $("a[href='https://www.equalityadvisoryservice.com/']")
  }

  get getParagraph() {
    return $("p[class='govuk-body']")
  }

  get getSubTitle() {
    return $('h2')
  }
}

// module.exports=new StartNowPage()
export default new AccessibilityPage()
