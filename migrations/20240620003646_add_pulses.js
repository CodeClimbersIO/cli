const SQL = `--sql
  CREATE TABLE activities_pulse (
    id SERIAL PRIMARY KEY,
    user_id          text not null,
    entity           text not null,
    type             varchar(255),
    category         varchar(255),
    project          text,
    branch           text,
    language         text,
    is_write         boolean,
    editor           text,
    operating_system text,
    machine          text,
    user_agent       varchar(255),
    time             timestamp(3),
    hash             varchar(17),
    origin           varchar(255),
    origin_id        varchar(255),
    created_at       timestamp(3),
    description      text
  );
`
exports.up = function (knex) {
  return knex.raw(SQL)
}

exports.down = function () {}
