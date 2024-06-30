import { Request, Response } from 'express'
import Router from 'express-promise-router'
import meService from '../../services/pulse.service'
const pulseController = Router()

pulseController.get('/latest', async (_: Request, res: Response) => {
  const pulse = await meService.getLatestPulses()
  res.send({ message: 'success', data: pulse })
})

export default pulseController
