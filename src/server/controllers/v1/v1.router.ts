import express from 'express'
import healthController from './health.controller'
import pulseController from './pulse.controller'
const routes = express.Router()

export const v1Routes = () => {
  routes.use('/health', healthController)
  routes.use('/pulse', pulseController)
  return routes
}
