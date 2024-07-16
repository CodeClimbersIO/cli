import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { startMigrations } from './db/migrations'
import { ValidationPipe } from '@nestjs/common'
import { isCli } from '../utils/environment.util'

export async function bootstrap() {
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
  await app.listen(8000)
}
if (!isCli) {
  bootstrap()
}
