process.env.CODECLIMBERS_SERVER_APP_CONTEXT = 'cli'

import { Command } from '@oclif/core'
import { StartupServiceFactory } from '../..'

export default class Disable extends Command {
  static description = 'Disable starting codeclimbers on computer startup'

  static examples = [
    `<%= config.bin %> <%= command.id %>
codeclimbers startup disabled
`,
  ]

  static flags = {}

  async run(): Promise<void> {
    const startupService = StartupServiceFactory.buildStartupService()
    try {
      await startupService.disableStartup()
      this.log('codeclimbers startup disabled')
    } catch (error) {
      this.log('codeclimbers already disabled')
    }
  }
}
