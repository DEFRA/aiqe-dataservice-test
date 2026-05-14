import { $ } from '@wdio/globals'

class DownloadYourDataPage {
  get getDownloadYourDataHeading() {
    return $("h1[class*='govuk-heading-l']")
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

  get getNoStationsAvailable() {
    return $(
      "div[class*='govuk-inset-text govuk-!-margin-top-1 govuk-!-margin-bottom-3 insettextorange"
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
    return $$("a[href*='/emailrequest']")[0]
  }

  get getOtherDataRequestDataLink() {
    return $$("a[href*='/emailrequest']")[6]
  }

  get getDownloadProgress() {
    return $("div[class*='govuk-notification-banner__header']")
  }

  // other data from defra tab elements
  get getOtherDataFromDefraTab() {
    return $("a[href*='#tab-other']")
  }

  get getDownloadDataButton() {
    return $("a[aria-label*='Download data for UKEAP - Rural NO2 Network']")
  }

  get getAURNAvailableStationsTag() {
    return $(
      "div[class*='govuk-inset-text govuk-!-margin-top-1 govuk-!-margin-bottom-3 insettextgreen']"
    )
  }

  get getNoNAURNAvailableStationsTag() {
    return $$(
      "div[class*='govuk-inset-text govuk-!-margin-top-1 govuk-!-margin-bottom-3 insettextgreen']"
    )[1]
  }

  get get0StationsAvailableTag() {
    return $(
      "div[class*='govuk-inset-text govuk-!-margin-top-1 govuk-!-margin-bottom-3 insettextorange']"
    )
  }
}

// module.exports=new StartNowPage()
export default new DownloadYourDataPage()
