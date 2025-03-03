import { $ } from '@wdio/globals'

class MonitoringStationPage {
  get getResultsPageHeaderText() {
    return $("h1[class*='govuk-heading-xl govuk-!-margin-bottom-1']")
  }

  get getBackBtn() {
    return $("a[class='govuk-back-link']")
  }
}

// module.exports=new StartNowPage()
export default new MonitoringStationPage()
