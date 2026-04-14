import { expect } from '@wdio/globals'
import axios from 'axios'

const stations = [
  { name: 'Bournemouth', id: 'UKA00429' },
  { name: 'Borehamwood Meadow Park', id: 'UKA00644' },
  { name: 'Blackpool Marton', id: 'UKA00488' },
  { name: 'Blackburn Accrington Road', id: 'UKA00590' },
  { name: 'Birmingham Ladywood', id: 'UKA00655' },
  { name: 'Birmingham A4540 Roadside', id: 'UKA00626' },
  { name: 'Aberdeen Erroll Park', id: 'UKA00933' },
  { name: 'Barnsley Gawber', id: 'UKA00353' },
  { name: 'Birkenhead Borough Road', id: 'UKA00625' }
]

describe('comparing nitrogen data between API, uk-air and citizen front end', () => {
  it('extracting the nitrogen dioxide data for today from ricardo api', async () => {
    const accessToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NzYxNTk3MTMsImV4cCI6MTc3NjU5MTcxMywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibWFydXRoaS5jaG9ra2FuYXRoYW5AY29nbml6YW50LmNvbSJ9.R_UntdnvZOv7vxTmrVhUQ554G-eKS26c2QieFiZOuwiDggJg8U6WciJT6oPJ4a668NHUJafr_g1GzS0dwc1fnGXOJWPmFbnf6vzLKA_3PbvM6voY-s34xHAbUGwddV8K-IVCrqUctsnfuWA80D7KxOLsf0G1_I43xsspsKeig2AnkVyJkR5SQ8rg8x3CNuK_NzttE8SebdlUGdCeKnM6f_z8Hhtx7pIX8VnUwbxs84dqjx2HQTUlT9tmQ0Ihy3VMBddChJxHHgwrLV4zt8H5ZgOizJnpGX4FxlZRcrzHf9HpIF9J0Tq8hHG3JjMdweNe2lI1oltQ4fNSoYik5n3EhQ'

    // Build today's date in YYYY-MM-DD format
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    // end date is tomorrow so we capture all of today's readings
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    const httpsAgent = new (await import('https')).Agent({
      rejectUnauthorized: false
    })
    const allStationsData = {}

    for (const station of stations) {
      const url = `https://api-ukair.defra.gov.uk/api/pollutant_measurement_datas?page=1&station-id=${station.id}&pollutant-name=NO2&latest-measurement=true&start-date=${todayStr}&end-date=${tomorrowStr}`

      const response = await browser.call(async () => {
        return axios.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
          httpsAgent
        })
      })

      const members = response.data.member

      // Filter for today's NO2 readings only
      const todayReadings = members.filter((item) => {
        const itemDate = item.startDateTime.split('T')[0]
        return (
          itemDate === todayStr && item.pollutantName === 'Nitrogen dioxide'
        )
      })

      // Extract time and value
      const no2Data = todayReadings.map((item) => {
        const [, timePart] = item.startDateTime.split('T')
        return {
          time: timePart.substring(0, 5),
          value: item.value
        }
      })

      allStationsData[station.name] = no2Data

      // Assert each station has data and valid values
      await expect(no2Data.length).toBeGreaterThan(0)
      for (const reading of no2Data) {
        await expect(typeof reading.value).toBe('number')
      }
    }

    // eslint-disable-next-line no-console
    console.log(`NO2 readings for today (${todayStr}):`)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(allStationsData, null, 2))
  })

  it('extracting the nitrogen dioxide data from uk-air', async () => {
    await browser.url(
      'https://uk-air.defra.gov.uk/latest/currentlevels?view=site'
    )

    const ukAirData = {}

    for (const station of stations) {
      // Find the table row whose first cell contains the station name
      const row = await $(`//tr[td[1][contains(., '${station.name}')]]`)
      const cells = await row.$$('td')

      // Column order: Station Name | Ozone | NO2 | SO2 | PM10 | PM2.5 | Time
      // NO2 is the 3rd column (index 2), Time is the last column (index 6)
      const no2Raw = await cells[2].getText()
      const timeRaw = await cells[6].getText()

      // Extract numeric value from e.g. "15 (1 Low)" → "15", or keep "n/m" / "n/a"
      const no2Match = no2Raw.match(/^(\d+)/)
      const no2Value = no2Match ? parseInt(no2Match[1], 10) : no2Raw.trim()

      ukAirData[station.name] = {
        no2: no2Value,
        time: timeRaw.trim()
      }
    }

    // eslint-disable-next-line no-console
    console.log('NO2 readings from uk-air:')
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(ukAirData, null, 2))

    // Assert each station has an entry
    for (const station of stations) {
      await expect(ukAirData[station.name]).toBeDefined()
    }
  })
  it('extracting the nitrogen dioxide data from citizen service', async () => {
    const citizenBaseUrl = 'https://aqie-front-end.prod.cdp-int.defra.cloud'
    const citizenData = {}

    for (const station of stations) {
      // Use the first word of the station name as the search term
      const searchTerm = station.name.split(' ')[0]

      await browser.url(`${citizenBaseUrl}/search-location?lang=en`)

      // Select "England, Scotland or Wales" radio - this reveals the search box on the same page
      const englandScotlandWalesOption = await $("input[value='uk-location']")
      await englandScotlandWalesOption.click()

      // Wait for search box to appear, then type and submit
      const searchInput = await $("input[id='engScoWal']")
      await searchInput.waitForExist({ timeout: 10000 })
      await searchInput.setValue(searchTerm)
      const continueBtn = await $(
        "button[class*='govuk-button app-search__button']"
      )
      await continueBtn.click()

      // Wait for navigation away from the search page
      await browser.waitUntil(
        async () => !(await browser.getUrl()).includes('/search-location'),
        { timeout: 15000, interval: 300 }
      )

      // If we landed on a multiple-results/disambiguation page, click the matching link
      const currentUrl = await browser.getUrl()
      if (
        currentUrl.includes('multiple-results') ||
        currentUrl.includes('/location?')
      ) {
        const searchTermLower = searchTerm.toLowerCase()
        const locationLink = await $(`a[href*='/location/${searchTermLower}_']`)
        await locationLink.click()
        await browser.waitUntil(
          async () => {
            const url = await browser.getUrl()
            return (
              url.includes('/location/') &&
              !url.includes('multiple-results') &&
              !url.includes('/location?')
            )
          },
          { timeout: 15000, interval: 300 }
        )
      }

      // Now on the results page - click the station's tab link to make it active.
      // Tabs are <a class="govuk-tabs__tab"> links inside a govuk-tabs component.
      const tabLink = await $(
        `//a[contains(@class,'govuk-tabs__tab') and normalize-space(text())='${station.name}']`
      )
      const tabExists = await tabLink.isExisting()
      if (tabExists) {
        await tabLink.click()
      }

      // Use JS to find the active tab panel (not hidden) and extract NO2 data from it
      const sectionData = await browser.execute((stationName) => {
        // Find the tab panel that is NOT hidden and contains our station's h3
        const panels = Array.from(
          document.querySelectorAll('.govuk-tabs__panel')
        )
        let targetPanel = null
        for (const panel of panels) {
          const h3 = panel.querySelector('h3')
          if (h3 && h3.textContent.trim() === stationName) {
            targetPanel = panel
            break
          }
        }
        if (!targetPanel) return { no2: '', latestMeasurement: '' }

        const rows = targetPanel.querySelectorAll('tr')
        let no2Text = ''
        for (const row of rows) {
          const cells = row.querySelectorAll('td')
          if (cells[0] && cells[0].textContent.includes('Nitrogen dioxide')) {
            no2Text = cells[1] ? cells[1].textContent.trim() : ''
            break
          }
        }
        const paras = targetPanel.querySelectorAll('p')
        let latestText = ''
        for (const p of paras) {
          if (p.textContent.includes('Latest measurement')) {
            latestText = p.textContent.trim()
            break
          }
        }
        return { no2: no2Text, latestMeasurement: latestText }
      }, station.name)

      const no2ValueMatch = sectionData.no2.match(/([\d.]+)/)
      const no2Value = no2ValueMatch
        ? parseFloat(no2ValueMatch[1])
        : sectionData.no2.trim()

      citizenData[station.name] = {
        no2: no2Value,
        latestMeasurement: sectionData.latestMeasurement
      }
    }

    // eslint-disable-next-line no-console
    console.log('NO2 readings from citizen service:')
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(citizenData, null, 2))
  })
})
