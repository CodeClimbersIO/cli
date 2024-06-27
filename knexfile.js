module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./codeclimber.sqlite",
  },
  migrations: {
    stub: "migrations/example/stub.js",
  },
};
