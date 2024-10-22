import { Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

@Injectable()
export class UserRepo {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getCurrentUser = async () => {
    // Example query
    const query = `
    SELECT *
    FROM accounts_user
    JOIN accounts_user_settings ON accounts_user.id = accounts_user_settings.user_id
    LIMIT 1
  `

    const [result] = await this.knex.raw<CodeClimbers.UserSettings[]>(query)
    return result
  }
}
