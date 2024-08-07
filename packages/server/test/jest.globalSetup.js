const { knex, SQL_LITE_TEST_FILE } = require('../src/v1/database/knex')

module.exports = async () => {
  if (knex.client.config.connection.filename !== SQL_LITE_TEST_FILE) {
    throw new Error('You are not using the test file')
  }

  console.log('\n======== SETUP - DROP ========')
  await knex.migrate.rollback({}, true)

  console.log('======== SETUP - MIGRATION ========')
  await knex.migrate.latest()
  console.log('======== SETUP - SEED ========')
  await knex.seed.run()
}
