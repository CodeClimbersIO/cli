// import { Request, Response } from 'express'
// import Router from 'express-promise-router'
// import activitiesService from '../../services/activities.service'
// import { Get } from '@nestjs/common'
// const pulseController = Router()

import { Controller, Get } from '@nestjs/common'
import { ActivitiesService } from './activities.service'

// pulseController.get('/latest', async (_: Request, res: Response) => {
//   const pulse = await activitiesService.getLatestPulses()
//   res.send({ message: 'success', data: pulse })
// })

@Controller('pulses')
export class PulseController {
  constructor(private readonly activitiesService: ActivitiesService) {
    this.activitiesService = activitiesService
  }
  @Get('latest')
  async latestPulses(): Promise<{
    message: string
    data: CodeClimbers.Pulse[] | undefined
  }> {
    const pulse = await this.activitiesService.getLatestPulses()
    return { message: 'success', data: pulse }
  }
}
