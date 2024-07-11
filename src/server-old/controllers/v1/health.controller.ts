import { Request, Response } from 'express'
import Router from 'express-promise-router'
const healthController = Router()

healthController.get('/', (_: Request, res: Response) => {
  res.send('OK')
})

export default healthController
