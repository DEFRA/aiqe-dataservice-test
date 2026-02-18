import { $ } from '@wdio/globals'

class CustomSelectionsPage {
  get getCustomSelectionHeading() {
    return $("h1[class*='govuk-heading-l']")
  }

  get getCustomSelectionPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getClearSelectionsLink() {
    return $("a[href*='/customdataset/clear']")
  }

  get getPollutantLabel() {
    return $$("dt[class*='govuk-summary-list__key']")[0]
  }

  get getPollutantValue() {
    return $("dd[id*='pollutant-summary-list']")
  }

  get getAddPollutantLink() {
    return $("a[href*='/airpollutant']")
  }

  get getChangePollutantLink() {
    return $("a[href*='/airpollutant']")
  }

  get getDataSourcesLabel() {
    return $$("dt[class*='govuk-summary-list__key']")[1]
  }

  get getDataSourcesValue() {
    return $("dd[id*='data-source-list']")
  }

  get getViewDataSourcesLink() {
    return $("a[href*='/datasource']")
  }

  get getYearLabel() {
    return $$("dt[class*='govuk-summary-list__key']")[2]
  }

  get getYearValue() {
    return $("dd[id*='time-period-value']")
  }

  get getAddChangeYearLink() {
    return $("a[href*='/year-aurn']")
  }

  get getLocationLabel() {
    return $$("dt[class*='govuk-summary-list__key']")[3]
  }

  get getLocationValue() {
    return $("dd[id*='location-value']")
  }

  get getAddChangeLocationLink() {
    return $("a[href*='/location-aurn?change=true']")
  }

  // NoJS-friendly change location link (fallback without query param)
  get getAddChangeLocationLinkNoJs() {
    return $("a[href*='/location-aurn']")
  }

  get getContinueButton() {
    return $$("button[class*='govuk-button']")[4]
  }
}

// module.exports=new StartNowPage()
export default new CustomSelectionsPage()
