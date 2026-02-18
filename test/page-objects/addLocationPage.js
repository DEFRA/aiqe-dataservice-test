import { $ } from '@wdio/globals'

class AddLocationPage {
  get getAddLocationHeading() {
    return $("h1[class*='govuk-heading-l']")
  }

  get getAddLocationPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getCountriesOption() {
    return $("label[for*='location-2']")
  }

  get getCountriesOptionRadio() {
    return $("input[id*='location-2']")
  }

  get getCountriesHintText() {
    return $$("div[class*='govuk-hint govuk-radios__hint']")[0]
  }

  get getEnglandOption() {
    return $("label[for*='country-england']")
  }

  get getEnglandCheckbox() {
    return $("input[id*='country-england']")
  }

  get getScotlandOption() {
    return $("label[for*='country-scotland']")
  }

  get getScotlandCheckbox() {
    return $("input[id*='country-scotland']")
  }

  get getWalesOption() {
    return $("label[for*='country-wales']")
  }

  get getWalesCheckbox() {
    return $("input[id*='country-wales']")
  }

  get getNorthernIrelandOption() {
    return $("label[for*='country-ni']")
  }

  get getNorthernIrelandCheckbox() {
    return $("input[id*='country-ni']")
  }

  get getLocalAuthorityOption() {
    return $("label[for*='location-4']")
  }

  get getLocalAuthorityRadio() {
    return $("input[id*='location-4']")
  }

  get getLocalAuthorityHintText() {
    return $$("div[class*='govuk-hint govuk-radios__hint']")[1]
  }

  get getLocalAuthorityNameLabel() {
    return $("label[for*='my-autocomplete']")
  }

  get getLocalAuthoritySearchBox() {
    return $("input[id*='my-autocomplete']")
  }

  get getAddLocalAuthorityButton() {
    return $("button[id*='add-more-locations-button']")
  }

  get getLocationContinueButton() {
    return $("button[id*='add-location-button']")
  }

  get getLocalAuthorityListOption() {
    return $("li[id*='my-autocomplete__option--0']")
  }

  get getAddedLocalAuthoritiesTitle() {
    return $("caption[id*='location-table-caption']")
  }

  get getAddedLocalAuthorityOneLabel() {
    return $$("th[class*='govuk-table__header']")[0]
  }

  get getAddedLocalAuthorityOneName() {
    return $$("td[class*='govuk-table__cell']")[0]
  }

  get getAddedLocalAuthorityOneRemoveLink() {
    return $$("td[class*='govuk-table__cell']")[1]
  }
}

// module.exports=new StartNowPage()
export default new AddLocationPage()
