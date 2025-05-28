import { $ } from '@wdio/globals'

class ErrorPage {
  // could not find error page
  get getCouldNotFindHeading() {
    return $("h1[class='govuk-heading-l odd-page']")
  }

  get getCouldNotFindContent() {
    return $("main[class='govuk-main-wrapper app-main-wrapper']")
  }

  get getGoBackToSearchALocationLink() {
    return $$("a[href='/search-location']")[1]
  }

  get getCouldNotFindP() {
    return $$("p[class='govuk-body']")[4]
  }

  get getCouldNotFindList() {
    return $("ul[class='govuk-list govuk-list--bullet']")
  }

  get getCouldNotFindListItem() {
    return $('li')
  }

  // search page error
  get getErrorSummary() {
    return $("div[class='govuk-error-summary']")
  }

  get getErrorTitle() {
    return $("h2[class='govuk-error-summary__title']")
  }

  get getErrorLink() {
    return $("a[href='#search-input']")
  }

  get getErrorMessage() {
    return $("p[class='govuk-error-message']")
  }
}

// module.exports=new StartNowPage()
export default new ErrorPage()
