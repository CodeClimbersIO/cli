import {
  Controller,
  Get,
  Res,
  Headers,
  UnauthorizedException,
  Req,
} from '@nestjs/common'
import { Response, Request } from 'express'
import { LocalAuthService } from './localAuth.service'
import { isProd } from '../../../utils/environment.util'

const LOCAL_API_KEY = 'local_api_key'
@Controller('local-auth')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Get()
  async getLocalApiKey(
    @Res({ passthrough: true }) response: Response,
  ): Promise<CodeClimbers.LocalAuthDao> {
    const apiKey = await this.localAuthService.getLocalApiKey()

    response.cookie(LOCAL_API_KEY, apiKey, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    return { message: 'API key set', data: { apiKey } }
  }

  @Get('import')
  async importApiKey(
    @Headers('x-api-key') apiKey: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CodeClimbers.LocalAuthDao> {
    const isValid = await this.localAuthService.isValidLocalApiKey(apiKey)

    if (!isValid) {
      throw new UnauthorizedException('Invalid API key')
    }

    if (isProd()) {
      response.cookie(LOCAL_API_KEY, apiKey, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
    } else {
      response.cookie(LOCAL_API_KEY, apiKey, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      })
    }

    return { message: 'API key set', data: { apiKey } }
  }

  @Get('has-valid-cookie')
  async hasValidCookie(@Req() request: Request) {
    const apiKey = request.cookies[LOCAL_API_KEY]
    const isValid = await this.localAuthService.isValidLocalApiKey(apiKey)
    return { message: 'API key set', data: { isValid } }
  }
}
