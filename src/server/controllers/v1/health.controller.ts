import express, { Request, Response } from 'express'
const healthController = express.Router()

healthController.get('/', (_: Request, res: Response) => {
  res.send('OK')
})

export default healthController
