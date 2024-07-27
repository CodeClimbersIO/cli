const Knex = require('knex')
const {
  knexConfig,
  SQL_LITE_TEST_FILE,
} = require('../src/v1/pulse/infrastructure/database/knex')

const knex = Knex(knexConfig)
module.exports = async () => {
  if (knex.client.config.connection.filename !== SQL_LITE_TEST_FILE) {
    throw new Error('You must use an in-memory database')
  }

  console.log('======== SETUP - MIGRATION ========')
  await knex.migrate.latest()
  console.log('======== SETUP - SEED ========')
  await knex.seed.run()

  await knex.destroy()
}
