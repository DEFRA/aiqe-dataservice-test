import { $ } from '@wdio/globals'

class StartNowPage {
  get getStartNowPageHeading() {
    return $$("h1[class*='govuk-heading-xl']")[0]
  }

  get getStartNowPagecontent() {
    return $("main[id*='main-content']")
  }

  get getStartNowBtn() {
    return $("a[class='govuk-button govuk-button--start']")
  }

  async startNowBtnClick() {
    await this.getStartNowBtn.click()
  }

  get getCitizenServiceLink() {
    return $$("a[class='govuk-link']")[4]
  }

  get getstartNowPageBodyText() {
    return $$("p[class*='govuk-body']")[4]
  }

  get getstartNowPageList() {
    return $("ul[class*='govuk-list govuk-list--bullet']")
  }

  get getstartNowPageListItem() {
    return $('li')
  }

  get getOtherWaysToGetThisInfoTitle() {
    return $("p[class*='govuk-heading-m']")
  }

  get getCheckAirQualityLink() {
    return $("a[href*='https://check-air-quality.service.gov.uk/']")
  }

  get getSourcesOfAirPollutionDataLink() {
    return $(
      "a[href*='https://www.gov.uk/government/collections/air-pollution-in-the-uk-sources-of-monitoring-data']"
    )
  }
}

// module.exports=new StartNowPage()
export default new StartNowPage()
