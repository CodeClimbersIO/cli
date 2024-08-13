// Import this first!
import './sentry'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { isCli } from '../utils/environment.util'
import { PROCESS_NAME } from '../utils/constants'
import { updateSettings } from '../utils/wakatime.util'
import { startMigrations } from './v1/database/migrations'

const updatedIniValues: Record<string, string> = {
  api_key: 'eacb3beb-dad8-4fa1-b6ba-f89de8bf8f4a', // placeholder value
  api_url: 'http://localhost:14400/api/v1/wakatime',
}
const shouldShowDebugLogs =
  process.env.DEBUG === '*' || process.env.NODE_ENV === 'development'

const traceEnvironment = () => {
  Logger.log(`Running as: ${process.env.NODE_ENV}`, 'main.ts')
  Logger.log(`process.env: ${JSON.stringify(process.env)}`, 'main.ts')
}

export async function bootstrap() {
  const port = process.env.CODECLIMBERS_SERVER_PORT || 14_400
  const app = await NestFactory.create(AppModule, {
    logger: shouldShowDebugLogs
      ? ['log', 'debug', 'error', 'verbose', 'warn']
      : ['error', 'warn'],
  })
  traceEnvironment()

  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  await updateSettings(updatedIniValues)
  await startMigrations()
  await app.listen(port)
  process.title = PROCESS_NAME
}

if (!isCli()) {
  bootstrap()
}
