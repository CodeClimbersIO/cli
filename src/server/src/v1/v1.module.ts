import { Module } from '@nestjs/common'
import { ActivitiesService } from './pulse/application/services/activities.service'
import { PulseRepo } from './pulse/infrastructure/database/pulse.repo'
import { PulseController } from './pulse/infrastructure/http/controllers/pulse.controller'
import { WakatimeController } from './pulse/infrastructure/http/controllers/wakatimeProxy.controller'
import { StartupService } from './startup/application/services/startup.service'
import { HealthController } from '../common/infrastructure/http/controllers/health.controller'

@Module({
  imports: [],
  controllers: [HealthController, PulseController, WakatimeController],
  providers: [ActivitiesService, StartupService, PulseRepo],
})
export class V1Module {}
