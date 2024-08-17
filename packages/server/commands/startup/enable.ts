process.env.CODECLIMBERS_SERVER_APP_CONTEXT = 'cli'

import { Command } from '@oclif/core'
import { StartupServiceFactory } from '../..'

export default class Disable extends Command {
  static description = 'Disable starting codeclimbers on computer startup'

  static examples = [
    `<%= config.bin %> <%= command.id %>
codeclimbers startup enabled
`,
  ]

  static flags = {}

  async run(): Promise<void> {
    const startupService = StartupServiceFactory.buildStartupService()
    try {
      await startupService.enableStartup()
      this.log('codeclimbers startup enabled!')
    } catch (error) {
      console.log(error)
      this.log('codeclimbers already enabled')
    }
  }
}
