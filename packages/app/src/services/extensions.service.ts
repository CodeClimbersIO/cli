/*
 provide access to the list of extensions that are available
 extensions that have been activated are stored in local storage as an array of strings. if the string is not in the list, it is not active
*/
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

const EXTENSIONS_KEY = 'activated-extensions'

const extensions = ['use-frontend-db', 'sql-sandbox']

function getActiveExtensions() {
  const rawExtensions = localStorage.getItem(EXTENSIONS_KEY)
  const extensions = rawExtensions
    ? (JSON.parse(rawExtensions) as string[])
    : []
  return extensions.filter((extension: string) => extension)
}

function activateExtension(extensionId: string) {
  if (!extensionId) return
  const extensions = getActiveExtensions()
  if (extensions.includes(extensionId)) {
    return // already activated, don't add again
  }
  const newExtensions = [...extensions, extensionId]
  localStorage.setItem(EXTENSIONS_KEY, JSON.stringify(newExtensions))
  // store to posthog profile for analytics
  posthog.capture('$set', {
    $set: {
      extensions: newExtensions,
    },
  })
}

function deactivateExtension(extensionId: string) {
  if (!extensionId) return
  const extensions = getActiveExtensions()
  const newExtensions = extensions.filter(
    (extension: string) => extension !== extensionId,
  )
  localStorage.setItem(EXTENSIONS_KEY, JSON.stringify(newExtensions))
  // store to posthog profile
  posthog.capture('$set', {
    $set: {
      extensions: newExtensions,
    },
  })
}

export default {
  extensions,
  getActiveExtensions,
  activateExtension,
  deactivateExtension,
}
