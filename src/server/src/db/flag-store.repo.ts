import { Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import Flag = CodeClimbers.Flag
import { randomUUID } from 'node:crypto'

@Injectable()
export class FlagStoreRepo {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  tableName = 'flag-store'
  identityDb = this.knex<Flag>(this.tableName)

  async getIdentifier(): Promise<string> {
    const result = this.identityDb
      .select('value')
      .where('key', 'identifier')
      .first()
    const id = result[0]?.value
    if (id) {
      return id
    }
    const identifier = randomUUID();
    this.identityDb.insert([
      {
        value: identifier,
        key: 'identifier',
      },
    ])
    return identifier
  }
}
