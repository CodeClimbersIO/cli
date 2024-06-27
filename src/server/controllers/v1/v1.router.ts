import express from 'express'
import healthController from './health.controller'
import meController from './me.controller'
const routes = express.Router()

export const v1Routes = () => {
  routes.use('/health', healthController)
  routes.use('/me', meController)
  return routes
}
