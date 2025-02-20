import { $ } from '@wdio/globals'

class ResultsPage {
  get getResultsPageHeaderText() {
    return $("h1[class*='govuk-heading-xl govuk-!-margin-bottom-6']")
  }

  get getFirstResult() {
    return $("a[href='station']")
  }

  async firstLinkClick() {
    await this.getFirstResult.click()
  }
}

// module.exports=new StartNowPage()
export default new ResultsPage()
