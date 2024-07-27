import launch from './src/server.js';

launch(
  Number.parseInt(process.env.CODECLIMBERS_CONFIG_WEBSOCKET_PORT ?? '6666'),
  process.env.CODECLIMBERS_CONFIG_FLAGSMITH_KEY ?? 'UCGxZG2rEpw3KyCwmDCaPR',
  process.env.CODECLIMBERS_FLAGSMITH_API_URL ?? 'https://edge.api.flagsmith.com/api/v1/',
)
