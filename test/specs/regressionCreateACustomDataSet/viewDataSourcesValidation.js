import startNowPage from '../../page-objects/startnowpage.js'
// import cookieBanner from '~/test/page-objects/citizens/cookieBanner.js'
import { browser, expect } from '@wdio/globals'
// import fs from 'node:fs'
// import createLogger from 'helpers/logger'
import common from '../../page-objects/common.js'
import hubPage from '../../page-objects/hubPage.js'
import customselectionPage from '../../page-objects/customSelectionsPage.js'
import addPollutantPage from '../../page-objects/addPollutantPage.js'
import viewDataSourcesPage from '../../page-objects/viewDataSourcesPage.js'

describe('view data sources validation', () => {
  it('Display applicable Data Sources for AURN Network pollutants and other networks on create a custom dataset page - AQD-833,AQD-1194', async () => {
    await browser.url('')
    await browser.maximizeWindow()
    await startNowPage.startNowBtnClick()
    await hubPage.getCreateCustomDataSet.click()

    const pollutantsToCheck = [
      'Nitric oxide',
      'Nitrogen oxides as nitrogen dioxide',
      'Ozone',
      'Sulphur dioxide',
      'Carbon monoxide',
      'Particulate matter (PM10)',
      'Fine particulate matter (PM2.5)'
    ]
    for (const pollutant of pollutantsToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource1 =
        await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource1 = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)`
      await expect(dataSource1).toMatch(expectedDataSource1)
    }

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getAQSROptionTitle.click()
    await common.continueButton.click()
    const AQSRdataSource =
      await customselectionPage.getDataSourcesValue.getText()
    const expectedAQSRDataSource = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
Other data from Defra
UKEAP - Rural NO2 Network`
    await expect(AQSRdataSource).toEqual(expectedAQSRDataSource)

    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddGroupOfPollutantsOption.click()
    await addPollutantPage.getDAQIOptionTitle.click()
    await common.continueButton.click()
    const DAQIRdataSource =
      await customselectionPage.getDataSourcesValue.getText()
    const expectedDAQIDataSource = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
Other data from Defra
UKEAP - Rural NO2 Network`
    await expect(DAQIRdataSource).toEqual(expectedDAQIDataSource)
  })
  it('content for view data sources page when AURN Only Network is selected ', async () => {
    await customselectionPage.getClearSelectionsLink.click()
    await customselectionPage.getAddPollutantLink.click()
    await addPollutantPage.getAddPollutantOption.click()
    await addPollutantPage.addPollutant('Ozone')
    await common.continueButton.click()

    await customselectionPage.getViewDataSourcesLink.click()
    const pageContent =
      await viewDataSourcesPage.getViewDataSourcesPageContent.getText()
    const expectedPageContent = `View data sources
Data sources for the pollutant(s) you selected
Data sources for other pollutants
Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
UK national automatic network for regulatory and public reporting.
Pollutants: fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), nitrogen oxides (NOx), ozone (O3), sulphur dioxide (SO2), carbon monoxide (CO)
Start date: 1972
Time resolution: Hourly
Published: Provisional hourly; ratified after QA/QC
Instrument: Chemiluminescence (NOx), UV photometry (O3), UV fluorescence (SO2), NDIR (CO), TEOM-FDMS/BAM and gravimetric (PM)`
    await expect(pageContent).toMatch(expectedPageContent)
    await viewDataSourcesPage.getDataSourcesFromOtherPollutants.click()
    const otherDataSourcesContent =
      await viewDataSourcesPage.getViewDataSourcesPageContent.getText()
    const expectedOtherDataSourcesContent = `View data sources
Data sources for the pollutant(s) you selected
Data sources for other pollutants
Near real-time data from Defra
Automatic Hydrocarbon Network (AHC)
Hourly speciated volatile organic compounds (VOCs).
Pollutants: benzene (C6H6), 1,3-butadiene (C4H6), toluene (C7H8), ethylbenzene (C8H10), m+p-xylene (C8H10), o-xylene (C8H10), isoprene (C5H8)
Start date: 1992
Time resolution: Hourly
Published: Hourly (provisional); ratified later
Instrument: Automatic gas chromatographs
Other data from Defra
UKEAP: Acid Gas and Aerosol Network (AGANet)
Acid gases and aerosol ions (monthly).
Pollutants: nitric acid (HNO3), hydrochloric acid (HCl), ammonia (NH3), ammonium (NH4), nitrate (NO3), sulphate (SO4), chloride (Cl)
Start date: 1980
Time resolution: Monthly
Published: After laboratory analysis
Instrument: DELTA denuder system
UKEAP: National Ammonia Monitoring Network (NAMN)
National ammonia and ammonium monitoring.
Pollutants: ammonia (NH3), ammonium (NH4)
Start date: 1980
Time resolution: Monthly
Published: After laboratory analysis
Instrument: ALPHA passive tubes; DELTA denuder at some sites
UKEAP: MARGA Network (MARGA)
Hourly inorganic ions and related gases at background sites.
Pollutants: ammonium (NH4), nitrate (NO3), sulphate (SO4), chloride (Cl), sodium (Na), potassium (K), calcium (Ca), magnesium (Mg), nitric acid (HNO3), ammonia (NH3)
Start date: 1980
Time resolution: Hourly
Published: Hourly series; summaries in UKEAP reports
Instrument: MARGA analyser (ion chromatography)
UKEAP: Rural Mercury Network (RMN)
Speciated atmospheric mercury at rural sites.
Pollutants: gaseous elemental mercury (Hg0, GEM), particulate-bound mercury (PBM), reactive oxidised mercury (GOM)
Start date: 1980
Time resolution: GEM typically hourly; PBM/GOM periodic
Published: Periodic uploads
Instrument: Tekran 2537x with 1130/1135 speciation
UKEAP: Precipitation Chemistry Network (Precip-Net)
Precipitation chemistry (major ions).
Pollutants: sulphate (SO4), nitrate (NO3), chloride (Cl), sodium (Na), potassium (K), calcium (Ca), magnesium (Mg)
Start date: 1986
Time resolution: Weekly to fortnightly sampling
Published: After laboratory analysis
Instrument: Bulk collectors; wet-only collectors at supersites
PAH Network (PAH)
Non-automatic PAHs with laboratory analysis.
Pollutants: polycyclic aromatic hydrocarbons (PAHs), benzo[a]pyrene (BaP)
Start date: 1991
Time resolution: Period sampling
Published: After laboratory analysis
Instrument: Filters/adsorbents; GC-MS
Toxic Organic Micro-Pollutants (TOMPs) Network
Semi-volatile organic pollutants.
Pollutants: polychlorinated biphenyls (PCBs), selected pesticides, other semi-volatile organic compounds (SVOCs)
Start date: 1991
Time resolution: Period sampling
Published: After laboratory analysis
Instrument: Hi-vol/PUF; GC-MS
Non-Automatic Hydrocarbon Network (NAHC)
Fortnightly pumped tubes for benzene.
Pollutants: benzene (C6H6), 1,3-butadiene (C4H6) — historically
Start date: 2001
Time resolution: Fortnightly
Published: After laboratory analysis
Instrument: Pumped sorbent tubes (Carbopack X); GC-FID
Particle Concentrations and Numbers Network (PCN)
Particle numbers, size distributions and carbon fractions.
Pollutants: particle number concentration, size distribution, organic carbon (OC), elemental carbon (EC), elemental composition
Start date: 2001
Time resolution: Instrument-dependent (many hourly/continuous)
Published: Periodic uploads
Instrument: SMPS, CPC, EC/OC, XRF, ACSM; Digitel PM2.5
Heavy Metals Network (HMN)
Monthly metals in airborne particulate matter at urban and industrial sites.
Pollutants: arsenic (As), cadmium (Cd), chromium (Cr), cobalt (Co), copper (Cu), iron (Fe), lead (Pb), manganese (Mn), nickel (Ni), selenium (Se), vanadium (V), zinc (Zn)
Start date: 2003
Time resolution: Monthly
Published: After laboratory analysis
Instrument: Filter sampling; ICP-MS/XRF analysis
Black Carbon Network (BCN)
Black carbon and UV-absorbing PM.
Pollutants: black carbon (BC), UVPM
Start date: 2006
Time resolution: Hourly (typical)
Published: Periodic uploads
Instrument: Aethalometers (e.g. Magee AE22/AE33)
UKEAP: Rural NO2 Network (Rural NO2)
Rural/background nitrogen dioxide using diffusion tubes.
Pollutants: nitrogen dioxide (NO2)
Start date: 1980
Time resolution: 4-weekly exposure
Published: After laboratory analysis
Instrument: Palmes-type open diffusion tubes
UK Urban NO2 Network (UUNN)
Diffusion-tube NO2 at urban traffic sites.
Pollutants: nitrogen dioxide (NO2)
Start date: 2020
Time resolution: 4-weekly exposure
Published: After laboratory analysis
Instrument: Triplicate diffusion tubes with wind caps
Non-Defra data
Locally-managed automatic monitoring
This data is measured at air pollution hot spots across the UK. It mostly comes from local authority monitoring stations. This data is usually published every hour (near real-time). It varies in quality.
Pollutants: fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), nitrogen oxides (NOx), ozone (O3), sulphur dioxide (SO2), carbon monoxide (CO)
Start date: 1973
Time resolution: Typically hourly
Published: Varies by provider
Instrument: Continuous analysers; BAM/FDMS for PM`
    await expect(otherDataSourcesContent).toMatch(
      expectedOtherDataSourcesContent
    )
  })

  it('AQD-990 Remove More info... hyperlink in View Data Sources Page', async () => {
    await common.elementRemoved(
      await viewDataSourcesPage.getMoreInformationLink
    )
  })

  it('styling checks', async () => {
    const DownloadYourDataHeading = [
      await viewDataSourcesPage.getViewDataSourcesHeading
    ]

    const DownloadYourDataHeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of DownloadYourDataHeading) {
      const styles = await common.getStyles(
        element,
        DownloadYourDataHeadingProperties
      )
      expect(styles['margin-bottom']).toBe('30px')
      expect(styles['font-size']).toBe('36px')
      expect(styles['line-height']).toBe('40px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const h2Heading = [await viewDataSourcesPage.getH2Heading]

    const h2HeadingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of h2Heading) {
      const styles = await common.getStyles(element, h2HeadingProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('24px')
      expect(styles['line-height']).toBe('30px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const H3Heading = [await viewDataSourcesPage.getH3Heading]

    const h3HeadingProperties = [
      'padding-top',
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of H3Heading) {
      const styles = await common.getStyles(element, h3HeadingProperties)
      expect(styles['padding-top']).toBe('0px')
      expect(styles['margin-bottom']).toBe('10px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('700')
    }

    const PStyling = [await viewDataSourcesPage.getPStyling]

    const pStylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of PStyling) {
      const styles = await common.getStyles(element, pStylingProperties)
      expect(styles['margin-bottom']).toBe('20px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getP2Styling = [await viewDataSourcesPage.getP2Styling]

    const getP2StylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getP2Styling) {
      const styles = await common.getStyles(element, getP2StylingProperties)
      expect(styles['margin-bottom']).toBe('15px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }

    const getP3Styling = [await viewDataSourcesPage.getP3Styling]

    const getP3StylingProperties = [
      'margin-bottom',
      'font-size',
      'line-height',
      'color',
      'font-family',
      'font-weight'
    ]

    for (const element of getP3Styling) {
      const styles = await common.getStyles(element, getP3StylingProperties)
      expect(styles['margin-bottom']).toBe('5px')
      expect(styles['font-size']).toBe('19px')
      expect(styles['line-height']).toBe('25px')
      expect(styles.color).toBe('rgb(11, 12, 12)')
      expect(styles['font-family']).toBe('"GDS Transport", arial, sans-serif')
      expect(styles['font-weight']).toBe('400')
    }
  })

  it('link checks', async () => {
    await common.getBackLink.click()
    const url = await browser.getUrl()
    await expect(url).toContain('customdataset')
  })

  it('AQD-1194, Display applicable Data Sources for AURN and UKEAP: Rural NO2 Network (Rural NO2) Network on create a custom dataset page', async () => {
    const pollutantsToCheck = ['Nitrogen dioxide']
    for (const pollutant of pollutantsToCheck) {
      await customselectionPage.getClearSelectionsLink.click()
      await customselectionPage.getAddPollutantLink.click()
      await addPollutantPage.getAddPollutantOption.click()
      await addPollutantPage.addPollutant(pollutant)
      await common.continueButton.click()
      const dataSource1 =
        await customselectionPage.getDataSourcesValue.getText()
      const expectedDataSource1 = `Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
Other data from Defra
UKEAP - Rural NO2 Network`
      await expect(dataSource1).toMatch(expectedDataSource1)
    }
  })

  it('content for view data sources page when selecting AURN Network and UKEAP: Rural NO2 Network (Rural NO2) is selected ', async () => {
    await customselectionPage.getViewDataSourcesLink.click()
    const pageContent =
      await viewDataSourcesPage.getViewDataSourcesPageContent.getText()
    const expectedPageContent = `View data sources
Data sources for the pollutant(s) you selected
Data sources for other pollutants
Near real-time data from Defra
Automatic Urban and Rural Network (AURN)
UK national automatic network for regulatory and public reporting.
Pollutants: fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), nitrogen oxides (NOx), ozone (O3), sulphur dioxide (SO2), carbon monoxide (CO)
Start date: 1972
Time resolution: Hourly
Published: Provisional hourly; ratified after QA/QC
Instrument: Chemiluminescence (NOx), UV photometry (O3), UV fluorescence (SO2), NDIR (CO), TEOM-FDMS/BAM and gravimetric (PM)
Other data from Defra
UKEAP: Rural NO2 Network (Rural NO2)
Rural/background nitrogen dioxide using diffusion tubes.
Pollutants: nitrogen dioxide (NO2)
Start date: 1980
Time resolution: 4-weekly exposure
Published: After laboratory analysis
Instrument: Palmes-type open diffusion tubes`
    await expect(pageContent).toMatch(expectedPageContent)

    await viewDataSourcesPage.getDataSourcesFromOtherPollutants.click()
    const otherDataSourcesContent =
      await viewDataSourcesPage.getViewDataSourcesPageContent.getText()
    const expectedOtherDataSourcesContent = `View data sources
Data sources for the pollutant(s) you selected
Data sources for other pollutants
Near real-time data from Defra
Automatic Hydrocarbon Network (AHC)
Hourly speciated volatile organic compounds (VOCs).
Pollutants: benzene (C6H6), 1,3-butadiene (C4H6), toluene (C7H8), ethylbenzene (C8H10), m+p-xylene (C8H10), o-xylene (C8H10), isoprene (C5H8)
Start date: 1992
Time resolution: Hourly
Published: Hourly (provisional); ratified later
Instrument: Automatic gas chromatographs
Other data from Defra
UKEAP: Acid Gas and Aerosol Network (AGANet)
Acid gases and aerosol ions (monthly).
Pollutants: nitric acid (HNO3), hydrochloric acid (HCl), ammonia (NH3), ammonium (NH4), nitrate (NO3), sulphate (SO4), chloride (Cl)
Start date: 1980
Time resolution: Monthly
Published: After laboratory analysis
Instrument: DELTA denuder system
UKEAP: National Ammonia Monitoring Network (NAMN)
National ammonia and ammonium monitoring.
Pollutants: ammonia (NH3), ammonium (NH4)
Start date: 1980
Time resolution: Monthly
Published: After laboratory analysis
Instrument: ALPHA passive tubes; DELTA denuder at some sites
UKEAP: MARGA Network (MARGA)
Hourly inorganic ions and related gases at background sites.
Pollutants: ammonium (NH4), nitrate (NO3), sulphate (SO4), chloride (Cl), sodium (Na), potassium (K), calcium (Ca), magnesium (Mg), nitric acid (HNO3), ammonia (NH3)
Start date: 1980
Time resolution: Hourly
Published: Hourly series; summaries in UKEAP reports
Instrument: MARGA analyser (ion chromatography)
UKEAP: Rural Mercury Network (RMN)
Speciated atmospheric mercury at rural sites.
Pollutants: gaseous elemental mercury (Hg0, GEM), particulate-bound mercury (PBM), reactive oxidised mercury (GOM)
Start date: 1980
Time resolution: GEM typically hourly; PBM/GOM periodic
Published: Periodic uploads
Instrument: Tekran 2537x with 1130/1135 speciation
UKEAP: Precipitation Chemistry Network (Precip-Net)
Precipitation chemistry (major ions).
Pollutants: sulphate (SO4), nitrate (NO3), chloride (Cl), sodium (Na), potassium (K), calcium (Ca), magnesium (Mg)
Start date: 1986
Time resolution: Weekly to fortnightly sampling
Published: After laboratory analysis
Instrument: Bulk collectors; wet-only collectors at supersites
PAH Network (PAH)
Non-automatic PAHs with laboratory analysis.
Pollutants: polycyclic aromatic hydrocarbons (PAHs), benzo[a]pyrene (BaP)
Start date: 1991
Time resolution: Period sampling
Published: After laboratory analysis
Instrument: Filters/adsorbents; GC-MS
Toxic Organic Micro-Pollutants (TOMPs) Network
Semi-volatile organic pollutants.
Pollutants: polychlorinated biphenyls (PCBs), selected pesticides, other semi-volatile organic compounds (SVOCs)
Start date: 1991
Time resolution: Period sampling
Published: After laboratory analysis
Instrument: Hi-vol/PUF; GC-MS
Non-Automatic Hydrocarbon Network (NAHC)
Fortnightly pumped tubes for benzene.
Pollutants: benzene (C6H6), 1,3-butadiene (C4H6) — historically
Start date: 2001
Time resolution: Fortnightly
Published: After laboratory analysis
Instrument: Pumped sorbent tubes (Carbopack X); GC-FID
Particle Concentrations and Numbers Network (PCN)
Particle numbers, size distributions and carbon fractions.
Pollutants: particle number concentration, size distribution, organic carbon (OC), elemental carbon (EC), elemental composition
Start date: 2001
Time resolution: Instrument-dependent (many hourly/continuous)
Published: Periodic uploads
Instrument: SMPS, CPC, EC/OC, XRF, ACSM; Digitel PM2.5
Heavy Metals Network (HMN)
Monthly metals in airborne particulate matter at urban and industrial sites.
Pollutants: arsenic (As), cadmium (Cd), chromium (Cr), cobalt (Co), copper (Cu), iron (Fe), lead (Pb), manganese (Mn), nickel (Ni), selenium (Se), vanadium (V), zinc (Zn)
Start date: 2003
Time resolution: Monthly
Published: After laboratory analysis
Instrument: Filter sampling; ICP-MS/XRF analysis
Black Carbon Network (BCN)
Black carbon and UV-absorbing PM.
Pollutants: black carbon (BC), UVPM
Start date: 2006
Time resolution: Hourly (typical)
Published: Periodic uploads
Instrument: Aethalometers (e.g. Magee AE22/AE33)
UK Urban NO2 Network (UUNN)
Diffusion-tube NO2 at urban traffic sites.
Pollutants: nitrogen dioxide (NO2)
Start date: 2020
Time resolution: 4-weekly exposure
Published: After laboratory analysis
Instrument: Triplicate diffusion tubes with wind caps
Non-Defra data
Locally-managed automatic monitoring
This data is measured at air pollution hot spots across the UK. It mostly comes from local authority monitoring stations. This data is usually published every hour (near real-time). It varies in quality.
Pollutants: fine particulate matter (PM2.5), particulate matter (PM10), nitrogen dioxide (NO2), nitrogen oxides (NOx), ozone (O3), sulphur dioxide (SO2), carbon monoxide (CO)
Start date: 1973
Time resolution: Typically hourly
Published: Varies by provider
Instrument: Continuous analysers; BAM/FDMS for PM`
    await expect(otherDataSourcesContent).toMatch(
      expectedOtherDataSourcesContent
    )
  })
})
