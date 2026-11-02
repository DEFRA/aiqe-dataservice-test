import axios from 'axios'
import fs from 'node:fs'
import path from 'node:path'
import { HttpsProxyAgent } from 'https-proxy-agent'

/**
 * Detects whether the current WDIO session is running on BrowserStack
 * rather than a local/sidecar Chrome instance. Based on the presence of
 * 'bstack:options' in the negotiated or requested capabilities, which is
 * only ever set by wdio.conf.js (BrowserStack runs) and never by
 * wdio.local.conf.js (local runs).
 *
 * @returns {boolean}
 */
export function isBrowserStackSession() {
  const caps = browser?.capabilities ?? {}
  const requestedCaps = browser?.requestedCapabilities ?? {}
  const browserHost = String(browser?.options?.hostname ?? '').toLowerCase()
  const hasCreds = Boolean(
    process.env.BROWSERSTACK_USER && process.env.BROWSERSTACK_KEY
  )
  const hasSession = Boolean(browser?.sessionId)

  return (
    Boolean(caps['bstack:options']) ||
    Boolean(requestedCaps['bstack:options']) ||
    (browserHost.includes('browserstack') && hasCreds && hasSession) ||
    (hasCreds && hasSession)
  )
}

const browserStackAuth = {
  username: process.env.BROWSERSTACK_USER,
  password: process.env.BROWSERSTACK_KEY
}

const proxyUri = process.env.HTTP_PROXY || process.env.HTTPS_PROXY
const browserStackAxios = axios.create({
  auth: browserStackAuth,
  httpsAgent: proxyUri ? new HttpsProxyAgent(proxyUri) : undefined,
  proxy: false,
  timeout: 30000
})

const KEEP_ALIVE_INTERVAL_MS = 15000
let lastKeepAliveTs = 0

async function keepBrowserStackSessionAlive() {
  const now = Date.now()
  if (now - lastKeepAliveTs < KEEP_ALIVE_INTERVAL_MS) return

  lastKeepAliveTs = now
  try {
    await browser.getUrl()
  } catch {}
}

/**
 * Fetches the raw bytes for a single BrowserStack download via the
 * Automate REST API.
 *
 * @param {string} sessionId - browser.sessionId of the active session
 * @param {string} fileId - file_id as returned by the downloads list endpoint
 * @returns {Promise<Buffer>}
 */
async function fetchBrowserStackFile(sessionId, fileId) {
  const res = await browserStackAxios.get(
    `https://api.browserstack.com/automate/sessions/${sessionId}/downloads/${fileId}`,
    { responseType: 'arraybuffer' }
  )

  return Buffer.from(res.data)
}

/**
 * When running on BrowserStack, downloads happen on the remote VM rather
 * than the local filesystem. This polls the BrowserStack Automate REST API
 * for any files downloaded so far in the current session and writes any
 * that aren't already present into `downloadDir`, using their original
 * file names.
 *
 * This lets all existing local-filesystem-based assertions (fs.readdirSync,
 * zip extraction, CSV parsing, before/after diffing, etc.) keep working
 * unchanged for both local and BrowserStack runs - callers just need to
 * call this once at the top of each `browser.waitUntil` download-detection
 * callback, before reading the download directory.
 *
 * No-op when not running on BrowserStack.
 *
 * @param {string} downloadDir - absolute path to the local downloads folder
 */
export async function syncBrowserStackDownloads(downloadDir) {
  if (!isBrowserStackSession()) return
  await keepBrowserStackSessionAlive()

  let data
  try {
    ;({ data } = await browserStackAxios.get(
      `https://api.browserstack.com/automate/sessions/${browser.sessionId}/downloads`
    ))
  } catch (err) {
    // Swallow transient API errors; the waitUntil loop calling this will
    // simply retry on the next interval.
    // eslint-disable-next-line no-console
    console.warn(
      '[browserstackDownloads] Failed to list downloads:',
      err?.response?.status,
      err?.response?.data ?? err?.message
    )
    return
  }

  const entries = Array.isArray(data)
    ? data
    : Array.isArray(data?.downloads)
      ? data.downloads
      : null

  if (!entries) {
    // eslint-disable-next-line no-console
    console.warn(
      '[browserstackDownloads] Unexpected downloads response (not an array):',
      JSON.stringify(data)
    )
    return
  }

  for (const entry of entries) {
    const fileId = entry?.file_id ?? entry?.id ?? entry?.fileId
    const fileName = entry?.file_name ?? entry?.name ?? entry?.fileName
    const directUrl =
      entry?.download_url ?? entry?.downloadUrl ?? entry?.url ?? null

    if (!fileName || (!fileId && !directUrl)) continue

    const localPath = path.join(downloadDir, fileName)
    if (fs.existsSync(localPath)) continue

    try {
      const bytes = fileId
        ? await fetchBrowserStackFile(browser.sessionId, fileId)
        : Buffer.from(
            (
              await browserStackAxios.get(directUrl, {
                responseType: 'arraybuffer'
              })
            ).data
          )
      fs.writeFileSync(localPath, bytes)
    } catch (err) {
      // Ignore and retry on the next poll - the file may not be ready yet.
      // eslint-disable-next-line no-console
      console.warn(
        `[browserstackDownloads] Failed to fetch file ${fileName}:`,
        err?.response?.status,
        err?.message
      )
    }
  }
}
