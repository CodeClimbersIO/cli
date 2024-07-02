import { Request, Response } from 'express'
import Router from 'express-promise-router'
import activitiesService from '../../services/activities.service'
import AppLogger from '../../utils/appLogger.util'
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
  async (req: Request, res: Response) => {
    const result = await activitiesService.createPulse(req.body)
    res.status(201).send(result)
  },
)

wakatimeProxyController.post(
  '/users/current/heartbeats.bulk',
  async (req: Request, res: Response) => {
    const result = await activitiesService.createPulses(req.body)
    res.status(201).send(result)
  },
)

export default wakatimeProxyController
