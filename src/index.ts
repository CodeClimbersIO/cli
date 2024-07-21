import { bootstrap } from '../dist/server/src/main'
import { isCli } from '../dist/server/utils/environment.util'

// eslint-disable-next-line import/no-unresolved
export { run } from '@oclif/core'

if (!isCli()) {
  // run server if not in CLI context (i.e. dev mode on machine)
  bootstrap()
}
