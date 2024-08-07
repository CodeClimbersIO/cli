const { knex } = require('../src/v1/database/knex')

module.exports = async () => {
  // Don't disconnect the DB if in watch mode
  if (process.env.JEST_WATCH) return

  await knex.destroy()
}
