import { $ } from '@wdio/globals'

class AddYearPage {
  get getAddYearHeading() {
    return $("h1[class*='govuk-heading-l']")
  }

  get getAddYearPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getYearToDateOption() {
    return $("label[for*='time-ytd']")
  }

  get getAnyYearOption() {
    return $("label[for*='time-any']")
  }

  get getAnyYearHintText() {
    return $("div[id*='time-any-hint']")
  }

  get getYearSubTitle() {
    return $("label[for*='any-year-input']")
  }

  get getAnyYearForExample() {
    return $("div[id*='any-year-hint']")
  }

  get getAnyYearInput() {
    return $("input[id*='any-year-input']")
  }

  get getRangeOfYearsOption() {
    return $("label[for*='time-range']")
  }

  get getRangeOfYearsHintText() {
    return $("div[id*='time-range-hint']")
  }

  get getRangeOfYearsStartYearSubTitle() {
    return $("label[for*='range-start-year']")
  }

  get getRangeOfYearsStartYearHint() {
    return $("div[id*='range-start-hint']")
  }

  get getRangeOfYearsStartYearInput() {
    return $("input[id*='range-start-year']")
  }

  get getRangeOfYearsEndYearSubTitle() {
    return $("label[for*='range-end-year']")
  }

  get getRangeOfYearsEndYearHint() {
    return $("div[id*='range-end-hint']")
  }

  get getRangeOfYearsEndYearInput() {
    return $("input[id*='range-end-year']")
  }

  get continueButton() {
    return $("button[id='continuebutton']")
  }
}

// module.exports=new StartNowPage()
export default new AddYearPage()
