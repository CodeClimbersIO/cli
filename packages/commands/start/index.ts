// src/commands/start/index.ts
process.env.CODECLIMBERS_SERVER_APP_CONTEXT = 'cli'

import { StartupServiceFactory } from '../../server/src/v1/startup/startupService.factory'
import { Args, Command, Flags } from '@oclif/core'
// eslint-disable-next-line import/no-unresolved
import find from 'find-process'
import { bootstrap, SERVER_CONSTANTS } from '../../server'
import pc from 'picocolors'

import * as http from 'http'

const SERVER_URL = 'http://localhost:14400'
const MAX_ATTEMPTS = 10
const POLL_INTERVAL = 3000 // 3 seconds

function checkServerAvailability(): Promise<boolean> {
  return new Promise((resolve) => {
    http
      .get(SERVER_URL, (res) => {
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

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const isAvailable = await checkServerAvailability()

      if (isAvailable) {
        return true
      }

      this.log('  🚀...')
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
    }

    this.log(
      pc.red(`      
  It seems the server is having trouble starting. Run the command 

  ${pc.white('cat ~/.codeclimbers/codeclimbers_error.log')} 
  
  to investigate the issue further
      `),
    )
    return false
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
    const appUrl = `http://localhost:${process.env.CODECLIMBERS_SERVER_PORT}`
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
