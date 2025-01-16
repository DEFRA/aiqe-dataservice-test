/* eslint-disable prettier/prettier */
class Header {

  get getHeaderOverall(){
    return $("header[data-module='govuk-header']")
  }
  get getGovUKCrownLogo() {
    return $("div[class='govuk-header__logo']")
  }
  get getGovUKCrownLink() {
    return $("a[class='govuk-header__link govuk-header__link--homepage']")
  }

  get getAirPolutionDataHeaderLink() {
    return $("a[class='govuk-header__link govuk-header__service-name']")
  }

  // Beta Banner
  get getBetaBanner() {
    return $("div[class='govuk-phase-banner']")
  }

  // Beta Banner - Feedback
  get getBetaBannerFeedbackLink() {
    return $("span[class='govuk-phase-banner__text'] a[class='govuk-link']")
  }

  get getBetalogo() {
    return $("strong[class='govuk-tag govuk-phase-banner__content__tag']")
  }

  get getBetaBannerText() {
    return $("span[class='govuk-phase-banner__text']")
  }
  
  
}

export default new Header()
