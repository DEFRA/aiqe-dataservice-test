import { $ } from '@wdio/globals'

class DownloadRequestedDataPage {
  get getLinkExpiredTitle() {
    return $("h1[class*='govuk-heading-l']")
  }

  get getLinkExpiredPageContent() {
    return $("main[id*='main-content']")
  }
}

// module.exports=new StartNowPage()
export default new DownloadRequestedDataPage()
