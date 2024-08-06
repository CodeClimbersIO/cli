import { knex } from '../knex'
import { PulseRepo } from '../pulse.repo'

const pulseRepo = new PulseRepo(knex)

describe('pulse.repo', () => {
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
    const TWO_HOURS = 1_000 * 60 * 60 * 2

    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - TWO_HOURS)
    const minutes = await pulseRepo.getRangeMinutes(startDate, endDate)

    expect(minutes).toEqual(1)
  })

  it('Should get the longest day in minutes range', async () => {
    const TEN_DAYS = 1_000 * 60 * 60 * 2 * 24 * 10

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
    const TEN_DAYS = 1_000 * 60 * 60 * 2 * 24 * 10

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

    const CHROME_LAST_ACTIVE = new Date(
      new Date().getTime() - 24 * 60 * 60 * 1_000,
    )
    CHROME_LAST_ACTIVE.setHours(0, 0, 0, 0)

    const VSCODE_LAST_ACTIVE = new Date(
      new Date().getTime() - 24 * 60 * 60 * 1_000,
    )
    VSCODE_LAST_ACTIVE.setHours(0, 0, 0, 0)

    const vscode = uniqueUserAgents.find((n) => n.userAgent === 'vscode')

    console.log(uniqueUserAgents)
    expect(vscode).toBeTruthy()
    expect(vscode.lastActive).toEqual(VSCODE_LAST_ACTIVE.toISOString())

    const chrome = uniqueUserAgents.find(
      (n) => n.userAgent === 'chrome-chrome_extension',
    )
    expect(chrome).toBeTruthy()
    expect(vscode.lastActive).toEqual(CHROME_LAST_ACTIVE.toISOString())
  })

  // --------- WRITES ------------
  const dummyPulse = (): CodeClimbers.Pulse => ({
    userId: '1',
    entity: 'NEW',
    category: 'NEW',
    time: new Date().toISOString(),
    createdAt: new Date().toISOString(),
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

  it('Should get the last project', async () => {
    const lastProject = await pulseRepo.getLatestProject()
    expect(lastProject).toEqual('Project 2')
  })
})

afterAll((done) => {
  knex.destroy()
  done()
})
