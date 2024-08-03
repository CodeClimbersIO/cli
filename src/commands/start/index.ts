// src/commands/start/index.ts
process.env.APP_CONTEXT = 'cli'

import { StartupServiceFactory } from '../../server/src/v1/startup/application/services/startupService.factory'
import { Args, Command, Flags } from '@oclif/core'
// eslint-disable-next-line import/no-unresolved
import find from 'find-process'
import { bootstrap, SERVER_CONSTANTS } from '../../server'

// Used https://www.asciiart.eu/image-to-ascii to generate the ASCII art
const WELCOME_MESSAGE = `
Welcome to Code Climbers!

↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖←↖↖↖↖↖↖
↖↘↘↘↘↘↘↘↘↘↘↘↓↘↘↘↘↘↘↘↘↘↘↘↘↖         ←↖↖↖                       ↖↖
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↖     ↖↖↖←↘↓↓↓↖↖↖                  ←↖↘↑↓↖
↖↘↘↘↘↖↖↖↖↖↖↖↖↖↖↖↖↖↖↖←↘↘↘↘↖    ↖↖↘↘↘↖  ↖↖↘↘↖  ↖↖↖↖↖←↖    ↖↖↖↖↖↘↘↘↘↖ ↖↖↖↖↖↖↖↘
↖↘↘↘↖↖               ↘↘↘↘↖    ↖↘↘↘↑    ↖↓↘↖ ↖↖↓←↖↖↖↖↖↖↖↖↖↘↘↘↘↘↘↘↘↖↖←↘     ↖↖
↖↘↘↘↖                ↘↘↘↘↖    ↖↘↘↘↑         ↓↘↘↓  ↖↘↘↘↓↘↘↘↘    ↘↘↘↘↘↘↘↘↘↘↘↘↘↖
↓↓↓↖↖←↖↖↖↖↖↖↖↖↖↖↖↖↖↖↓↓↓↓     ↖↖↘↘↑↓↖ ↖↖↘↓↓ ↓↘↘↓ ↖↖↘↘→→→↘↘↘↘   ↘↘↘↘↘↘↘↘↘↘↘↖↘↖
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↖     ←←↘↘↘↘↘↘↘↘↖↖ ↖↖↘↑↑↑↘↘↖↖ ←↓↘↘↘↘↘↘↘↘↘→↘↘↘↘
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘←       ↖↖↖←↖↖↖↖    ↖↖↖↖↖↖↖    ↖↖↖↖↖↖↖↖↖  ↖↖↖↖↖↖↖↖↖
↖↘↘↘↘↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↘↘↘↖
↖↘↘↘↓↖              ↖↘↘↘↘↖         ↖↖←↖     ↖↖↖  ↖↖↖↖                 ↖↖←
↖↗↓↗↓                ↓↗↓↓↖      ←←←↘↘↘↘↖←↖  ↖↘↘→ ↘↘↘←                 ↖↘↓↖
←↘↘↘↖↖↖↖↖↘↘↖ ↖↘↘↘ ↘↓↓↖ ↖↖↖    ↖↖↖↖↖↖↖  ↖↘↓↖ ↖↖↖↖      ↖↖↖↖↖←  ↖↖↖↖←↖↖↖ ↖↖←↖↖↖
↖↗↓↗↓↖↖↖↖↖↖↖↖↖↖↖↖↖↖←↖↓↗↓↓↖    ↖↘↘↘↖    ↖↖↖← ↖↘↓↘ ↘↘↘↘ ↘↘↘↘↘↘↘↘↓↘↓↘↘↖← ↖↘↘↓↘↘↘↘↖↖ ↖↖↘↘↘↘↘↖↖↖↖↘↘↘↘→→↘↘↓↘↘↓↘↘↖↖
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↖    ↖↘↘↘↖         ↖↘↘↘ ↘↘↘↘ ↓↘↘↓ ↓↘↘↘↘ ↓↘↓↖ ↖↘↘↖  ↘↘↘↘↘↘↘↘↓   ↘↘↘↘↘↘↘↘   ←↘↘↘↘
↖↘↘↘↘↖↖←↖↖↖↖↖↖↖↖↖↖↖↖↖↘↘↘↘↖    ↖↖↘↘↖↖  ←↖↖↖↖ ↖↘↘↘ ↘↘↘↘ ↓↘↘↓ ↓↓↘↘↓ ↓↘↓↖ ↖↘↘↖  ↘↘↘↘↘↘↘↘↘↓↘↘↘↘↓↘↘↘↘     ↘↘↘↘↘↘↖↖
↖↘↘↘↘↖               ↘↘↘↘↖     ↖↖↘↘↘↘↘↘↘↓↖↖ ↖↘↘↘ ↘↘↘↘ ↓↘↘↘ ↘↓↘↘↖ ↖↘↓↖ ↖↘↘↖↖↖↓↘↖↖↖↖↓↘↘↘   ↘↓↘↘↘↘↓        ↘↘↖↖
↖↖↖↖↖↖               ↖↖↖↖↖       ←↖↖↖↖↖↖↖   ↖↖↖↖ ↖↖↖↖ ↖↖↖↖ ↖↖↖↖  ↖↖↖↖ ↖↖↖↖↖↖↖↖↖   ↖↖↖↖↖↖↖↖ ↖←↖↖    ↖↖↖↖↖↖↖↖

Code climbers has started and will begin tracking your activity based on the sources you add.
Visit http://localhost:14400 to configure your sources
`

export default class Start extends Command {
  static DEFAULT_PORT = String(14_400) // number of minutes in a day times 10
  static args = {
    firstArg: Args.string({
      description: 'arg to run the server',
      required: false,
    }),
  }

  static description = 'Starts the codeclimbers server on your machine'

  static examples = [`<%= config.bin %> <%= command.id %>`]
  static flags = {
    port: Flags.string({
      char: 'p',
      description: 'Custom port to run the server on',
      required: false,
    }),
  }

  async run(): Promise<void> {
    const [codeclimbersInstance] = await find(
      'name',
      SERVER_CONSTANTS.PROCESS_NAME,
    )

    if (codeclimbersInstance) {
      return this.error(
        `Code climber server is already running - PID ${codeclimbersInstance.pid} `,
      )
    }

    const { args, flags } = await this.parse(Start)
    process.env.PORT = flags.port || Start.DEFAULT_PORT

    const [runningInstance] = await find('port', Number(process.env.PORT))

    if (runningInstance) {
      return this.error(
        `A server (${runningInstance.name}) is already running on port ${process.env.PORT} with process id ${runningInstance.pid}`,
      )
    }

    this.log(WELCOME_MESSAGE)
    const startupService = StartupServiceFactory.buildStartupService()
    if (args.firstArg !== 'server') {
      await startupService.launchAndEnableStartup()
    }
    if (args.firstArg === 'server') {
      await bootstrap()
    }
  }
}
