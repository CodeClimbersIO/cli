module.exports = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './codeclimber.sqlite',
  },
  migrations: {
    directory: '../../bin/migrations',
    stub: 'migrations/example/stub.js',
  },
  seeds: {
    directory: '../../bin/seeds',
  },
}
