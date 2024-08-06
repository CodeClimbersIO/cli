import { knex } from '../knex'
import { PulseRepo } from '../pulse.repo'

const pulseRepo = new PulseRepo(knex)
describe('pulse.repo', () => {
  it('Should get latest pulses', async () => {
    const pulses = await pulseRepo.getLatestPulses()
    expect(pulses.length).toBeGreaterThan(0)
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
