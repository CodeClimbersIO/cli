const SQL = `--sql
  INSERT INTO accounts_user DEFAULT VALUES;
  
  INSERT INTO accounts_user_settings (user_id)
  VALUES ((SELECT last_insert_rowid()));
`
exports.up = function (knex) {
  return knex.raw(SQL)
}

exports.down = function () {}
