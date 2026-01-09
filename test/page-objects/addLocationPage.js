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

  get getCountriesHintText() {
    return $$("div[class*='govuk-hint govuk-radios__hint']")[0]
  }

  get getEnglandOption() {
    return $("label[for*='country-england']")
  }

  get getScotlandOption() {
    return $("label[for*='country-scotland']")
  }

  get getWalesOption() {
    return $("label[for*='country-wales']")
  }

  get getNorthernIrelandOption() {
    return $("label[for*='country-ni']")
  }

  get getLocalAuthorityOption() {
    return $("label[for*='location-4']")
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
}

// module.exports=new StartNowPage()
export default new AddLocationPage()
