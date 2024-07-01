import { Request, Response } from 'express'
import Router from 'express-promise-router'
import { CodeClimbersApi } from '../../../api.types/wakatimePulse.dto'
import AppLogger from '../../utils/appLogger.util'
import { validateDto } from '../../utils/validation.util'
const wakatimeProxyController = Router()

wakatimeProxyController.get(
  '/users/current/statusbar/today',
  (req: Request, res: Response) => {
    AppLogger.info(req.body)
    res.send({ message: 'success', data: 'statusbar' })
  },
)

wakatimeProxyController.post(
  '/users/current/heartbeats',
  (req: Request, res: Response) => {
    AppLogger.info('heartbeats', req.body)
    res.status(201).send({ message: 'success', data: 'heartbeats' })
  },
)

wakatimeProxyController.post(
  '/users/current/heartbeats.bulk',
  async (req: Request, res: Response) => {
    AppLogger.info('heartbeats.bulk', req.body)
    const wakatimePulse = new CodeClimbersApi.WakatimePulseDto(req.body)

    await validateDto(wakatimePulse)
    res.status(201).send({ message: 'success', data: 'heartbeats.bulk' })
  },
)

export default wakatimeProxyController
