import { Request, Response } from 'express'
import { Controller, Post } from '@nestjs/common'
import { StartupService } from './startup.service'

@Controller('/startup')
export class StartupController {
  constructor(private readonly startupService: StartupService) {
    this.startupService = startupService
  }
  @Post('/enable')
  async enableStartup(req: Request, res: Response): Promise<void> {
    await this.startupService.enableStartup()
    res.send('OK')
  }

  @Post('/disable')
  async disableStartup(req: Request, res: Response): Promise<void> {
    await this.startupService.disableStartup()
    res.send('OK')
  }
}
