import { knex } from '../knex'
import { PulseRepo } from '../pulse.repo'

const pulseRepo = new PulseRepo(knex)

describe('pulse.repo', () => {
  const SECOND = 1_000
  const MINUTE = SECOND * 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24
  const YEAR = DAY * 365
  const NOW = new Date()
  NOW.setUTCHours(0, 0, 0, 0)

  const TIMESTAMP = NOW.getTime()

  // SEED BASED TESTS:
  it('Should get latest pulses', async () => {
    const pulses = await pulseRepo.getLatestPulses()
    expect(pulses.length).toEqual(10)
    // Make sure it is the newest ones
    pulses.slice(0, 3).forEach((pulse) => {
      expect(pulse.entity).toEqual('NEW')
    })
  })

  it('Should get all pulses', async () => {
    const pulses = await pulseRepo.getAllPulses()
    expect(pulses.length).toEqual(102)
  })

  it('Should get minutes in range', async () => {
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - HOUR * 2)
    const minutes = await pulseRepo.getRangeMinutes(startDate, endDate)

    expect(minutes).toEqual(2)
  })

  it('Should get the longest day in minutes range', async () => {
    const TEN_DAYS = DAY * 10

    const endDate = new Date()
    endDate.setUTCHours(0, 0, 0, 0)
    const startDate = new Date(endDate.getTime() - TEN_DAYS)
    startDate.setUTCHours(0, 0, 0, 0)

    const longestDay = await pulseRepo.getLongestDayInRangeMinutes(
      startDate,
      endDate,
    )

    expect(longestDay).toEqual(2)
  })

  it('Should get category time overview', async () => {
    const TEN_DAYS = DAY * 10

    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - TEN_DAYS)

    const categoryTimeOverview = await pulseRepo.getCategoryTimeOverview(
      startDate.toISOString(),
      endDate.toISOString(),
    )

    expect(categoryTimeOverview.length).toEqual(2)
  })

  it('Should get the last project', async () => {
    const lastProject = await pulseRepo.getLatestProject()
    expect(lastProject).toEqual('Latest Project')
  })

  it('Should get unique user agents and last active', async () => {
    const uniqueUserAgents = await pulseRepo.getUniqueUserAgentsAndLastActive()
    expect(uniqueUserAgents.length).toEqual(3)

    const vscode = uniqueUserAgents.find((n) => n.userAgent === 'vscode')
    const VSCODE_LAST_ACTIVE = new Date(TIMESTAMP - DAY)
    expect(vscode).toBeTruthy()
    expect(vscode.lastActive).toEqual(VSCODE_LAST_ACTIVE.toISOString())

    const chrome = uniqueUserAgents.find(
      (n) => n.userAgent === 'chrome-chrome_extension',
    )
    const CHROME_LAST_ACTIVE = new Date(TIMESTAMP - DAY * 3)
    expect(chrome).toBeTruthy()
    expect(chrome.lastActive).toEqual(CHROME_LAST_ACTIVE.toISOString())
  })

  // --------- WRITES ------------
  const dummyPulse = (time?: string): CodeClimbers.Pulse => ({
    userId: '1',
    entity: 'NEW',
    category: 'NEW',
    time: time ?? new Date().toISOString(),
    createdAt: time ?? new Date().toISOString(),
    project: 'NEW',
    type: '',
    isWrite: false,
    editor: '',
    operatingSystem: '',
    machine: '',
    userAgent: '',
    hash: String(Math.floor(new Date().getTime() / Math.random())),
  })

  it('Should create a pulse', async () => {
    const createdPulse = await pulseRepo.createPulse(dummyPulse())

    expect(createdPulse).toBeTruthy()
    expect(createdPulse).toHaveLength(1)
  })

  it('Should create pulses', async () => {
    const createdPulses = await pulseRepo.createPulses([
      dummyPulse(),
      dummyPulse(),
    ])

    expect(createdPulses).toBeTruthy()
    expect(createdPulses).toHaveLength(2)
  })

  // LOGIC BASED TESTS. Go back a year to prevent issues with seeder data.
  it('Should group many heartbeats within a 2 minute period correctly', async () => {
    const interval = SECOND * 10
    const timePeriod = 12

    const startDate = new Date(TIMESTAMP - YEAR)
    const endDate = new Date(TIMESTAMP - YEAR + interval * timePeriod)

    const pulses = []
    for (let i = 0; i < timePeriod; i++) {
      pulses.push(
        dummyPulse(new Date(startDate.getTime() + i * interval).toISOString()),
      )
    }

    await pulseRepo.createPulses(pulses)

    const minutes = await pulseRepo.getRangeMinutes(startDate, endDate)
    expect(minutes).toEqual(2)
  })

  it('Should group many heart beats at a different intervals correctly', async () => {
    const timeAgo = TIMESTAMP - YEAR - DAY * 2

    const startDate = new Date(timeAgo)
    const endDate = new Date(timeAgo + MINUTE * 45)

    // Start, 3 at 10 minutes, 2 at 20 minutes, 30 minutes.
    // 7 total, but should only count as 4.
    await pulseRepo.createPulses([
      dummyPulse(new Date(startDate.getTime()).toISOString()),
      dummyPulse(new Date(startDate.getTime() + MINUTE * 10).toISOString()),
      dummyPulse(
        new Date(startDate.getTime() + MINUTE * 10 + SECOND * 9).toISOString(),
      ),
      dummyPulse(
        new Date(startDate.getTime() + MINUTE * 10 + SECOND * 5).toISOString(),
      ),
      dummyPulse(new Date(startDate.getTime() + MINUTE * 20).toISOString()),
      dummyPulse(
        new Date(startDate.getTime() + MINUTE * 20 + SECOND * 5).toISOString(),
      ),
      dummyPulse(new Date(startDate.getTime() + MINUTE * 30).toISOString()),
    ])

    const minutes = await pulseRepo.getRangeMinutes(startDate, endDate)
    expect(minutes).toEqual(8)
  })

  // Edge case: Does the query handle days. If I have a heartbeat at 11:59pm or 12:00am, does that heartbeat count towards the correct day?
  it('Should group heartbeats at the end of the day correctly', async () => {
    const timeAgo = TIMESTAMP - YEAR - DAY * 14

    const startDate = new Date(timeAgo)
    const endDate = new Date(timeAgo + DAY * 7)

    // Start, 11:59pm, 12:00am, 12:01am.
    // 5 total, but should only count as 2
    await pulseRepo.createPulses([
      dummyPulse(new Date(startDate.getTime()).toISOString()),
      dummyPulse(new Date(startDate.getTime() - MINUTE).toISOString()),
      dummyPulse(new Date(startDate.getTime() + DAY - MINUTE).toISOString()),
      dummyPulse(new Date(startDate.getTime() + DAY).toISOString()),
      dummyPulse(new Date(startDate.getTime() + DAY + MINUTE).toISOString()),
      dummyPulse(
        new Date(startDate.getTime() + DAY + MINUTE * 2).toISOString(),
      ),
    ])

    const minutes = await pulseRepo.getLongestDayInRangeMinutes(
      startDate,
      endDate,
    )

    expect(minutes).toEqual(3)
  })

  // TODO: Write test for representing categories correctly, as they are not all equal.
})

afterAll((done) => {
  knex.destroy()
  done()
})
