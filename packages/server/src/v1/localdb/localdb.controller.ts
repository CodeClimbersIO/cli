import { Controller, Get } from '@nestjs/common'
import { LocalDbService } from './localdb.service'

@Controller('localdb')
export class LocalDbController {
  constructor(private readonly localDbService: LocalDbService) {
    this.localDbService = localDbService
  }
  @Get('localapikey')
  async getLocalApiKey(): Promise<{
    message: string
    data: { api_key: string }
  }> {
    const result = await this.localDbService.getLocalApiKey()
    return { message: 'success', data: { api_key: result } }
  }
}
