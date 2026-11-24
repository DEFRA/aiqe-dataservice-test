import { $ } from '@wdio/globals'
class GraphsPage {
  get getGraphButton() {
    return $(
      `a[class="aq-button-secondary aq-button-secondary--icon govuk-!-margin-bottom-0"]`
    )
  }
}

// module.exports=new StartNowPage()
export default new GraphsPage()
