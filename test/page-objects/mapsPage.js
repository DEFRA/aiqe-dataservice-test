import { $ } from '@wdio/globals'

class MapsPage {
  get getExitMapButton() {
    return $(`button[id*="exit-map"]`)
  }

  get getOpenFilterPanelButton() {
    return $(`button[aria-label*="Toggle filter panel"]`)
  }

  get getOpenMapKeyButton() {
    return $(`button[aria-label*="Toggle map key"]`)
  }

  get getZoomInButton() {
    return $(`button[id*="map-zoom-in"]`)
  }

  get getZoomOutButton() {
    return $(`button[id*="map-zoom-out"]`)
  }
  // map key

  get getMapKey() {
    return $(`div[aria-label*="Map key"]`)
  }

  get getMapKeyClose() {
    return $(`button[aria-label*="Close map key"]`)
  }

  get getMapKeyHeading() {
    return $(`h2[class*="govuk-heading-s govuk-!-margin-bottom-1"]`)
  }

  get getMapKeyDailyAirQualityIndexDAQISubheading() {
    return $(`p[class*="govuk-body-s govuk-!-margin-bottom-2"]`)
  }

  get getMapKeyScaleBandOne() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--1"]`)
  }

  get getMapKeyScaleBandTwo() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--2"]`)
  }

  get getMapKeyScaleBandThree() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--3"]`)
  }

  get getMapKeyScaleBandFour() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--4"]`)
  }

  get getMapKeyScaleBandFive() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--5"]`)
  }

  get getMapKeyScaleBandSix() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--6"]`)
  }

  get getMapKeyScaleBandSeven() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--7"]`)
  }

  get getMapKeyScaleBandEight() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--8"]`)
  }

  get getMapKeyScaleBandNine() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--9"]`)
  }

  get getMapKeyScaleBandTen() {
    return $(`div[class*="aq-daqi-scale__band aq-daqi-scale__band--10"]`)
  }

  get getMapKeyLowLabel() {
    return $$(`span[class*="aq-daqi-scale__level"]`)[0]
  }

  get getMapKeyLowScaleRange() {
    return $$(`span[class*="aq-daqi-scale__range"]`)[0]
  }

  get getMapKeyModerateLabel() {
    return $$(`span[class*="aq-daqi-scale__level"]`)[1]
  }

  get getMapKeyModerateScaleRange() {
    return $$(`span[class*="aq-daqi-scale__range"]`)[1]
  }

  get getMapKeyHighLabel() {
    return $$(`span[class*="aq-daqi-scale__level"]`)[2]
  }

  get getMapKeyHighScaleRange() {
    return $$(`span[class*="aq-daqi-scale__range"]`)[2]
  }

  get getMapKeyVeryHighLabel() {
    return $$(`span[class*="aq-daqi-scale__level"]`)[3]
  }

  get getMapKeyVeryHighScaleRange() {
    return $$(`span[class*="aq-daqi-scale__range"]`)[3]
  }
  // map filter panel

  get getMapFilterPanel() {
    return $(`div[class*="aq-filter-panel__body"]`)
  }

  get getMapFilterPanelTitle() {
    return $(
      `p[class*="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0"]`
    )
  }

  get getMapFilterPanelCross() {
    return $(`button[id*="filter-panel-close"]`)
  }

  get getMapFilterPanelDAQIPollutantsButton() {
    return $(`button[id*="filter-tab-daqi"]`)
  }

  get getMapFilterPanelPM25Checkbox() {
    return $(`input[value*="PM25"]`)
  }

  get getMapFilterPanelPM25Label() {
    return $$(`label[for*="filter-pollutant"]`)[0]
  }

  get getMapFilterPanelPM10Checkbox() {
    return $(`input[value*="PM10"]`)
  }

  get getMapFilterPanelPM10Label() {
    return $$(`label[for*="filter-pollutant"]`)[1]
  }

  get getMapFilterPanelNO2Checkbox() {
    return $(`input[value*="NO2"]`)
  }

  get getMapFilterPanelNO2Label() {
    return $$(`label[for*="filter-pollutant"]`)[2]
  }

  get getMapFilterPanelOzoneCheckbox() {
    return $(`input[value*="O3"]`)
  }

  get getMapFilterPanelOzoneLabel() {
    return $$(`label[for*="filter-pollutant"]`)[3]
  }

  get getMapFilterPanelSulphurDioxideCheckbox() {
    return $(`input[value*="SO2"]`)
  }

  get getMapFilterPanelSulphurDioxideLabel() {
    return $$(`label[for*="filter-pollutant"]`)[4]
  }

  get getMapFilterPanelDataSourcesDropdownLink() {
    return $$(`summary[class*="govuk-details__summary"]`)[12]
  }

  get getMapFilterPanelDataSourceAURNText() {
    return $$(`div[class*="govuk-details__text"]`)[12]
  }

  get getMapFilterPanelOtherPollutantsButton() {
    return $(`button[id*="filter-tab-other"]`)
  }

  get getMapFilterPanelOtherPollutantsText() {
    return $$(`p[class*="govuk-body-s govuk-!-margin-top-2"]`)[0]
  }

  // Monitoring Station Information Panel

  get getMonitoringStationInformationPanel() {
    return $(`div[class*="aq-map-info__container"]`)
  }

  get getMonitoringStationInformationPanelStationHeading() {
    return $(`div[class*="aq-station-header"]`)
  }

  get getMonitoringStationInformationPanelStationStatus() {
    return $(`strong[class*="aq-station-tag aq-station-tag--active"]`)
  }

  get getMonitoringStationInformationPanelCloseButton() {
    return $(`button[aria-label*="Close station information"]`)
  }

  get getMonitoringStationInformationPanelMonitoringStationInformation() {
    return $(`dl[id*="sp-details"]`)
  }

  get getMonitoringStationInformationPanelMonitoringStationInfoLabel() {
    return $(`dt`)
  }

  get getMonitoringStationInformationPanelMonitoringStationInfoValue() {
    return $(`dd`)
  }

  get getMonitoringStationInformationPanelMonitoringStationInfoDaqiLowStatus() {
    return $(`span[class*="aq-daqi-tag aq-daqi-tag--low"]`)
  }

  get getMonitoringStationInformationPanelMonitoringStationLink() {
    return $(`a[id*="sp-station-link"]`)
  }

  get getMapCanvas() {
    return $(`canvas.maplibregl-canvas`)
  }

  /**
   * Clicks a monitoring station marker rendered on the map canvas.
   * The map (MapLibre GL) renders markers on a single <canvas> element,
   * so they can't be targeted with a normal CSS selector - the click
   * must be sent to the canvas at the pixel offset where the marker is drawn.
   *
   * @param {number} xOffset - pixel offset from the centre of the canvas (positive = right)
   * @param {number} yOffset - pixel offset from the centre of the canvas (positive = down)
   */
  async clickMapMarkerAtOffset(xOffset = 0, yOffset = 0) {
    const canvas = await this.getMapCanvas
    await canvas.waitForDisplayed()

    await browser
      .action('pointer', { parameters: { pointerType: 'mouse' } })
      .move({ duration: 0, origin: canvas, x: xOffset, y: yOffset })
      .down({ button: 0 })
      .up({ button: 0 })
      .perform()
  }

  /**
   * Scans a grid of points across the map canvas and clicks the first
   * one that causes a monitoring station info panel to appear.
   * Useful when the exact pixel position of a marker is unknown.
   *
   * @param {Function} isPanelOpen - async function returning true once a station panel is open
   * @param {number} step - pixel spacing between scan points
   */
  async findAndClickMarker(isPanelOpen, step = 20) {
    const canvas = await this.getMapCanvas
    await canvas.waitForDisplayed()
    const size = await canvas.getSize()

    for (let y = -Math.floor(size.height / 2); y < size.height / 2; y += step) {
      for (let x = -Math.floor(size.width / 2); x < size.width / 2; x += step) {
        await this.clickMapMarkerAtOffset(x, y)
        if (await isPanelOpen()) {
          return { x, y }
        }
      }
    }
    return null
  }
}

// module.exports=new StartNowPage()
export default new MapsPage()
