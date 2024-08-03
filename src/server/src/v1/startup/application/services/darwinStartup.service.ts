import { exec } from 'child_process'
import { join } from 'path'
import * as fs from 'fs'
import { plist } from '../../../../assets/startup.plist'
import { Injectable } from '@nestjs/common'

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
    writePlistFile()
    const command = `launchctl enable gui/$(id -u)/io.codeclimbers.plist`
    return new Promise<void>((resolve, reject) => {
      exec(command, (error) => {
        if (error) reject(error)
        resolve()
      })
    })
  }

  async disableStartup() {
    const command = `launchctl disable gui/$(id -u)/io.codeclimbers.plist`
    return new Promise<void>((resolve, reject) => {
      exec(command, (error) => {
        if (error) reject(error)
        resolve()
      })
    })
  }

  // cleanly separate implementation code for each environment. If I'm working on windows, I see all the implementation around startup
  async launchAndEnableStartup() {
    writePlistFile()
    await this.enableStartup()
    const command = `launchctl bootstrap gui/$(id -u) ${plistPath}`
    return new Promise<void>((resolve, reject) => {
      exec(command, (error) => {
        if (error) reject(error)
        resolve()
      })
    })
  }

  async closeAndDisableStartup() {
    const command = `launchctl bootout gui/$(id -u) ${plistPath}`
    return new Promise<void>((resolve, reject) => {
      exec(command, (error) => {
        if (error) reject(error)
        resolve()
      })
    })
  }
}
