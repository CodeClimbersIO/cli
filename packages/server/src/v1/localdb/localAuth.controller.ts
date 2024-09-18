import {
  Controller,
  Get,
  Res,
  Headers,
  UnauthorizedException,
} from '@nestjs/common'
import { Response } from 'express'
import { LocalAuthService } from './localAuth.service'

const LOCAL_API_KEY = 'local_api_key'
@Controller('local-auth')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Get()
  async getLocalApiKey(@Res() response: Response): Promise<void> {
    const apiKey = await this.localAuthService.getLocalApiKey()

    response.cookie(LOCAL_API_KEY, apiKey, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    response.json({ message: 'API key set' })
  }

  @Get('import')
  async importApiKey(
    @Headers('x-api-key') apiKey: string,
    @Res() response: Response,
  ): Promise<void> {
    const isValid = await this.localAuthService.isValidLocalApiKey(apiKey)

    if (!isValid) {
      throw new UnauthorizedException('Invalid API key')
    }

    response.cookie(LOCAL_API_KEY, apiKey, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    response.json({ message: 'API key set' })
  }
}
