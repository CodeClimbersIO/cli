import { DateTime } from 'luxon'
import { groupBy, maxBy, minBy } from './helpers.util'
const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

const calculatePulseHash = (
  pulse: CodeClimbers.CreateWakatimePulseDto,
): number => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    editor, // do not include these fields in hash
    user_agent,
    origin,
    origin_id,
    operating_system,
    machine,
    ...pulseHash
  } = { ...pulse }

  const hash = cyrb53(JSON.stringify(pulseHash))
  return hash
}

function filterUniqueByHash(arr: CodeClimbers.Pulse[]) {
  const uniqueMap = new Map()

  return arr.filter((obj) => {
    if (!uniqueMap.has(obj.hash)) {
      uniqueMap.set(obj.hash, true)
      return true
    }
    return false
  })
}

function pulseSuccessResponse(n: number) {
  const responses = [...Array(n).keys()].map((i) => [null, 201])

  return {
    Responses: responses,
  }
}

function defaultStatusBar(): CodeClimbers.ActivitiesStatusBar {
  const now = DateTime.now()
  return {
    data: {
      categories: [],
      dependencies: [],
      editors: [],
      languages: [],
      machines: [],
      operating_systems: [],
      projects: [],
      branches: null,
      entities: null,
      grand_total: {
        digital: '0:0',
        hours: 0,
        minutes: 0,
        text: '0 hrs 0 mins',
        total_seconds: 0,
      },
      range: {
        date: now.toISO(),
        end: now.toISO(),
        start: now.startOf('day').toISO(),
        text: '',
        timezone: 'UTC',
      },
    },
    cached_at: now.toISO(),
  }
}
function getStatusByKey(
  data: CodeClimbers.WakatimePulseStatusDao[],
  dataKey: string,
): CodeClimbers.ActivitiesDetail[] {
  const keyWithoutS = dataKey.replace(/s$/, '')
  const groupedData = groupBy(data, keyWithoutS)
  return Object.keys(groupedData).map((key: string) => {
    const group = groupedData[key]
    const totalSeconds = group.reduce(
      (acc, x) => acc + parseInt(x.seconds as string),
      0,
    )
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return {
      digital: `${hours}:${minutes}:${seconds}`,
      hours,
      minutes,
      name: key || 'unknown',
      percent: 100,
      seconds,
      text: `${hours} hrs ${seconds >= 30 ? minutes + 1 : minutes} mins`,
      total_seconds: data.reduce(
        (acc, x) => acc + parseInt(x.seconds as string),
        0,
      ),
    }
  })
}

function mapStatusBarRawToDto(
  statusBarRaw: CodeClimbers.WakatimePulseStatusDao[],
): CodeClimbers.ActivitiesStatusBar {
  if (statusBarRaw.length <= 0) return defaultStatusBar()
  const now = new Date()

  const statusbar: CodeClimbers.ActivitiesStatusBar = {
    cached_at: '',
    data: {
      branches: null,
      entities: null,
    },
  }

  statusbar.data.editors = getStatusByKey(statusBarRaw, 'editors')
  statusbar.data.languages = getStatusByKey(statusBarRaw, 'languages')
  statusbar.data.machines = getStatusByKey(statusBarRaw, 'machines')
  statusbar.data.operating_systems = getStatusByKey(
    statusBarRaw,
    'operating_systems',
  )
  statusbar.data.projects = getStatusByKey(statusBarRaw, 'projects')

  // const grandTotalSeconds = sumBy(statusBarRaw, (x) => parseInt(x.seconds))
  const grandTotalSeconds = statusBarRaw.reduce(
    (acc, x) => acc + parseInt(x.seconds as string),
    0,
  )
  const hours = Math.floor(grandTotalSeconds / 3600)
  const minutes = Math.floor((grandTotalSeconds % 3600) / 60)
  const seconds = Math.floor(grandTotalSeconds % 60)
  statusbar.data.grand_total = {
    digital: `${hours}:${minutes}`,
    hours,
    minutes,
    text: `${hours} hrs ${seconds >= 30 ? minutes + 1 : minutes} mins`,
    total_seconds: grandTotalSeconds,
  }

  const dates = statusBarRaw.map((x) => new Date(x.maxHeartbeatTime))
  statusbar.data.range = {
    date: new Date().toISOString(),
    end:
      maxBy(statusBarRaw, (item) => new Date(item.maxHeartbeatTime))
        ?.maxHeartbeatTime || '',
    start:
      minBy(statusBarRaw, (item) => new Date(item.minHeartbeatTime))
        ?.minHeartbeatTime || '',
    text: '',
    timezone: 'UTC',
  }
  statusbar.cached_at = new Date().toISOString()

  return statusbar
}

function getSourceFromUserAgent(userAgent: string): string | undefined {
  const sourceRegex = /.*?\/.*?\s([^0-9]*)\//
  const match = userAgent.match(sourceRegex)
  if (match) {
    return match[1]
  }

  return undefined
}

export default {
  mapStatusBarRawToDto,
  calculatePulseHash,
  filterUniqueByHash,
  pulseSuccessResponse,
  cyrb53,
  getSourceFromUserAgent,
}
