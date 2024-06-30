import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import { buildApiRoutes } from './controllers/router'
import { initMigrations } from './db/migrate'
import AppLogger from './utils/appLogger.util'
import { CodeClimberError } from './utils/codeClimberErrors'
import { printRoutes } from './utils/debug.util'

function initErrorHandling(app: Express): void {
  app.use((err: Error, req: Request, res: Response) => {
    if (err instanceof CodeClimberError) { // Errors designed by developers to go to the end user are of type BaseError
      res.status(err.status).json({ message: err.message, err })
    } else {
      AppLogger.error(err) 
      res.status(500).json({ message: err.message || 'Internal Server Error', err })
    }
  })
}

export async function bootstrap(app: Express) {
  const apiRoutes = buildApiRoutes()
  app.use(cors())
  app.use(express.json())
  app.use('/', express.static('dist/app'))
  app.use('/api', apiRoutes)
  initErrorHandling(app)
  app._router.stack.forEach(printRoutes.bind(null, []))
  await initMigrations()
}
