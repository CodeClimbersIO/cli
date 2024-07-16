import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { ActivitiesService } from './activities.service'
import { PulseRepo } from '../db/pulse.repo'
import { PulseController } from './pulse.controller'
import { WakatimeController } from './wakatimeProxy.controller'
import { StartupService } from './startup.service'

@Module({
  imports: [],
  controllers: [HealthController, PulseController, WakatimeController],
  providers: [ActivitiesService, StartupService, PulseRepo],
})
export class V1Module {}
