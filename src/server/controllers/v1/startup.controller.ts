import { Request, Response } from 'express'
import Router from 'express-promise-router'
import startupService from '../../services/startup.service'
const startupController = Router()

startupController.post('/enable', async (_: Request, res: Response) => {
  await startupService.enableStartup()
  res.send('OK')
})

startupController.post('/disable', async (_: Request, res: Response) => {
  await startupService.disableStartup()
  res.send('OK')
})

export default startupController
