import dbUtil from '../utils/db.util'

const getLatestPulses = () => {
  // Example query
  const query = dbUtil.db
    .selectFrom('activities_pulse')
    .selectAll()
    .orderBy('id', 'desc')
    .limit(10)

  // Get the SQL string
  const sql = query.compile()

  return dbUtil.sqlWithBindings(sql)
}

const getAllPulses = () => {
  const query = dbUtil.db
    .selectFrom('activities_pulse')
    .selectAll()
    .orderBy('created_at', 'desc')
  const sql = query.compile()

  return dbUtil.sqlWithBindings(sql)
}

export default {
  getAllPulses,
  getLatestPulses,
}
