import express from 'express'
import healthController from './health.controller'
import pulseController from './pulse.controller'
import wakatimeProxyController from './wakatimeProxy.controller'
const routes = express.Router()

export const v1Routes = () => {
  routes.use('/health', healthController)
  routes.use('/pulse', pulseController)
  routes.use('/wakatime', wakatimeProxyController)
  return routes
}
