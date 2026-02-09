import { $ } from '@wdio/globals'

class RequestDataPage {
  get getDownloadYourDataHeading() {
    return $("h1[class*='govuk-heading-l']")
  }

  get getDownloadYourDataPageContent() {
    return $("main[id*='main-content']")
  }

  get getEnterEmailAddressText() {
    return $("label[for*='email']")
  }

  get getHintText() {
    return $("div[id*='email-hint']")
  }

  get getRequestDataContinueButton() {
    return $("button[data-module*='govuk-button']")
  }
}

// module.exports=new StartNowPage()
export default new RequestDataPage()
