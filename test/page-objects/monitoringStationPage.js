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
    return $("p[class*='status-description govuk-!-margin-top-3']")
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

  get getSiteTypeToggleTip() {
    return $$(
      "button[class*='tooltip defra-toggletip__button defra-toggletip-target']"
    )[0]
  }

  get getSiteTypeToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[0]
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
    return $$("p[class*='govuk-heading-s']")[0]
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

  get getPM25AnnaulAverageST() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--average']"
    )[0]
  }

  get getPM10AnnaulAverageST() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--average']"
    )[1]
  }

  get getNitrogenDioxideAnnaulAverageST() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--average']"
    )[2]
  }

  get getOzoneAnnaulAverageST() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--average']"
    )[3]
  }

  get getSulphurDioxideAnnaulAverageST() {
    return $$(
      "td[class*='defra-aq-levels-table__cell defra-aq-levels-table__cell--average']"
    )[4]
  }

  get getdownloadDataHeading() {
    return $("h2[id*='year-heading']")
  }

  get getApproximateFileSizesDropDownLink() {
    return $("span[class*='govuk-details__summary-text']")
  }

  get getApproximateFileSizesContent() {
    return $("div[class*='govuk-details__text']")
  }

  get getAllPollutantsSubHeading() {
    return $$("h3[id*='all-p']")[0]
  }

  get getDownloadAllPollutantsHourlyData() {
    return $(`a[onclick*="getAPIstn_details1('AllPollutants','Hourly')"]`)
  }

  get getSulphurDioxideSubHeading() {
    return $$("h3[id*='all-p']")[5]
  }

  get getDownloadSulphurDioxideHourlyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Sulphur dioxide','Hourly')"]`)
  }

  get getPM10SubHeading() {
    return $$("h3[id*='all-p']")[2]
  }

  get getDownloadPM10HourlyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('PM10','Hourly')"]`)
  }

  get getPM25SubHeading() {
    return $$("h3[id*='all-p']")[1]
  }

  get getDownloadPM25HourlyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('PM2.5','Hourly')"]`)
  }

  get getOzoneSubHeading() {
    return $$("h3[id*='all-p']")[4]
  }

  get getDownloadOzoneHourlyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Ozone','Hourly')"]`)
  }

  get getNitrogenDioxideSubHeading() {
    return $$("h3[id*='all-p']")[3]
  }

  get getDownloadNitrogenDioxideHourlyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Nitrogen dioxide','Hourly')"]`)
  }

  get getDownloadAllPollutantsDailyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('AllPollutants','Daily')"]`)
  }

  get getDownloadNitrogenDioxideDailyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Nitrogen dioxide','Daily')"]`)
  }

  get getDownloadPM25DailyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('PM2.5','Daily')"]`)
  }

  get getDownloadPM10DailyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('PM10','Daily')"]`)
  }

  get getDownloadOzoneDailyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Ozone','Daily')"]`)
  }

  get getDownloadSulphurDioxideDailyDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Sulphur dioxide','Daily')"]`)
  }

  get getDownloadAllPollutantsAnnualDataLink() {
    return $(`a[onclick*="getAPIstn_details1('AllPollutants','Annual')"]`)
  }

  get getDownloadPM25AnnualDataLink() {
    return $(`a[onclick*="getAPIstn_details1('PM2.5','Annual')"]`)
  }

  get getDownloadPM10AnnualDataLink() {
    return $(`a[onclick*="getAPIstn_details1('PM10','Annual')"]`)
  }

  get getDownloadNitrogenDioxideAnnualDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Nitrogen dioxide','Annual')"]`)
  }

  get getDownloadOzoneAnnualDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Ozone','Annual')"]`)
  }

  get getDownloadSulphurDioxideAnnualDataLink() {
    return $(`a[onclick*="getAPIstn_details1('Sulphur dioxide','Annual')"]`)
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
    return $(
      "button[aria-label*='More information about hourly exceedances for nitrogen dioxide']"
    )
  }

  get getNOHourlyExceedenceToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[5]
  }

  get getSDHourlyExceedenceToggleTip() {
    return $(
      "button[aria-label*='More information about hourly exceedances for sulphur dioxide']"
    )
  }

  get getSDHourlyExceedenceToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[9]
  }

  get getPM10DailyExceedenceToggleTip() {
    return $(
      "button[aria-label*='More information about daily exceedances for PM10']"
    )
  }

  get getPM10DailyExceedenceToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[3]
  }

  get getSDDailyExceedenceToggleTip() {
    return $(
      "button[aria-label*='More information about daily exceedances for sulphur dioxide']"
    )
  }

  get getSDDailyExceedenceToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[8]
  }

  get getPM25AnnualAverageToggleTip() {
    return $(
      "button[aria-label*='More information about the UK annual average limit value for PM2.5']"
    )
  }

  get getPM25AnnualAverageToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[1]
  }

  get getPM10AnnualAverageToggleTip() {
    return $(
      "button[aria-label*='More information about the UK annual average limit value for PM10']"
    )
  }

  get getPM10AnnualAverageToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[2]
  }

  get getNitrogenDioxideAnnualAverageToggleTip() {
    return $(
      "button[aria-label*='More information about the UK annual average limit value for nitrogen dioxide']"
    )
  }

  get getNitrogenDioxideAnnualAverageToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[4]
  }

  get getOzoneAnnualAverageToggleTip() {
    return $(
      "button[aria-label*='More information about the UK annual average limit value for ozone']"
    )
  }

  get getOzoneAnnualAverageToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[6]
  }

  get getSulphurDioxideAnnualAverageToggleTip() {
    return $(
      "button[aria-label*='More information about the UK annual average limit value for sulphur dioxide']"
    )
  }

  get getSulphurDioxideAnnualAverageToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[7]
  }

  get getPM25DataCapture() {
    return $$("span[class*='defra-aq-levels-table__cell--data']")[0]
  }

  get getPM10DataCapture() {
    return $$("span[class*='defra-aq-levels-table__cell--data']")[1]
  }

  get getNODataCapture() {
    return $$("span[class*='defra-aq-levels-table__cell--data']")[2]
  }

  get getOzoneDataCapture() {
    return $$("span[class*='defra-aq-levels-table__cell--data']")[3]
  }

  get getSDDataCapture() {
    return $$("span[style*='margin-top: 4px;']")[4]
  }

  get getDataCaptureToggleTip() {
    return $(
      "button[aria-label*='More information about the Data capture percentage']"
    )
  }

  get getDataCaptureToggleTipInfoText() {
    return $$("span[class*='defra-toggletip__text']")[7]
  }

  get getLowDataCaptureFlag() {
    return $("strong[class*='govuk-tag govuk-tag--red govuk-!-font-size-16']")
  }

  get getAboveLimitFlag() {
    return $("strong[class*='govuk-tag govuk-tag--red govuk-!-font-size-16']")
  }
}

// module.exports=new StartNowPage()
export default new MonitoringStationPage()
