import { Module } from '@nestjs/common'
import { ActivitiesService } from './pulse/application/services/activities.service'
import { PulseRepo } from './pulse/infrastructure/database/pulse.repo'
import { PulseController } from './pulse/infrastructure/http/controllers/pulse.controller'
import { WakatimeController } from './pulse/infrastructure/http/controllers/wakatimeProxy.controller'
import { StartupService } from './startup/application/services/startup.service'
import { HealthController } from '../common/infrastructure/http/controllers/health.controller'
import { StartupController } from './startup/infrastructure/http/controllers/startup.controller'

@Module({
  imports: [],
  controllers: [
    HealthController,
    PulseController,
    WakatimeController,
    StartupController,
  ],
  providers: [ActivitiesService, StartupService, PulseRepo],
})
export class V1Module {}
