import express from 'express'
import { bootstrap } from './bootstrap'
import AppLogger from './utils/appLogger'

const app = express()
const port = process.env.PORT || 8080

export async function startServer() {
  try {
    await bootstrap(app)
    app.listen(port, () => {
      AppLogger.info(`[server]: Server is running at http://localhost:${port}`)
    })
  } catch (e) {
    AppLogger.error(`[server]: Error starting server: ${e}`)
  }
}

startServer()
