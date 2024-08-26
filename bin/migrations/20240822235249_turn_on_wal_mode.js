const SQL = `--sql
  PRAGMA journal_mode = wal;
`
exports.up = function (knex) {
  return knex.raw(SQL)
}

exports.down = function () {}
