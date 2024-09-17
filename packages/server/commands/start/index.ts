process.env.CODECLIMBERS_SERVER_APP_CONTEXT = 'cli'

import { Args, Command, Flags } from '@oclif/core'
// eslint-disable-next-line import/no-unresolved
import find from 'find-process'
import pc from 'picocolors'

import http from 'http'
import { StartupServiceFactory } from '../../src/v1/startup/startupService.factory'
import { bootstrap } from '../../src/main'
import { PROCESS_NAME } from '../../utils/constants'
import { START_ERR_LOG_MESSAGE } from '../../utils/node.util'

const MAX_ATTEMPTS = 10
const POLL_INTERVAL = 3000 // 3 seconds

function checkServerAvailability(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        res.resume() // Consume response data to free up memory
        const { statusCode } = res
        if (!statusCode) {
          resolve(false)
          return
        }
        resolve(statusCode >= 200 && statusCode < 300)
      })
      .on('error', () => {
        resolve(false)
      })
  })
}

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

  async waitForServer(): Promise<boolean> {
    this.log('  Starting server, please wait...')
    this.log('')
    const SERVER_URL = `http://localhost:${process.env.CODECLIMBERS_SERVER_PORT}`

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const isAvailable = await checkServerAvailability(SERVER_URL)

      if (isAvailable) {
        return true
      }

      this.log('  🚀...')
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
    }

    this.log(START_ERR_LOG_MESSAGE)
    return false
  }

  async run(): Promise<void> {
    const [codeclimbersInstance] = await find('name', PROCESS_NAME)

    if (codeclimbersInstance) {
      return this.error(
        `Code climber server is already running - PID ${codeclimbersInstance.pid} `,
      )
    }

    const { args, flags } = await this.parse(Start)
    process.env.CODECLIMBERS_SERVER_PORT = flags.port || Start.DEFAULT_PORT

    const [runningInstance] = await find(
      'port',
      Number(process.env.CODECLIMBERS_SERVER_PORT),
    )

    if (runningInstance) {
      return this.error(
        `A server (${runningInstance.name}) is already running on port ${process.env.CODECLIMBERS_SERVER_PORT} with process id ${runningInstance.pid}`,
      )
    }
    const appUrl = `https://codeclimbers.io`
    const WELCOME_LOGO = pc.cyan(`
  @@@@@@@@@@@@@@@@@@@            
  @@@@@@@@@@@@@@@@@@@            
  @@@             @@@            
  @@@             @@@            
                                  
  @@@@@@@@@@@@@@@@@@@            
  @@@@@@@@@@@@@@@@@@@            
  @@@             @@@            
  @@@             @@@            
                                  
  @@@@@@@@@@@@@@@@@@@            
  @@@@@@@@@@@@@@@@@@@            
  @@@             @@@            
  @@@             @@@            

  Welcome to CodeClimbers!                                                                                                                                    
      `)

    const WELCOME_MESSAGE = pc.white(`
  🎉 CodeClimbers has started!
  🎉 Visit ${pc.cyan(appUrl)} to begin  
      `)
    this.log(WELCOME_LOGO)

    const startupService = StartupServiceFactory.buildStartupService()
    if (args.firstArg !== 'server') {
      await startupService.launchAndEnableStartup()
    }
    if (args.firstArg === 'server') {
      await bootstrap()
    }
    const serverAlive = await this.waitForServer()
    if (serverAlive) this.log(WELCOME_MESSAGE)
  }
}
