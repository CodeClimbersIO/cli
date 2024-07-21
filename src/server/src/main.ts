import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { startMigrations } from './db/migrations'
import { ValidationPipe } from '@nestjs/common'
import { isCli } from '../utils/environment.util'

export async function bootstrap() {
  console.log('bootstrap 3')
  const port = process.env.PORT || 8000
  console.log('bootstrap 4')
  const app = await NestFactory.create(AppModule)
  console.log('bootstrap 5')
  app.enableCors()
  console.log('bootstrap 6')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  console.log('bootstrap 7')
  await startMigrations()
  console.log('bootstrap 8')
  await app.listen(port)
  console.log('bootstrap 9')
}
console.log('bootstrap 1')
if (!isCli()) {
  console.log('bootstrap 2')
  bootstrap()
}
