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
    return $$(`a[class="moj-sub-navigation__link"]`)[0]
  }

  get getLast7DaysTab() {
    return $$(`a[class="moj-sub-navigation__link"]`)[1]
  }

  get getVerificationBanner() {
    return $(`div[data-testid="app-verification-banner"]`)
  }

  get getViewPollutantSummaryDropDownLink() {
    return $(`summary[class="govuk-details__summary"]`)
  }

  get getSummaryTable() {
    return $$(`div[class="govuk-details__text"]`)[0]
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
