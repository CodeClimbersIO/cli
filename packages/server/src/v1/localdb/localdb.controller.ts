import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { LocalAuthGuard } from './localAuth.guard'
import { LocalDbRepo } from './localdb.repo'

@Controller('localdb')
@UseGuards(LocalAuthGuard)
export class LocalDbController {
  constructor(private readonly localDbRepo: LocalDbRepo) {}
  @Post('query')
  async query(
    @Res() response: Response,
    @Body() body: { query: string },
  ): Promise<void> {
    const query = body.query
    const result = await this.localDbRepo.query(query)
    response.json({ message: 'Query', result })
  }
}
