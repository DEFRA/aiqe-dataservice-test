import axios from 'axios'
import fs from 'node:fs'
import path from 'node:path'

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

  return (
    Boolean(caps['bstack:options']) || Boolean(requestedCaps['bstack:options'])
  )
}

const browserStackAuth = {
  username: process.env.BROWSERSTACK_USER,
  password: process.env.BROWSERSTACK_KEY
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
  const res = await axios.get(
    `https://api.browserstack.com/automate/sessions/${sessionId}/downloads/${fileId}`,
    { auth: browserStackAuth, responseType: 'arraybuffer' }
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

  let data
  try {
    ;({ data } = await axios.get(
      `https://api.browserstack.com/automate/sessions/${browser.sessionId}/downloads`,
      { auth: browserStackAuth }
    ))
  } catch {
    // Swallow transient API errors; the waitUntil loop calling this will
    // simply retry on the next interval.
    return
  }

  if (!Array.isArray(data)) return

  for (const entry of data) {
    if (!entry?.file_id || !entry?.file_name) continue

    const localPath = path.join(downloadDir, entry.file_name)
    if (fs.existsSync(localPath)) continue

    try {
      const bytes = await fetchBrowserStackFile(
        browser.sessionId,
        entry.file_id
      )
      fs.writeFileSync(localPath, bytes)
    } catch {
      // Ignore and retry on the next poll - the file may not be ready yet.
    }
  }
}
