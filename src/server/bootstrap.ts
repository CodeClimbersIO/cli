import express, { Express } from 'express'
import { initMigrations } from './db/migrate'
import { buildApiRoutes } from './controllers/router'

export async function bootstrap(app: Express) {
  const apiRoutes = buildApiRoutes()
  app.use('/', express.static('dist/app'))
  app.use('/api', apiRoutes)
  await initMigrations()
}
