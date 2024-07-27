import { MiddlewareConsumer, Module } from '@nestjs/common'
import { V1Module } from './v1/v1.module'
import { APP_FILTER, RouterModule } from '@nestjs/core'
import { DbModule } from './v1/pulse/infrastructure/database/knex'
import { AllExceptionsFilter } from '../utils/allExceptions.filter'
import { RequestLoggerMiddleware } from './common/infrastructure/http/middleware/requestlogger.middleware'

@Module({
  imports: [
    DbModule,
    V1Module,
    RouterModule.register([
      {
        path: '/api/v1',
        module: V1Module,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
