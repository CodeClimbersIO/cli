import { Logger } from '@nestjs/common'
import { knex } from './knex'

export const startMigrations = async () => {
  Logger.log('Running Migrations')

  try {
    // Locations of migrations is relative to project root
    await knex.migrate.latest()
  } finally {
    Logger.log('Migrations Complete')
  }
}
