import { $ } from '@wdio/globals'

class PasswordPage {
  get getPasswordPageHeading() {
    return $("h1[class*='govuk-heading-xl']")
  }

  get PasswordBoxInput() {
    return $("input[id*='password']")
  }

  async inputPassword(password) {
    await this.PasswordBoxInput.setValue(password)
  }
}

// module.exports=new StartNowPage()
export default new PasswordPage()
