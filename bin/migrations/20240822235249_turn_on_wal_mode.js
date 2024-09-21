const SQL = `--sql
  PRAGMA journal_mode = wal;
`
exports.up = function (knex) {
  return knex.raw(SQL)
}

const DOWN_SQL = `--sql
  PRAGMA journal_mode = delete;
`
exports.down = function (knex) {
  return knex.raw(DOWN_SQL)
}
