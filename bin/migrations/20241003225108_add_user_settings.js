const SQL = `--sql
  CREATE TABLE IF NOT EXISTS accounts_user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    weekly_report_type VARCHAR(255) NOT NULL DEFAULT 'none',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES accounts_user (id) ON DELETE CASCADE
  );
`
exports.up = function (knex) {
  return knex.raw(SQL)
}

exports.down = function () {
  return
  // return knex.raw(`--sql
  //   DROP TABLE accounts_user_setting;
  // `)
}
