/* eslint-disable prettier/prettier */
class Common {
  // get styling method is used in all tests
  async getStyles(element, properties) {
    const styles = await browser.execute(
      (el, props) => {
        if (!el) throw new Error('element not found')
        const computedStyle = window.getComputedStyle(el)
        return props.reduce((acc, prop) => {
          acc[prop] = computedStyle.getPropertyValue(prop)
          return acc
        }, {})
      },
      element,
      properties
    )

    return styles
  }

  get getBackLink() {
    return $("a[class='govuk-back-link']")
  }

  get continueButton() {
    return $("button[id='continue-button']")
  }

  async getList(pageElement) {
    const elements = await $$(pageElement)
    const headingsText = []
    for (const el of elements) {
      const text = await el.getText()
      headingsText.push(text)
    }
    return headingsText
  }

  async isAnyCaptureUnderAmount(elements, Number) {
    let anyUnderNumber = false

    for (const element of elements) {
      const text = await element.getText()
      const match = text.match(/([\d.]+)%/)
      if (match) {
        const value = parseFloat(match[1])
        if (value < Number) {
          anyUnderNumber = true
        }
      }
    }
    return anyUnderNumber
  }

  async isAnyCaptureOverAmount(elements, Number) {
    let anyOverAmount = false

    for (const element of elements) {
      const text = await element.getText()
      const match = text.match(/([\d.]+)%/)
      if (match) {
        const value = parseFloat(match[1])
        if (value > Number) {
          anyOverAmount = true
        }
      }
    }
    return anyOverAmount
  }

  async notDisplayed(element) {
    await element.waitForDisplayed({
      reverse: true
    })
  }

  async elementRemoved(element) {
    await element.waitForExist({
      reverse: true
    })
  }

  async clearInput(
    inputElement,
    { closeDropdown = true, timeout = 3000 } = {}
  ) {
    await inputElement.click()
    if (closeDropdown) {
      await browser.keys('Escape')
    }
    await inputElement.clearValue()
    await browser.waitUntil(
      async () => (await inputElement.getValue()) === '',
      { timeout, timeoutMsg: 'Input did not clear' }
    )
  }

  async legalWait() {
    await browser.waitUntil(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        return true
      },
      { timeout: 4000 }
    )
  }

  async getTodayAsDayMonthString() {
    const today = new Date()
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    return today.toLocaleDateString('en-GB', options)
  }

  async errorSummaryItemByText(message) {
    return $(
      `//ul[contains(@class,'govuk-error-summary__list')]//a[normalize-space(.)="${message}"]`
    )
  }

  parseNumber(s) {
    if (!s) return null
    const m = String(s).match(/-?\d+(?:\.\d+)?/)
    return m ? Number(m[0]) : null
  }
}

export default new Common()
