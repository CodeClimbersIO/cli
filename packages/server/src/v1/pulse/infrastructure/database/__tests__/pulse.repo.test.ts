import { knex } from '../knex'
import { PulseRepo } from '../pulse.repo'

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
