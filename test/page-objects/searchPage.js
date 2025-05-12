import { $ } from '@wdio/globals'

class SearchPage {
  get getSearchPageHeaderText() {
    return $("label[class='govuk-heading-l govuk-!-margin-bottom-4']")
  }

  get getSearchPageContent() {
    return $("div[class='govuk-grid-column-two-thirds-from-desktop']")
  }

  get getSearchPageHintText() {
    return $("p[class='govuk-body govuk-hint']")
  }

  get getEnterTownOrPostcodeLabel() {
    return (text) => $(`//label[contains(text(),'${text}')]`)
  }

  get searchBox() {
    return $("input[class='govuk-input']")
  }

  async setsearch(searchTerm) {
    await this.searchBox.setValue(searchTerm)
  }

  get approxSearchAreaLabel() {
    return $("legend[class='govuk-fieldset__legend']")
  }

  get getOptionByText() {
    return (text) => $(`//label[contains(text(),'${text}')]`)
  }

  async milesOptionClick(optionText) {
    const option = this.getOptionByText(optionText)
    await option.click()
  }

  get getContinueBtn() {
    return $("button[class='govuk-button']")
  }

  async continueBtnClick() {
    await this.getContinueBtn.click()
  }

  get defaultOption() {
    return $("input[value='5']")
  }
}

// module.exports=new StartNowPage()
export default new SearchPage()
