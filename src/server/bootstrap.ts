import cors from 'cors'
import express, { Express } from 'express'
import { buildApiRoutes } from './controllers/router'
import { initMigrations } from './db/migrate'
import { printRoutes } from './utils/debug.util'

export async function bootstrap(app: Express) {
  const apiRoutes = buildApiRoutes()
  app.use(cors())
  app.use(express.json())
  app.use('/', express.static('dist/app'))
  app.use('/api', apiRoutes)
  app._router.stack.forEach(printRoutes.bind(null, []))
  await initMigrations()
}
