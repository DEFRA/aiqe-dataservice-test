import { $ } from '@wdio/globals'
class MapsPage {
  get getExitMapButton() {
    return $(`button[id*="exit-map"]`)
  }
}

// module.exports=new StartNowPage()
export default new MapsPage()
