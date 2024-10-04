const SQL = `--sql
  CREATE TABLE accounts_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    email             varchar(255) UNIQUE,
    first_name        varchar(255),
    last_name         varchar(255),
    avatar_url        varchar(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`
exports.up = function (knex) {
  return knex.raw(SQL)
}

exports.down = function (knex) {
  return
//   return knex.raw(`--sql
//    DROP TABLE accounts_user;
// `)
}
