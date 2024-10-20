import { db, sqlWithBindings } from '../../utils/db.util'

const getCurrentUser = () => {
  // Example query
  const query = `
    SELECT *
    FROM accounts_user
    JOIN accounts_user_settings ON accounts_user.id = accounts_user_settings.user_id
    LIMIT 1
  `
  return query
}

const updateUser = (userId: number, user: Partial<CodeClimbers.UserDB>) => {
  const query = db
    .updateTable('accounts_user')
    .set(user)
    .where('id', '=', userId)
    .returningAll()

  const sql = sqlWithBindings(query.compile())
  return sql
}

const updateUserSettings = (
  userId: number,
  settings: Partial<CodeClimbers.UserSettingsDB>,
) => {
  const query = db
    .updateTable('accounts_user_settings')
    .set(settings)
    .where('user_id', '=', userId)
    .returningAll()

  const sql = sqlWithBindings(query.compile())
  return sql
}

export { getCurrentUser, updateUser, updateUserSettings }
