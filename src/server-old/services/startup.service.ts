import { exec } from 'child_process'
import { plist } from '../assets/startup.plist'
import { join } from 'path'
import * as fs from 'fs'
import AppLogger from '../utils/appLogger.util'

const plistPath = join(
  process.env.HOME || '~/',
  'Library/LaunchAgents/io.codeclimbers.plist',
)

const writePlistFile = () => {
  fs.writeFileSync(plistPath, plist(), 'utf8')
}

const enableStartup = () => {
  const command = `launchctl bootstrap gui/$(id -u) ${plistPath}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      AppLogger.error(`Error loading startup configuration: ${error}`)
      AppLogger.error(stderr)
      return
    }
    AppLogger.info(stdout)
    AppLogger.info('Node.js server startup configuration loaded')
  })
}

const launchAndEnableStartup = () => {
  writePlistFile()
  const command = `launchctl load ${plistPath}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      AppLogger.error(`Error enabling startup: ${error}`)
      AppLogger.error(stderr)
      return
    }
    AppLogger.info(stdout)
    AppLogger.info('Node.js server enabled at startup')
  })
}

const disableStartup = () => {
  const command = `launchctl bootout gui/$(id -u) ${plistPath}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      AppLogger.error(`Error unloading startup configuration: ${error}`)
      AppLogger.error(stderr)
      return
    }
    AppLogger.info(stdout)
    AppLogger.info('Node.js server startup configuration unloaded')
  })
}

const closeAndDisableStartup = () => {
  const command = `launchctl unload ${plistPath}`
  exec(command, (error, stdout, stderr) => {
    if (error) {
      AppLogger.error(`Error disabling startup: ${error}`)
      AppLogger.error(stderr)
      return
    }
    AppLogger.info(stdout)
    AppLogger.info('Node.js server disabled at startup')
  })
}

export default {
  enableStartup,
  launchAndEnableStartup,
  disableStartup,
  closeAndDisableStartup,
}
