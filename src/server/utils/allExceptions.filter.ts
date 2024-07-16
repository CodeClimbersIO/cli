import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
// import * as Sentry from '@sentry/node'

export type BEErrorReport = {
  customMessage?: string
} & Error

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error'

    const errorReport: BEErrorReport = {
      message: typeof message === 'object' ? JSON.stringify(message) : message,
      name: exception instanceof Error ? exception.name : 'Error',
      stack: exception instanceof Error ? exception.stack : undefined,
    }
    if (status >= 500) {
      Logger.error(errorReport)
      // Sentry.captureException(exception)
    } else {
      Logger.debug(errorReport)
    }

    response.status(status).json(message)
  }
}
