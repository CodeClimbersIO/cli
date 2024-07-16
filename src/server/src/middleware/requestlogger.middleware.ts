import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

import { NextFunction, Request, Response } from 'express'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url } = request
    const userAgent = request.get('user-agent') || ''

    response.on('close', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')
      Logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        'requestlogger.middleware',
      )
    })

    next()
  }
}
