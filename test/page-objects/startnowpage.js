import { $ } from '@wdio/globals'

class StartNowPage {
  get getStartNowPageHeading() {
    return $$("h1[class*='govuk-heading-xl']")[1]
  }

  get getStartNowPagecontent() {
    return $("div[class*='govuk-grid-column-two-thirds-from-desktop']")
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

  async citizenServiceLinkClick() {
    await this.getCitizenServiceLink.click()
  }

  get getstartNowPageBodyText() {
    return $("p[class*='govuk-body']")
  }

  get getstartNowPageList() {
    return $("ul[class*='govuk-list govuk-list--bullet']")
  }

  get getstartNowPageListItem() {
    return $('li')
  }
}

// module.exports=new StartNowPage()
export default new StartNowPage()
