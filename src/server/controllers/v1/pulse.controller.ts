import express, { Request, Response } from 'express'
import meService from '../../services/pulse.service'
const meController = express.Router()

meController.get('/latest', async (_: Request, res: Response) => {
  const pulse = await meService.getLatestPulses()
  res.send({ message: 'success', data: pulse })
})

export default meController
