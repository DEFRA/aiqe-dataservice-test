/* eslint-disable prettier/prettier */
class CookiesBanner {
  get getCookieBanner() {
    return $("div[class*='govuk-cookie-banner']")
  }

  get getCookieBannerHeading() {
    return $("h2[class*='govuk-cookie-banner__heading govuk-heading-m']")
  }

  get getCookieBannerContent() {
    return $("div[class*='govuk-cookie-banner__content']")
  }

  get getCookieBannerContentStyling() {
    return $("p[class*='govuk-body']")
  }

  get getViewCookiesLink() {
    return $$("a[href*='/cookies/']")[0]
  }

  get getAcceptCookiesButton() {
    return $("button[class*='govuk-button js-cookie-banner-accept']")
  }

  get getCookieAcceptedContent() {
    return $$("div[class*='govuk-cookie-banner__content']")[1]
  }

  get getChangeCookieSettings() {
    return $$("a[href*='/cookies']")[1]
  }

  get getRejectCookiesButton() {
    return $("button[class*='govuk-button js-cookie-banner-reject']")
  }

  get getCookieRejectedContent() {
    return $$("div[class*='govuk-cookie-banner__content']")[2]
  }

  get getChangeCookieSettingsAfterReject() {
    return $$("a[class*='govuk-link']")[2]
  }

  get getHideCookiesButton() {
    return $(
      "button[class*='govuk-button js-cookie-banner-hide js-cookie-banner-hide--accept']"
    )
  }

  get getHideCookiesButtonAfterReject() {
    return $(
      "button[class*='govuk-button js-cookie-banner-hide js-cookie-banner-hide--reject']"
    )
  }
}

export default new CookiesBanner()
