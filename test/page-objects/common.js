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
    return $("button[type='submit']")
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
}

export default new Common()
