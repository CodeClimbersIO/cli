import { Request, Response } from 'express'
import Router from 'express-promise-router'
import AppLogger from '../../utils/appLogger.util'
import { validateDto } from '../../utils/validation.util'
import { WakatimePulse } from './dtos/wakatimePulse.dto'
const wakatimeProxyController = Router()

wakatimeProxyController.get('/users/current/statusbar/today', (req: Request, res: Response) => {
  AppLogger.info(req.body)
  res.send({ message: 'success', data: 'statusbar' })
})

wakatimeProxyController.post('/users/current/heartbeats', (req: Request, res: Response) => {
  AppLogger.info('heartbeats', req.body)
  res.status(201).send({ message: 'success', data: 'heartbeats' })
})

wakatimeProxyController.post('/users/current/heartbeats.bulk', async (req: Request, res: Response) => {
  AppLogger.info('heartbeats.bulk', req.body)
  const wakatimePulse = new WakatimePulse(req.body)

  await validateDto(wakatimePulse)
  console.log(req.body)
  res.status(201).send({ message: 'success', data: 'heartbeats.bulk' })
})

export default wakatimeProxyController
