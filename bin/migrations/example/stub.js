const SQL = `--sql

`
exports.up = function (knex) {
  return knex.raw(SQL)
}

exports.down = function () {}
