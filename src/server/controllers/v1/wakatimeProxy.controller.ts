import { validate } from 'class-validator'
import express, { Request, Response } from 'express'
import AppLogger from '../../utils/appLogger'
const wakatimeProxyController = express.Router()

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
  // const wakatimePulse = new WakatimePulse(req.body)
  try{

    await validate(req.body)
  }catch(e){
    console.log(e)
  }
  console.log(req.body)
  res.status(201).send({ message: 'success', data: 'heartbeats.bulk' })
})

export default wakatimeProxyController
