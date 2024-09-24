/*
 provide access to the list of extensions that are available
 extensions that have been activated are stored in local storage as an array of strings. if the string is not in the list, it is not active
*/
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

const EXTENSIONS_KEY = 'activated-extensions'

export interface Extension {
  id: string
  name: string
  authorName: string
  authorUrl: string
  description: string
  image?: string
}

const extensions: Extension[] = [
  {
    id: 'sql-sandbox',
    name: 'SQL Sandbox',
    authorName: 'Paul Hovley',
    authorUrl: 'https://github.com/rphovley',
    description:
      'Your data at your fingertips. A sandbox for writing SQL queries. You can query your data directly from the database and see the results in a table and export them to a CSV file.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/codeclimbersio.appspot.com/o/public%2Ftest_file.png?alt=media',
  },
  {
    id: 'use-frontend-db',
    name: 'Direct Query API',
    authorName: 'Code Climbers',
    authorUrl: 'https://github.com/CodeClimbersIO',
    description:
      "We've been working on a Direct Query API for providing data for the reports. Try it out and let us know if you have any bugs. This is how the app will get data in the future",
  },
]

function getActiveExtensions() {
  const rawExtensions = localStorage.getItem(EXTENSIONS_KEY)
  const extensions = rawExtensions
    ? (JSON.parse(rawExtensions) as string[])
    : []
  return extensions.filter((extension: string) => extension)
}

function isExtensionAdded(extensionId: string) {
  return getActiveExtensions().includes(extensionId)
}

function addExtension(extensionId: string) {
  console.log('addExtension', extensionId)
  if (!extensionId) return
  const extensions = getActiveExtensions()
  if (isExtensionAdded(extensionId)) {
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

function removeExtension(extensionId: string) {
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
  addExtension,
  removeExtension,
  isExtensionAdded,
}
