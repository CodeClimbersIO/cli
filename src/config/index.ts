import launch from './src/server.js';

launch(
  Number.parseInt(process.env.CONFIG_WEBSOCKET_PORT ?? '6666'),
  process.env.CONFIG_FLAGSMITH_KEY ?? '',
  Number.parseInt(process.env.PORT ?? '8000'),
)
