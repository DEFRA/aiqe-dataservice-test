/* eslint-disable prettier/prettier */
class Footer {
  get getFooterOverall(){
    return $("footer[class='govuk-footer']")
  }

  get getAllFooterLinks() {
    return $$("a[class='govuk-footer__link']")
  }

  get getPrivacyFooterLink() {
    return this.getAllFooterLinks[0]
  }

  get getCookiesFooterLink() {
    return this.getAllFooterLinks[1]
  }


  get getAccessibilityStatementFooterLink() {
    return this.getAllFooterLinks[2]
  }

  get getOglFooterLink() {
    return this.getAllFooterLinks[3]
  }
   
  get getOGLLogo() {
    return $("svg[class='govuk-footer__licence-logo']")
  }

  get getOGLStatement() {
    return $("span[class='govuk-footer__licence-description']")
  }
  // logo
  get getCrownCoprightLogo() {
    return $("a[class='govuk-footer__link govuk-footer__copyright-logo']")
  }

  
  
}

export default new Footer()
