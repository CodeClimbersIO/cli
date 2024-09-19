// Import this first!
import './sentry'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { isCli, isProd } from '../utils/environment.util'
import { PROCESS_NAME } from '../utils/constants'
import { updateSettings } from '../utils/ini.util'
import { startMigrations } from './v1/database/migrations'
import { CodeClimberExceptionFilter } from './filters/codeClimbersException.filter'
import cookieParser from 'cookie-parser'

const updatedWakatimeIniValues: Record<string, string> = {
  api_key: 'eacb3beb-dad8-4fa1-b6ba-f89de8bf8f4a', // placeholder value
  api_url: 'http://localhost:14400/api/v1/wakatime',
}

const traceEnvironment = () => {
  Logger.debug(`Running as: ${process.env.NODE_ENV}`, 'main.ts')
  Logger.debug(`process.env: ${JSON.stringify(process.env)}`, 'main.ts')
}

export async function bootstrap() {
  const port = process.env.CODECLIMBERS_SERVER_PORT || 14_400
  const app = await NestFactory.create(AppModule, {
    logger: !isProd()
      ? ['log', 'debug', 'error', 'verbose', 'warn']
      : ['log', 'error', 'warn'],
  })
  traceEnvironment()

  app.enableCors({
    origin: isProd()
      ? 'https://codeclimbers.io'
      : ['https://codeclimbers.io', 'http://localhost:5173', /\.web\.app$/],
    credentials: true,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  app.use(cookieParser())
  app.useGlobalFilters(new CodeClimberExceptionFilter())
  await updateSettings(updatedWakatimeIniValues)
  await startMigrations()
  await app.listen(port)
  process.title = PROCESS_NAME
}

if (!isCli()) {
  bootstrap()
}
