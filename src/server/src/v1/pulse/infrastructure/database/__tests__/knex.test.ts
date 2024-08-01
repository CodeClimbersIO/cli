import Knex from 'knex'
import { knexConfig, SQL_LITE_TEST_FILE } from '../knex'

const knex = Knex(knexConfig)
describe('knex', () => {
  it('Should connect successfully', async () => {
    await knex.raw('SELECT 1').catch((e) => {
      expect(e).toBeUndefined()
    })
  })

  it('Should be using test path', () => {
    expect(knex.client.config.connection.filename).toEqual(SQL_LITE_TEST_FILE)
  })
})

afterAll((done) => {
  knex.destroy()
  done()
})
