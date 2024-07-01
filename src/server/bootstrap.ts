import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import { buildApiRoutes } from './controllers/router'
import { initMigrations } from './db/migrate'
import AppLogger from './utils/appLogger.util'
import { CodeClimberError } from './utils/codeClimberErrors'
import { printRoutes } from './utils/debug.util'

function initErrorHandling(app: Express): void {
  app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
    if (err instanceof CodeClimberError) { // Errors designed by developers to go to the end user are of type BaseError
      res.status(err.status).send({ message: err.message, err })
    } else {
      AppLogger.error(err) 
      res.status(500).send({ message: err.message || 'Internal Server Error', err })
    }
    next()
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
