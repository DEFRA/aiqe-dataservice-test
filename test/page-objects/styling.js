/* eslint-disable prettier/prettier */
class Styling {

  async getStyles(element, properties) {
    const styles = await browser.execute((el, props) => {
      if (!el) throw new Error('element not found');
      const computedStyle = window.getComputedStyle(el);
      return props.reduce((acc,prop) => {
        acc[prop] = computedStyle.getPropertyValue(prop);
        return acc;
      }, {});
    }, element, properties);

    return styles;
  }
  
}

export default new Styling()
