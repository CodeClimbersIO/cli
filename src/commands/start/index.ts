// eslint-disable-next-line import/no-unresolved
process.env.APP_CONTEXT = 'cli'
import { Args, Command } from '@oclif/core'
import { bootstrap } from '../../../dist/server/src/main'

export default class Start extends Command {
  static args = {
    port: Args.string({
      description: 'Custom port to run the server on',
      required: false,
    }),
  }

  static description = 'Starts the codeclimbers server on your machine'

  static examples = [`<%= config.bin %> <%= command.id %>`]

  async run(): Promise<void> {
    console.log('Run 1')
    const { args } = await this.parse(Start)
    console.log('Run 2')
    process.env.PORT = args.port || '14400' // number of minutes in a day times 10
    console.log('Run 3')
    bootstrap()
    console.log('Run 4')
  }
}
