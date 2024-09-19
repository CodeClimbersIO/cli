process.env.CODECLIMBERS_SERVER_APP_CONTEXT = 'cli'

import { Command } from '@oclif/core'
import { getLocalApiKey } from '../../utils/localAuth.util'
import pc from 'picocolors'

export default class ApiKey extends Command {
  static description = 'Get your local api key'

  static examples = [
    `<%= config.bin %> <%= command.id %>

    apikey: <your-api-key>
`,
  ]

  static flags = {}

  async run(): Promise<void> {
    const apiKey = await getLocalApiKey(true)
    this.log(`
apikey:  ${pc.green(apiKey)}
    `)
  }
}
