import { Request, Response } from 'express'
import Router from 'express-promise-router'
import activitiesService from '../../services/activities.service'
const pulseController = Router()

pulseController.get('/latest', async (_: Request, res: Response) => {
  const pulse = await activitiesService.getLatestPulses()
  res.send({ message: 'success', data: pulse })
})

export default pulseController
