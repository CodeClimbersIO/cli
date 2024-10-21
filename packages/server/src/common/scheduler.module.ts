// scheduled-task.module.ts
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ScheduledTaskService } from './scheduleTask.service'
import { ReportService } from '../v1/activities/report.service'
import { PulseRepo } from '../v1/database/pulse.repo'
import { ActivitiesService } from '../v1/activities/activities.service'
import { UserService } from '../v1/users/user.service'
import { UserRepo } from '../v1/database/user.repo'

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    ScheduledTaskService,
    ReportService,
    PulseRepo,
    ActivitiesService,
    UserService,
    UserRepo,
  ],
})
export class ScheduledTaskModule {}
