import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './localAuth.guard'
import { LocalDbRepo } from './localDb.repo'

@Controller('localdb')
@UseGuards(LocalAuthGuard)
export class LocalDbController {
  constructor(private readonly localDbRepo: LocalDbRepo) {}
  @Post('query')
  async query(
    @Body() body: { query: string },
  ): Promise<CodeClimbers.LocalDbQueryDao> {
    const query = body.query
    const result = await this.localDbRepo.query(query)
    return { message: 'Query', data: result }
  }
}
