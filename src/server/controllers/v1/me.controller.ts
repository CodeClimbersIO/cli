import express, { Request, Response } from 'express'
import meService from '../../services/me.service'
const meController = express.Router()

meController.get('/pulse/latest', async (_: Request, res: Response) => {
  const pulse = await meService.getLatestPulse()
  res.send({ message: 'success', data: pulse })
})

export default meController
