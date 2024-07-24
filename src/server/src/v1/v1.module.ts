import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { ActivitiesService } from './activities.service'
import { PulseRepo } from '../db/pulse.repo'
import { PulseController } from './pulse.controller'
import { WakatimeController } from './wakatimeProxy.controller'
import { StartupService } from './startup.service'
import { IdentityController } from './identity.controller'
import { FlagStoreRepo } from '../db/flag-store.repo'

@Module({
  imports: [],
  controllers: [
    HealthController,
    PulseController,
    WakatimeController,
    IdentityController,
  ],
  providers: [ActivitiesService, StartupService, PulseRepo, FlagStoreRepo],
})
export class V1Module {}
