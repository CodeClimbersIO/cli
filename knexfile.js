module.exports = {
  client: 'sqlite3',
  useNullAsDefault: true,
  directory: './bin/migrations',
  connection: {
    filename: './codeclimber.sqlite',
  },
  migrations: {
    stub: 'migrations/example/stub.js',
  },
}
