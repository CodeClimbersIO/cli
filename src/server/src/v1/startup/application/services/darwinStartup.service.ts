import { exec } from 'child_process'
import { join } from 'path'
import * as fs from 'fs'
import { Injectable, Logger } from '@nestjs/common'
import { plist } from '../../../../assets/startup.plist'

const plistPath = join(
  process.env.HOME || '~/',
  'Library/LaunchAgents/io.codeclimbers.plist',
)

const writePlistFile = () => {
  fs.writeFileSync(plistPath, plist(), 'utf8')
}

@Injectable()
export class DarwinStartupService implements CodeClimbers.StartupService {
  async enableStartup() {
    const command = `launchctl bootstrap gui/$(id -u) ${plistPath}`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        Logger.error(`Error loading startup configuration: ${error}`)
        Logger.error(stderr)
        return
      }
      Logger.log(stdout)
      Logger.log('Node.js server startup configuration loaded')
    })
  }

  async disableStartup() {
    const command = `launchctl bootout gui/$(id -u) ${plistPath}`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        Logger.error(`Error unloading startup configuration: ${error}`)
        Logger.error(stderr)
        return
      }
      Logger.log(stdout)
      Logger.log('Node.js server startup configuration unloaded')
    })
  }

  // cleanly separate implementation code for each environment. If I'm working on windows, I see all the implementation around startup
  async launchAndEnableStartup() {
    writePlistFile()
    const command = `launchctl load ${plistPath}`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        Logger.error(`Error enabling startup: ${error}`)
        Logger.error(stderr)
        return
      }
      Logger.log(stdout)
      Logger.log('Node.js server enabled at startup')
    })
  }

  async closeAndDisableStartup() {
    const command = `launchctl unload ${plistPath}`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        Logger.error(`Error disabling startup: ${error}`)
        Logger.error(stderr)
        return
      }
      Logger.log(stdout)
      Logger.log('Node.js server disabled at startup')
    })
  }
}
