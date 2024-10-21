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
import { LocalDbController } from './localdb/localDb.controller'
import { LocalAuthService } from './localdb/localAuth.service'
import { LocalAuthController } from './localdb/localAuth.controller'
import { LocalAuthGuard } from './localdb/localAuth.guard'
import { LocalDbRepo } from './localdb/localDb.repo'
import { ReportService } from './activities/report.service'
import { ReportController } from './activities/report.controller'

@Module({
  imports: [],
  controllers: [
    HealthController,
    PulseController,
    WakatimeController,
    StartupController,
    LocalDbController,
    LocalAuthController,
    ReportController,
  ],
  providers: [
    ActivitiesService,
    StartupServiceFactory,
    PulseRepo,
    UnsupportedStartupService,
    DarwinStartupService,
    WindowsStartupService,
    LinuxStartupService,
    LocalAuthService,
    LocalAuthGuard,
    LocalDbRepo,
    ReportService,
  ],
})
export class V1Module {}
