import { $ } from '@wdio/globals'

class CookiesPage {
  get getCookiesPageHeading() {
    return $("h1[class*='govuk-heading-xl odd-page']")
  }

  get getCookiesPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getGetAirPollutionDataLink() {
    return $$("a[href='/']")[1]
  }

  get getHowToManageCookiesLink() {
    return $$("a[class='govuk-link']")[5]
  }

  get getYesCookieOption() {
    return $("input[value='Yes']")
  }

  get getNoCookieOption() {
    return $("input[value='No']")
  }

  get getSaveCookieSettingButton() {
    return $$("button[data-module='govuk-button']")[4]
  }

  get getParagraph() {
    return $("p[class='govuk-body']")
  }

  get getSubTitle() {
    return $('h2')
  }

  get getTableCaption() {
    return $("caption[class='govuk-table__caption']")
  }

  get getTableHeading() {
    return $("th[class='govuk-table__header']")
  }

  get getTableContent() {
    return $("td[class='govuk-table__cell']")
  }

  get getlist() {
    return $(
      "ul[class='govuk-list govuk-list--bullet govuk-!-margin-bottom-6']"
    )
  }

  get getListItem() {
    return $('li')
  }

  get getAcceptCookiesQuestion() {
    return $("legend[class='govuk-fieldset__legend govuk-fieldset__legend--s']")
  }

  get getYesLabel() {
    return $("label[for='whereDoYouLive']")
  }

  get getNoLabel() {
    return $("label[for='whereDoYouLive-2']")
  }

  get getRadioItem() {
    return $("div[class='govuk-radios__item']")
  }
}

// module.exports=new StartNowPage()
export default new CookiesPage()
