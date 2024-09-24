import { Controller, Get, Req } from '@nestjs/common'
import { LocalAuthService } from './localAuth.service'

@Controller('auth/local')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Get()
  async getLocalApiKey(): Promise<CodeClimbers.LocalAuthDao> {
    const apiKey = await this.localAuthService.getLocalApiKey()
    return { message: 'API key set', data: { apiKey } }
  }

  @Get('validate')
  async validate(@Req() request: Request) {
    const apiKey = request.headers['x-api-key']
    const isValid = await this.localAuthService.isValidLocalApiKey(apiKey)
    return { message: 'API key set', data: { isValid } }
  }
}
