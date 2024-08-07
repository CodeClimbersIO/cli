import { Controller, Post } from '@nestjs/common'
import { StartupServiceFactory } from './startupService.factory'

@Controller('/startup')
export class StartupController {
  private startupService: CodeClimbers.StartupService

  constructor(private readonly startupServiceFactory: StartupServiceFactory) {
    this.startupService = this.startupServiceFactory.getStartupService()
  }

  @Post('/enable')
  async enableStartup(): Promise<string> {
    await this.startupService.enableStartup()
    return 'OK'
  }

  @Post('/disable')
  async disableStartup(): Promise<string> {
    await this.startupService.disableStartup()
    return 'OK'
  }
}
