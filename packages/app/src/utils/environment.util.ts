// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBrowserCli = (import.meta as any).env === undefined

const extractVersions = (version: string) => {
  const [major, minor, patch] = version.split('.').map(Number)
  return { major, minor, patch }
}
type FEEnvironment = 'release' | 'preview' | 'localhost' | 'unknown'

const isReleaseSite =
  window.location.hostname === 'codeclimbers.io' ||
  window.location.hostname.endsWith('.codeclimbers.io')
const isPreviewSite = window.location.hostname.endsWith('.web.app')
const isLocalhost = window.location.hostname === 'localhost'

const getFEEnvironment = (): FEEnvironment => {
  if (isReleaseSite) return 'release'
  if (isPreviewSite) return 'preview'
  if (isLocalhost) return 'localhost'
  return 'unknown'
}

export default {
  isBrowserCli,
  extractVersions,
  isReleaseSite,
  isPreviewSite,
  isLocalhost,
  getFEEnvironment,
}
