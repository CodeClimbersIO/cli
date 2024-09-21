import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import { CodeClimberError } from '../../utils/codeClimberErrors'

@Catch(CodeClimberError)
export class CodeClimberExceptionFilter implements ExceptionFilter {
  catch(exception: CodeClimberError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(exception.status).json({
      statusCode: exception.status,
      message: exception.message,
      error: exception.name,
      validationErrors:
        exception instanceof CodeClimberError.InvalidBody
          ? exception.validationErrors
          : undefined,
    })
  }
}
