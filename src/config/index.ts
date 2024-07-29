import launch from './src/server'

launch(
  Number.parseInt(process.env.CODECLIMBERS_CONFIG_WEBSOCKET_PORT ?? '6666'),
  process.env.CODECLIMBERS_CONFIG_FLAGSMITH_KEY ?? 'UCGxZG2rEpw3KyCwmDCaPR',
  process.env.CODECLIMBERS_FLAGSMITH_API ??
    'https://edge.api.flagsmith.com/api/v1/',
)
