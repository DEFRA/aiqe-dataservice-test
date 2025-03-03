import { $ } from '@wdio/globals'

class DisambigurationPage {
  get getDisambigurationPageHeading() {
    return $("h1[class*='govuk-heading-l govuk-!-margin-top-6']")
  }

  get getdisambigurationPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getBackLink() {
    return $("a[class='govuk-back-link']")
  }

  get getTrySearchingAgainLink() {
    return $$("a[class='govuk-link']")[1]
  }

  get getLocationLinkByText() {
    return (text) => $(`//span[contains(text(),'${text}')]`)
  }

  async locationLinkClick(LocationText) {
    const location = this.getLocationLinkByText(LocationText)
    await location.click()
  }

  get getParagraph() {
    return $("p[class='govuk-body']")
  }

  get getListItem() {
    return $('li')
  }
}

// module.exports=new StartNowPage()
export default new DisambigurationPage()
