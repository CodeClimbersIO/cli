import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { ActivitiesService } from './activities.service'
import { PulseRepo } from '../db/pulse.repo'
import { PulseController } from './pulse.controller'

@Module({
  imports: [],
  controllers: [HealthController, PulseController],
  providers: [ActivitiesService, PulseRepo],
})
export class V1Module {}
