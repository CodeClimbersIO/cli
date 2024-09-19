import { InjectKnex, Knex } from 'nestjs-knex'

export class LocalDbRepo {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async query(query: string): Promise<any> {
    return this.knex.raw(query)
  }
}
