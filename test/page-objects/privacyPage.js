import { $ } from '@wdio/globals'

class PrivacyPage {

  get getPrivacyPageHeading() {
    return $("h1[class*='govuk-heading-xl odd-page']")
  }

  get getPrivacyPageContent() {
    return $("main[class*='govuk-main-wrapper app-main-wrapper']")
  }

  get getGetAirPollutionDataLink() {
    return $$("a[href='/']")[1]
  }

  get getCookieOptLink() {
    return $$("a[href='/cookies']")[0]
  }

  get getInformationCommisionersOfficeLink() {
    return (text) => $(`//a[contains(text(),'${text}')]`);
  }

  get getMakeAComplaintLink() {
    return $("a[href='https://ico.org.uk/make-a-complaint/']")
  }

  get getPersonalInformationCharterLink() {
    return $("a[href='https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs/about/personal-information-charter']")
  }

  get getparagraph(){
    return $$("p")[1]
  }

  get getSubTitle(){
    return $("h2")
  }

  get getList(){
    return $("ul[class*='govuk-list govuk-list--bullet']")
  }

  get getListItem(){
    return $("li")
  }



  

  

  

  

  

  

  



}

// module.exports=new StartNowPage()
export default new PrivacyPage()
