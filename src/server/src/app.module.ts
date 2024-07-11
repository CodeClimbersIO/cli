import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { V1Module } from './v1/v1.module'
import { RouterModule } from '@nestjs/core'
import { DbModule } from './db/knex'

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
