import { $ } from '@wdio/globals'

class ViewDataSourcesPage {
  get getViewDataSourcesHeading() {
    return $("h1[class*='govuk-heading-l']")
  }

  get getViewDataSourcesPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getH2Heading() {
    return $("h2[class*='govuk-heading-m']")
  }

  get getH3Heading() {
    return $("h3[class*='govuk-heading-s govuk-!-margin-bottom-2']")
  }

  get getPStyling() {
    return $("p[class*='govuk-body']")
  }

  get getP2Styling() {
    return $("p[class*='govuk-body govuk-!-margin-bottom-3']")
  }

  get getP3Styling() {
    return $("p[class*='govuk-body govuk-!-margin-bottom-1']")
  }

  get getMoreInformationLink() {
    return $(
      "a[href*='https://uk-air.defra.gov.uk/networks/network-info?view=aurn']"
    )
  }
}

// module.exports=new StartNowPage()
export default new ViewDataSourcesPage()
