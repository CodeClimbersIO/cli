import cors from 'cors'
import express, { Express } from 'express'
import { buildApiRoutes } from './controllers/router'
import { initMigrations } from './db/migrate'
export async function bootstrap(app: Express) {
  const apiRoutes = buildApiRoutes()
  app.use(cors())
  app.use('/', express.static('dist/app'))
  app.use('/api', apiRoutes)
  await initMigrations()
}
