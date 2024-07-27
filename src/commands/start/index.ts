// src/commands/start/index.ts
process.env.APP_CONTEXT = 'cli'

import { Args, Command } from '@oclif/core'
// eslint-disable-next-line import/no-unresolved
import { bootstrap } from 'server'

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
←↘↘↘↖↖↖↖↖↘↘↖ ↖↘↘↘ ↘↓↓↖ ↖↖↖↖↖↖↖↖↖↖↖↖↖↖  ↖↘↓↖ ↖↖↖↖      ↖↖↖↖↖←  ↖↖↖↖←↖↖↖ ↖↖←↖↖↖
↖↗↓↗↓↖↖↖↖↖↖↖↖↖↖↖↖↖↖←↖↓↗↓↓↖    ↖↘↘↘↖    ↖↖↖← ↖↘↓↘ ↘↘↘↘ ↘↘↘↘↘↘↘↘↓↘↓↘↘↖← ↖↘↘↓↘↘↘↘↖↖ ↖↖↘↘↘↘↘↖↖↖↖↘↘↘↘→→↘↘↓↘↘↓↘↘↖↖
↖↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↖    ↖↘↘↘↖         ↖↘↘↘ ↘↘↘↘ ↓↘↘↓ ↓↘↘↘↘ ↓↘↓↖ ↖↘↘↖  ↘↘↘↘↘↘↘↘↓↘↘↘↘↘↘↘↘↘↘↖  ←↘↘↘↘↘↘↓↓
↖↘↘↘↘↖↖←↖↖↖↖↖↖↖↖↖↖↖↖↖↘↘↘↘↖    ↖↖↘↘↖↖  ←↖↖↖↖ ↖↘↘↘ ↘↘↘↘ ↓↘↘↓ ↓↓↘↘↓ ↓↘↓↖ ↖↘↘↖  ↘↘↘↘↘↘↘↘↘↓↘↘↘↘↓↘↘↘↘   ↖↘↘↘↘↘↘↘↘↖↖
↖↘↘↘↘↖               ↘↘↘↘↖     ↖↖↘↘↘↘↘↘↘↓↖↖ ↖↘↘↘ ↘↘↘↘ ↓↘↘↘ ↘↓↘↘↖ ↖↘↓↖ ↖↘↘↖↖↖↓↘↖↖↖↖↓↘↘↘↘↘↘↓↘↘↘↘↓   ↖↘↘↓↘↘↘↘↘↖↖
↖↖↖↖↖↖               ↖↖↖↖↖       ←↖↖↖↖↖↖↖   ↖↖↖↖ ↖↖↖↖ ↖↖↖↖ ↖↖↖↖  ↖↖↖↖ ↖↖↖↖↖↖↖↖↖   ↖↖↖↖↖↖↖↖ ↖←↖↖    ↖↖↖↖↖↖↖↖

Code climbers has started and will begin tracking your activity based on the sources you add.
Visit https://codeclimbers.local to configure your sources
`

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
    const { args } = await this.parse(Start)
    process.env.PORT = args.port || '14400' // number of minutes in a day times 10
    this.log(WELCOME_MESSAGE)
    bootstrap()
  }
}
