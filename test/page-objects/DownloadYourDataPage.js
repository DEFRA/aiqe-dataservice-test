import { $ } from '@wdio/globals'

class DownloadYourDataPage {
  get getDownloadYourDataHeading() {
    return $("h2[class*='govuk-heading-l']")
  }

  get getDownloadYourDataPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getFileFormatDropDownLink() {
    return $("span[class*='govuk-details__summary-text']")
  }

  get getFileFormatInformation() {
    return $("div[class*='govuk-details__text']")
  }

  get getH3HeadingStyles() {
    return $("h3[class*='govuk-heading-s']")
  }

  get getSubTitlesStyles() {
    return $("h2[class*='govuk-heading-m']")
  }

  get getParagraphStyles() {
    return $("p[class*='govuk-body govuk-!-margin-bottom-5']")
  }

  get getNumberOfStationsAvailable() {
    return $(
      "div[class*='govuk-inset-text govuk-!-margin-top-1 govuk-!-margin-bottom-3 insettextgreen']"
    )
  }

  get getDownloadHourlyDataButton() {
    return $("a[id*='download-link']")
  }

  get getSaveYourSearchTitle() {
    return $("h3[class*='govuk-heading-s']")
  }

  get getSaveYourSearchLink() {
    return $("a[rel*='noopener noreferrer']")
  }

  get getRequestDataLink() {
    return $("a[href*='/emailrequest']")
  }
}

// module.exports=new StartNowPage()
export default new DownloadYourDataPage()
