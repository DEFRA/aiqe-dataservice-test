import { $ } from '@wdio/globals'

class monitoringStationPage {
  get getResultsPageHeaderText() {
    return $("h1[class*='govuk-heading-xl govuk-!-margin-bottom-1']")
  }

 

  

}

// module.exports=new StartNowPage()
export default new monitoringStationPage()
