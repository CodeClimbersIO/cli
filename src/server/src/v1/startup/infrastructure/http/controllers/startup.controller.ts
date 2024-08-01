import { Request, Response } from 'express'
import { Controller, Post } from '@nestjs/common'
import { StartupService } from '../../../application/services/startup.service'

@Controller('/startup')
export class StartupController {
  constructor(private readonly startupService: StartupService) {
    this.startupService = startupService
  }

  @Post('/enable')
  async enableStartup(req: Request, res: Response): Promise<string> {
    await this.startupService.enableStartup()
    return 'OK'
  }

  @Post('/disable')
  async disableStartup(req: Request, res: Response): Promise<string> {
    await this.startupService.disableStartup()
    return 'OK'
  }
}
