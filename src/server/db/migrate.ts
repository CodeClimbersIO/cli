import AppLogger from '../utils/appLogger'
import { db } from './knex'

export const initMigrations = async () => {
  AppLogger.info('Running Migrations')
  try {
    // Locations of migrations is relative to project root
    await db.migrate.latest()
  } finally {
    AppLogger.info('Migrations Complete')
  }
}
