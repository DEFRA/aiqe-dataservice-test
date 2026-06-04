import { browser, expect } from '@wdio/globals'
import errorPage from '../../page-objects/errorPage.js'

describe('error scenarios', () => {
  it('copy and paste of these urls should lead to a page not found page', async () => {
    await browser.url(
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/emailrequest/AURN'
    )
    const pageNotFoundEmailRequest =
      await errorPage.getError404Heading.getText()
    await expect(pageNotFoundEmailRequest).toEqual('Page not found')
    await browser.url(
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/location-aurn/change'
    )
    const pageNotFoundLocation = await errorPage.getError404Heading.getText()
    await expect(pageNotFoundLocation).toEqual('Page not found')
  })

  it('AQD-1314 result not found should show the user a page not found page', async () => {
    await browser.url(
      'https://aqie-dataselector-frontend.dev.cdp-int.defra.cloud/stationdetails/LondonBex'
    )
    const pageNotFoundEmailRequest =
      await errorPage.getError404Heading.getText()
    await expect(pageNotFoundEmailRequest).toEqual('Page not found')
  })
})
