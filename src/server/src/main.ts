import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { startMigrations } from './v1/pulse/infrastructure/database/migrations'
import { ValidationPipe } from '@nestjs/common'
import { isCli } from '../utils/environment.util'
import { PROCESS_NAME } from './constants'

export async function bootstrap() {
  const port = process.env.PORT || 8000
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  await startMigrations()
  await app.listen(port)
  process.title = PROCESS_NAME
}

if (!isCli()) {
  bootstrap()
}
