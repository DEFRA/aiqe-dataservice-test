import { $ } from '@wdio/globals'

class MonitoringStationPage {
  get getGoogleMapLink() {
    return $("a[href='https://www.google.co.uk/maps?q=51.52229,-0.125889']")
  }

  get getMonitoringPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getMonitoringPageHeading() {
    return $("h1[class*='govuk-heading-xl govuk-!-margin-bottom-1']")
  }

  get getMonitoringStationStatus() {
    return $("strong[class*='govuk-tag status-tag govuk-tag--green']")
  }

  get getMonitoringStationLastReading() {
    return $("p[class*='govuk-body status-description govuk-!-margin-top-3']")
  }

  get getMonitoringNetworkTitle() {
    return $$("dt[class*='defra-aq-features__key govuk-caption-m']")[0]
  }

  get getMonitoringNetworkData() {
    return $$("dd[class*='defra-aq-features__value govuk-body']")[0]
  }

  get getRegionTitle() {
    return $$("dt[class*='defra-aq-features__key govuk-caption-m']")[1]
  }

  get getRegionData() {
    return $$("dd[class*='defra-aq-features__value govuk-body']")[1]
  }

  get getSiteTypeTitle() {
    return $$("dt[class*='defra-aq-features__key govuk-caption-m']")[2]
  }

  get getSiteTypeData() {
    return $$("dd[class*='defra-aq-features__value govuk-body']")[2]
  }

  get getgridSideStyles() {
    return $("div[class*='govuk-grid-column-full']")
  }

  get getgridTopBottomStyles() {
    return $("dl[class*='defra-aq-features__list govuk-!-margin-top-3']")
  }

  get getFeatureItem() {
    return $("div[class*='defra-aq-features__item']")
  }

  get getFeatureCaption() {
    return $("dt[class*='defra-aq-features__key govuk-caption-m']")
  }

  get getFeatureBody() {
    return $("dd[class*='defra-aq-features__value govuk-body']")
  }

  get getToggleTip() {
    return $("div[class*='defra-toggletip']")
  }

  get getMapLinkPadding() {
    return $("p[class*='govuk-body govuk-!-margin-top-1']")
  }

  get getGoogleCookieAccept() {
    return $("form[action*='https://consent.google.co.uk/save']")
  }
}

// module.exports=new StartNowPage()
export default new MonitoringStationPage()
