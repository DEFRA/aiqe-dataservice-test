import { $ } from '@wdio/globals'

class AddPollutantPage {
  get getAddPollutantHeading() {
    return $("h1[class*='govuk-heading-l']")
  }

  get getAddPollutantPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getSelectOneOptionText() {
    return $$("div[class*='govuk-hint']")[0]
  }

  get getAddPollutantOption() {
    return $$("label[class*='govuk-label govuk-radios__label']")[0]
  }

  get getAddPollutantRadio() {
    return $$("input[type='radio']")[0]
  }

  get getAddGroupOfPollutantsOption() {
    return $$("label[class*='govuk-label govuk-radios__label']")[1]
  }

  get getAddGroupOfPollutantsRadio() {
    return $$("input[type='radio']")[1]
  }

  get getAddUpToTenPollutantsText() {
    return $$("div[class*='govuk-hint']")[1]
  }

  get getAddPollutantSearchBox() {
    return $("input[id*='my-autocomplete']")
  }

  get getAddPollutantButton() {
    return $("button[id*='add-pollutant-button']")
  }

  get getSearchFirstAutocomplete() {
    return $("li[id*='my-autocomplete__option--0']")
  }

  get getAllSearchAutocompleteResults() {
    return $("ul[id*='my-autocomplete__listbox']")
  }

  get getAddedPollutantsTitle() {
    return $("caption[class*='govuk-table__caption govuk-table__caption--m']")
  }

  get getFirstAddedPollutantLabel() {
    return $("th[class*='govuk-table__header']")
  }

  get getFirstAddedPollutantValue() {
    return $("td[class*='govuk-table__cell']")
  }

  get getSecondAddedPollutantLabel() {
    return $$("th[class*='govuk-table__header']")[1]
  }

  get getSecondAddedPollutantValue() {
    return $$("td[class*='govuk-table__cell']")[1]
  }

  get getThirdAddedPollutantLabel() {
    return $$("th[class*='govuk-table__header']")[2]
  }

  get getThirdAddedPollutantValue() {
    return $$("td[class*='govuk-table__cell']")[2]
  }

  get getFirstAddedPollutantRemoveLink() {
    return $("a[class*='govuk-link remove-pollutant']")
  }

  get getSecondAddedPollutantRemoveLink() {
    return $$("a[class*='govuk-link remove-pollutant']")[1]
  }

  get getThirdAddedPollutantRemoveLink() {
    return $$("a[class*='govuk-link remove-pollutant']")[2]
  }

  async addPollutant(pollutant) {
    await this.getAddPollutantSearchBox.setValue(pollutant)
    await this.getSearchFirstAutocomplete.click()
    await this.getAddPollutantButton.click()
    await this.getAddPollutantButton.click()
  }

  get getPollutantGroupHint() {
    return $("div[id*='pollutant-group-hint']")
  }

  get getDAQIOptionTitle() {
    return $$("label[class*='govuk-label govuk-radios__label']")[2]
  }

  get getDAQIOptionRadio() {
    return $$("input[type='radio']")[2]
  }

  get getDAQIOptionDescription() {
    return $$("div[class*='govuk-hint govuk-radios__hint']")[0]
  }

  get getAQSROptionTitle() {
    return $$("label[class*='govuk-label govuk-radios__label']")[3]
  }

  get getAQSROptionRadio() {
    return $$("input[type='radio']")[3]
  }

  get getAQSROptionDescription() {
    return $$("div[class*='govuk-hint govuk-radios__hint']")[1]
  }
}

// module.exports=new StartNowPage()
export default new AddPollutantPage()
