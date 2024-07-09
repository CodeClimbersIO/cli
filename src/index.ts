import { startServer } from './server/server'

// eslint-disable-next-line import/no-unresolved
export { run } from '@oclif/core'

if (process.env.COMMAND_CONTEXT !== 'cli') {
  // run server if not in CLI context (i.e. dev mode on machine)
  startServer()
}
