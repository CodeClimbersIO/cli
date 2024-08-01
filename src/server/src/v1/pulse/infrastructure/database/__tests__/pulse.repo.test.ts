import Knex from 'knex'
import { knexConfig } from '../knex'
import { PulseRepo } from '../pulse.repo'

const knex = Knex(knexConfig)
const pulseRepo = new PulseRepo(knex)
describe('pulse.repo', () => {
  it('Should get latest pulses', async () => {
    const pulses = await pulseRepo.getLatestPulses()
    expect(pulses.length).toBeGreaterThan(0)
  })
})

afterAll((done) => {
  knex.destroy()
  done()
})
