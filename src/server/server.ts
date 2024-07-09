import express from 'express'
import { bootstrap } from './bootstrap'
import AppLogger from './utils/appLogger.util'

const app = express()

export async function startServer() {
  const port = process.env.PORT || 8000
  try {
    await bootstrap(app)
    app.listen(port, () => {
      AppLogger.info(`[server]: Server is running at http://localhost:${port}`)
    })
  } catch (e) {
    AppLogger.error(`[server]: Error starting server: ${e}`)
  }
}
