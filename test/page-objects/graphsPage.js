import { $ } from '@wdio/globals'
class GraphsPage {
  get getGraphsPageContent() {
    return $(`main[id="main-content"]`)
  }

  get getGraphsPageTitle() {
    return $(`h1[class="govuk-heading-xl govuk-!-margin-bottom-2"]`)
  }

  get getDateRange() {
    return $(`p[class="govuk-body govuk-!-margin-bottom-4"]`)
  }

  get getLast24HoursTab() {
    return $$(
      `button[class="moj-sub-navigation__link aq-sub-navigation__button"]`
    )[0]
  }

  get getLast7DaysTab() {
    return $$(
      `button[class="moj-sub-navigation__link aq-sub-navigation__button"]`
    )[1]
  }

  get getVerificationBanner() {
    return $(`div[data-testid="app-verification-banner"]`)
  }

  get getViewPollutantSummaryDropDownLink() {
    return $(`summary[class="govuk-details__summary"]`)
  }
  // summary table elements

  get getSummaryTable() {
    return $$(`div[class="table-scroll-container"]`)[0]
  }

  get getSummaryTableColumnHeaders() {
    return $(`thead[class="defra-aq-levels-table__head"]`)
  }

  get getSummaryTablePollutantTitle() {
    return $(
      `th[class="defra-aq-levels-table__cell defra-aq-levels-table__cell--pollutant defra-aq-levels-table__cell--pollutant-title"]`
    )
  }

  get getSummaryTable24AverageTitle() {
    return $(
      `th[class="defra-aq-levels-table__cell defra-aq-levels-table__cell--average defra-aq-levels-table__cell--average-title"]`
    )
  }

  get getSummaryTableHourlyExceedanceTitle() {
    return $(
      `th[class="defra-aq-levels-table__cell defra-aq-levels-table__cell--hourly defra-aq-levels-table__cell--hourly-title"]`
    )
  }

  get getSummaryTableDataCapture() {
    return $(
      `span[class="defra-aq-levels-table__cell--data defra-aq-levels-table__cell--data-capture"]`
    )
  }

  get getUKLegalLimitsText() {
    return $$(`p[class="govuk-body-s"]`)[0]
  }

  get getViewGraphSubTitle() {
    return $(`h2[class="govuk-heading-l govuk-!-margin-top-6"]`)
  }

  get getUnitText() {
    return $$(`p[class="govuk-body-s"]`)[1]
  }

  get getGraphKey() {
    return $(`ul[aria-label="Pollutants in the graph"]`)
  }

  get getGraph() {
    return $(
      `svg[aria-label="Line chart of hourly readings in µg/m³ for PM2.5, PM10, Nitrogen dioxide, Ozone and Sulphur dioxide. The same readings are in the table below the graph."]`
    )
  }

  get getGraphUKLimitsText() {
    return $$(`p[class="govuk-body-s"]`)[2]
  }

  get getViewHourlyDataAsATableDropDownLink() {
    return $$(`summary[class="govuk-details__summary"]`)[1]
  }

  get getHourlyDataTable() {
    return $$(`div[class="govuk-details__text"]`)[1]
  }
}

// module.exports=new StartNowPage()
export default new GraphsPage()
