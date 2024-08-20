import { Module } from '@nestjs/common'
import { HealthController } from '../common/infrastructure/http/controllers/health.controller'
import { StartupController } from './startup/startup.controller'
import { ActivitiesService } from './activities/activities.service'
import { PulseController } from './activities/pulse.controller'
import { WakatimeController } from './activities/wakatimeProxy.controller'
import { PulseRepo } from './database/pulse.repo'
import { DarwinStartupService } from './startup/darwinStartup.service'
import { StartupServiceFactory } from './startup/startupService.factory'
import { UnsupportedStartupService } from './startup/unsupportedStartup.service'
import { WindowsStartupService } from './startup/windowsStartup.service'
import { LinuxStartupService } from './startup/linuxStartup.service'

@Module({
  imports: [],
  controllers: [
    HealthController,
    PulseController,
    WakatimeController,
    StartupController,
  ],
  providers: [
    ActivitiesService,
    StartupServiceFactory,
    PulseRepo,
    UnsupportedStartupService,
    DarwinStartupService,
    WindowsStartupService,
    LinuxStartupService,
  ],
})
export class V1Module { }
