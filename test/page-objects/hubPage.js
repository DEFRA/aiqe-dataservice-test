import { $ } from '@wdio/globals'

class StartNowPage {
  get getHubPageHeading() {
    return $("h1[class*='govuk-heading-xl']")
  }

  get getHubPagecontent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getFindMonitoringStationsByLocation() {
    return $$(
      "a[class='govuk-link gem-c-cards__link gem-c-force-print-link-styles']"
    )[0]
  }

  get getFindMonitoringStationsByLocationStyling() {
    return $$("h2[class='gem-c-cards__sub-heading govuk-heading-s']")[0]
  }

  get getCreateCustomDataSet() {
    return $$(
      "a[class='govuk-link gem-c-cards__link gem-c-force-print-link-styles']"
    )[1]
  }

  get getCreateCustomDataSetStyling() {
    return $$("h2[class='gem-c-cards__sub-heading govuk-heading-s']")[1]
  }

  get getlistItem() {
    return $("li[class='gem-c-cards__list-item']")
  }

  get getParagraphItem() {
    return $("p[class='govuk-body gem-c-cards__description']")
  }
}

// module.exports=new StartNowPage()
export default new StartNowPage()
