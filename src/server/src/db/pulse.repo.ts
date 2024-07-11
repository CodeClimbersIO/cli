import { Injectable, Logger } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import sqlReaderUtil from '../../utils/sqlReader.util'

@Injectable()
export class PulseRepo {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  tableName = 'activities_pulse'
  pulseDb = this.knex<CodeClimbers.Pulse>(this.tableName)

  async getStatusBarDetails(): Promise<CodeClimbers.WakatimePulseStatusDao[]> {
    const getTimeQuery = await sqlReaderUtil.getFileContentAsString(
      'getStatusBarDetails.sql',
    )
    return this.knex.raw(getTimeQuery)
  }
  async getLatestPulses(): Promise<CodeClimbers.Pulse[] | undefined> {
    const res = await this.pulseDb.orderBy('created_at', 'desc').limit(10)
    return res
  }

  async createPulse(pulse: CodeClimbers.Pulse) {
    const res = await this.pulseDb.insert(pulse)
    return res
  }

  async createPulses(pulses: CodeClimbers.Pulse[]) {
    const res = await this.pulseDb.insert(pulses)
    Logger.log(`[pulse.repo]: created ${pulses.length} pulses`)
    return res
  }
}
