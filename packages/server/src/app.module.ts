import { MiddlewareConsumer, Module } from '@nestjs/common'
import { V1Module } from './v1/v1.module'
import { APP_FILTER, RouterModule } from '@nestjs/core'
import { AllExceptionsFilter } from './filters/allExceptions.filter'
import { RequestLoggerMiddleware } from './common/infrastructure/http/middleware/requestlogger.middleware'
import { ServeStaticModule } from '@nestjs/serve-static'
import { DbModule } from './v1/database/knex'
import { SentryModule } from '@sentry/nestjs/setup'
import { APP_DIST_PATH } from '../utils/node.util'

@Module({
  imports: [
    SentryModule.forRoot(),
    DbModule,
    V1Module,
    RouterModule.register([
      {
        path: '/api/v1',
        module: V1Module,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: APP_DIST_PATH,
    }),
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
