import express, { Request, Response } from 'express'
import meService from '../../services/pulse.service'
const pulseController = express.Router()

pulseController.get('/latest', async (_: Request, res: Response) => {
  const pulse = await meService.getLatestPulses()
  res.send({ message: 'success', data: pulse })
})

export default pulseController
