import { Request, Response } from 'express'
import { Controller, Get } from '@nestjs/common'
import { FlagStoreRepo } from '../db/flag-store.repo'

@Controller('/identity')
export class IdentityController {
  constructor(private readonly flagstorerepo: FlagStoreRepo) {
  }
  @Get('/')
  async identity(req: Request, res: Response): Promise<void> {
    res.send({
      uuid: await this.flagstorerepo.getIdentifier(),
    })
  }
}
