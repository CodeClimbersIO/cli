import dbUtil from '../utils/db.util'
import sqlUtil from '../utils/sql.util'

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

const updateUserSettings = (
  userId: number,
  settings: CodeClimbers.UserSettings,
) => {
  const query = dbUtil.db
    .updateTable('accounts_user_settings')
    .set(settings)
    .where('user_id', '=', userId)
    .returningAll()

  const sql = sqlUtil.sqlWithBindings(query.compile())
  return sql
}

export default {
  getCurrentUser,
  updateUserSettings,
}
