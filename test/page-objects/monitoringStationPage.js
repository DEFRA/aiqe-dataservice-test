import { $ } from '@wdio/globals'

class MonitoringStationPage {
  get getMonitoringPageHeading() {
    return $("h1[class*='govuk-heading-xl govuk-!-margin-bottom-1']")
  }

  get getMonitoringPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
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

  get getGoogleMapLink() {
    return $("a[href='https://www.google.co.uk/maps?q=51.52229,-0.125889']")
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

  get getSumarryTableHeading() {
    return $("h2[id*='airpollution-heading']")
  }

  get getDurationTag() {
    return $("p[id*='duration_current']")
  }

  async getTodayAsDayMonthString() {
    const today = new Date()
    const options = { day: 'numeric', month: 'long' }
    return today.toLocaleDateString('en-GB', options)
  }

  get get2018Button() {
    return $("a[id*='link-2018']")
  }

  get get2019Button() {
    return $("a[id*='link-2019']")
  }

  get get2020Button() {
    return $("a[id*='link-2020']")
  }

  get get2021Button() {
    return $("a[id*='link-2021']")
  }

  get get2022Button() {
    return $("a[id*='link-2022']")
  }

  get get2023Button() {
    return $("a[id*='link-2023']")
  }

  get get2024Button() {
    return $("a[id*='link-2024']")
  }

  get get2025Button() {
    return $("a[id*='link-2025']")
  }

  get getVerifiedTag() {
    return $$("h3[class*='govuk-heading-s']")[0]
  }

  async getPollutionListFromSummaryTable() {
    await $(
      "td[class='defra-aq-levels-table__cell defra-aq-levels-table__cell--pollutant'"
    ).waitForExist({ timeout: 5000 })

    const tds = await $$(
      "td[class='defra-aq-levels-table__cell defra-aq-levels-table__cell--pollutant'"
    )
    const cleanData = []
    for (const td of tds) {
      const text = await td.getText()
      if (typeof text === 'string') {
        const firstLine = text.split('\n')[0].trim()
        cleanData.push(firstLine)
      }
    }
    return cleanData
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

  get getdownloadDataHeading() {
    return $("h2[id*='year-heading']")
  }

  get getAllPollutantsSubHeading() {
    return $$("h3[id*='all-p']")[0]
  }

  get getDownloadAllPollutantsHourlyData() {
    return $(`a[onclick*='AllPollutants'][onclick*='Hourly']`)
  }

  get getSulphurDioxideSubHeading() {
    return $$("h2[id*='all-p']")[4]
  }

  get getDownloadSulphurDioxideHourlyDataLink() {
    return $(`a[onclick*='Sulphur dioxide'][onclick*='Hourly']`)
  }

  get getPM10SubHeading() {
    return $$("h2[id*='all-p']")[1]
  }

  get getDownloadPM10HourlyDataLink() {
    return $(`a[onclick*='PM10'][onclick*='Hourly']`)
  }

  get getPM25SubHeading() {
    return $$("h2[id*='all-p']")[0]
  }

  get getDownloadPM25HourlyDataLink() {
    return $(`a[onclick*='PM2.5'][onclick*='Hourly']`)
  }

  get getOzoneSubHeading() {
    return $$("h2[id*='all-p']")[3]
  }

  get getDownloadOzoneHourlyDataLink() {
    return $(`a[onclick*='Ozone'][onclick*='Hourly']`)
  }

  get getNitrogenDioxideSubHeading() {
    return $$("h2[id*='all-p']")[2]
  }

  get getDownloadNitrogenDioxideHourlyDataLink() {
    return $(`a[onclick*='Nitrogen dioxide'][onclick*='Hourly']`)
  }

  get getDownloadAllPollutantsDailyDataLink() {
    return $(`a[onclick*='AllPollutants'][onclick*='Daily']`)
  }

  get getDownloadNitrogenDioxideDailyDataLink() {
    return $(`a[onclick*='Nitrogen dioxide'][onclick*='Daily']`)
  }

  get getDownloadPM25DailyDataLink() {
    return $(`a[onclick*='PM2.5'][onclick*='Daily']`)
  }

  get getDownloadPM10DailyDataLink() {
    return $(`a[onclick*='PM10'][onclick*='Daily']`)
  }

  get getDownloadOzoneDailyDataLink() {
    return $(`a[onclick*='Ozone'][onclick*='Daily']`)
  }

  get getDownloadSulphurDioxideDailyDataLink() {
    return $(`a[onclick*='Sulphur dioxide'][onclick*='Daily']`)
  }

  get getPM25HourlyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--hourly']"
    )[0]
  }

  get getPM10HourlyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--hourly']"
    )[1]
  }

  get getNOHourlyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--hourly']"
    )[2]
  }

  get getOzoneHourlyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--hourly']"
    )[3]
  }

  get getSDHourlyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--hourly']"
    )[4]
  }

  get getPM25DailyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--daily']"
    )[0]
  }

  get getPM10DailyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--daily']"
    )[1]
  }

  get getNODailyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--daily']"
    )[2]
  }

  get getOzoneDailyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--daily']"
    )[3]
  }

  get getSDDailyExceedence() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--daily']"
    )[4]
  }

  get getNOHourlyExceedenceToggleTip() {
    return $$(
      "button[class*='tooltip defra-toggletip__button defra-toggletip-target']"
    )[2]
  }

  get getSDHourlyExceedenceToggleTip() {
    return $$(
      "button[class*='tooltip defra-toggletip__button defra-toggletip-target']"
    )[4]
  }
}

// module.exports=new StartNowPage()
export default new MonitoringStationPage()
