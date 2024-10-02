/*
 provide access to the list of extensions that are available
 extensions that have been activated are stored in local storage as an array of strings. if the string is not in the list, it is not active
*/
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'
import SqlSandbox from '../extensions/SqlSandbox'
import SqlSandboxPage from '../extensions/SqlSandbox/SqlSandboxPage'
import sqlSandboxService from '../extensions/SqlSandbox/sqlSandbox.service'

const EXTENSIONS_KEY = 'activated-extensions'

export interface Extension {
  id: string
  name: string
  authorName: string
  authorUrl: string
  description: string
  onAdd?: () => void
  onRemove?: () => void
  image?: string
}

export interface DashboardExtension extends Extension {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageComponent: React.ComponentType<any>
  route: string
}

const extensions: (Extension | DashboardExtension)[] = [
  {
    id: 'SqlSandbox',
    name: 'SQL Sandbox',
    authorName: 'Paul Hovley',
    authorUrl: 'https://github.com/rphovley',
    description:
      'Your data at your fingertips. A sandbox for writing SQL queries. Query your data directly from the database and see the results in a table or export them to a CSV file.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/codeclimbersio.appspot.com/o/public%2Fsql_extension.png?alt=media',
    component: SqlSandbox,
    route: '/sql-sandbox',
    pageComponent: SqlSandboxPage,
    onAdd: () => {
      sqlSandboxService.onAdd()
    },
  },
  {
    id: 'DirectQueryAPI',
    name: 'Direct Query API',
    authorName: 'Code Climbers',
    authorUrl: 'https://github.com/CodeClimbersIO',
    description:
      "We've been working on a Direct Query API for providing data for the reports. Try it out and let us know if you have any bugs. This is how the app will get data in the future",
  },
]

function getActiveExtensionIds(): string[] {
  const rawExtensions = localStorage.getItem(EXTENSIONS_KEY)
  const extensionIds = rawExtensions
    ? (JSON.parse(rawExtensions) as string[])
    : []
  return extensionIds
}

function getActiveExtensions(): Extension[] {
  const extensionIds = getActiveExtensionIds()
  const activeExtensions = extensionIds.map((id) =>
    extensions.find((extension) => extension.id === id),
  )
  return activeExtensions.filter((extension) => extension !== undefined)
}

function getActiveDashboardExtensions(): DashboardExtension[] {
  const activeExtensions = getActiveExtensions()
  return activeExtensions.filter(
    (extension): extension is DashboardExtension => 'component' in extension,
  )
}

function getActiveDashboardExtensionRoutes(): DashboardExtension[] {
  const activeExtensions = getActiveDashboardExtensions()
  return activeExtensions.filter((extension) => extension.route)
}

function getExtensionByRoute(route: string): DashboardExtension | undefined {
  return getActiveDashboardExtensions().find(
    (extension) => extension.route === route,
  )
}

function isExtensionAdded(extensionId: string) {
  return getActiveExtensionIds().includes(extensionId)
}

function addExtension(extensionId: string) {
  if (!extensionId) return
  const extensions = getActiveExtensionIds()
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
  const extensionIds = getActiveExtensionIds()
  const newExtensions = extensionIds.filter((id) => id !== extensionId)
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
  getActiveDashboardExtensions,
  getActiveDashboardExtensionRoutes,
  getExtensionByRoute,
}
