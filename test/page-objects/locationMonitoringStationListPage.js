import { $ } from '@wdio/globals'

class LocationMonitoringStationListPage {
  get getMonitoringStationListPageHeading() {
    return $("h1[class*='govuk-heading-xl govuk-!-margin-bottom-6']")
  }

  get getMonitoringStationListPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getChangeSearchAreaLink() {
    return $("a[href='/search-location/searchagain']")
  }

  get getMonitoringStationLink() {
    return (text) => $(`//a[contains(text(),'${text}')]`)
  }

  get getMonitoringStationTableHeading() {
    return $("th[class='govuk-table__header govuk-!-width-one-half']")
  }

  get getSiteTypeTableHeading() {
    return $("th[class='govuk-table__header govuk-!-width-one-quarter']")
  }

  get getPollutantsTableHeading() {
    return $(
      "th[class='govuk-table__header govuk-table__header--numeric govuk-!-width-one-quarter']"
    )
  }

  get getParagraph() {
    return $$("p[class='govuk-body']")[1]
  }

  get getListItem() {
    return $('li')
  }

  get getList() {
    return $("ul[class='govuk-list']")
  }

  get getTableHeaderPadding() {
    return $("tr[class='govuk-table__header']")
  }

  get getTablecell1Padding() {
    return $("th[class='govuk-table__cell']")
  }

  get getTablecell2Padding() {
    return $("td[class='govuk-table__cell govuk-table__cell--numeric']")
  }
}

// module.exports=new StartNowPage()
export default new LocationMonitoringStationListPage()
