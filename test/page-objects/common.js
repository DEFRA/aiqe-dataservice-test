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
}

export default new Common()
