import * as path from 'node:path'
import * as os from 'node:os'
import * as fs from 'node:fs'
import { Logger } from '@nestjs/common'
import { isCli, isProd } from './environment.util'
import { execSync } from 'node:child_process'

const areWeInDist = isCli() || isProd()

interface INodeUtil {
  BIN_PATH: string
  HOME_DIR: string
  CODE_CLIMBER_META_DIR: string
  DB_PATH: string
  APP_DIST_PATH: string
  NODE_PATH: () => string
  initDBDir: () => void
}

abstract class BaseNodeUtil implements INodeUtil {
  BIN_PATH = areWeInDist // we have to go up one more level because we're in the dist folder
    ? path.join(__dirname, '..', '..', '..', '..', '..', 'bin')
    : path.join(__dirname, '..', '..', '..', '..', 'bin')
  HOME_DIR = os.homedir()
  abstract CODE_CLIMBER_META_DIR: string
  abstract DB_PATH: string
  APP_DIST_PATH = areWeInDist
    ? path.join(__dirname, '..', '..', '..', '..', 'app', 'dist')
    : path.join(__dirname, '..', '..', '..', 'app', 'dist')

  abstract NODE_PATH(): string

  initDBDir = (): void => {
    if (!fs.existsSync(this.CODE_CLIMBER_META_DIR)) {
      fs.mkdirSync(this.CODE_CLIMBER_META_DIR, { recursive: true })
    }
    fs.chmodSync(this.CODE_CLIMBER_META_DIR, '755')
  }
}

class DarwinNodeUtil extends BaseNodeUtil {
  CODE_CLIMBER_META_DIR = `${this.HOME_DIR}/.codeclimbers`
  DB_PATH = path.join(this.CODE_CLIMBER_META_DIR, 'codeclimber.sqlite')

  NODE_PATH = (): string => {
    const result = execSync('which node').toString().trim()
    return result.slice(0, -5) // result is /usr/local/bin/node, we need to remove 'node'
  }
}

class WindowsNodeUtil extends BaseNodeUtil {
  CODE_CLIMBER_META_DIR = `${this.HOME_DIR}\\AppData\\Local\\codeclimbers`
  DB_PATH = path.join(this.CODE_CLIMBER_META_DIR, 'codeclimber.sqlite')

  NODE_PATH = (): string => {
    const result = execSync('where node').toString().trim()
    return path.dirname(result.split('\n')[0])
  }
}

class LinuxNodeUtil extends BaseNodeUtil {
  CODE_CLIMBER_META_DIR = `${this.HOME_DIR}/.codeclimbers`
  DB_PATH = path.join(this.CODE_CLIMBER_META_DIR, 'codeclimber.sqlite')

  NODE_PATH = (): string => {
    const result = execSync('which node').toString().trim()
    return path.dirname(result)
  }
}

function createNodeUtil(): INodeUtil {
  switch (process.platform) {
    case 'darwin':
      return new DarwinNodeUtil()
    case 'win32':
      return new WindowsNodeUtil()
    case 'linux':
      return new LinuxNodeUtil()
    default:
      throw new Error(`Unsupported platform: ${process.platform}`)
  }
}

const nodeUtil = createNodeUtil()

// Named exports
export const BIN_PATH = nodeUtil.BIN_PATH
export const HOME_DIR = nodeUtil.HOME_DIR
export const CODE_CLIMBER_META_DIR = nodeUtil.CODE_CLIMBER_META_DIR
export const DB_PATH = nodeUtil.DB_PATH
export const APP_DIST_PATH = nodeUtil.APP_DIST_PATH
export const NODE_PATH = nodeUtil.NODE_PATH
export const initDBDir = nodeUtil.initDBDir

const logPaths = () => {
  if (isProd()) return
  Logger.debug('NODE_PATH', NODE_PATH)
  Logger.debug('BIN_PATH', BIN_PATH)
  Logger.debug('CODE_CLIMBER_META_DIR', CODE_CLIMBER_META_DIR)
  Logger.debug('DB_PATH', DB_PATH)
  Logger.debug('HOME_DIR', HOME_DIR)
  Logger.debug('APP_DIST_PATH', APP_DIST_PATH)
}
logPaths()

// Default export
export default nodeUtil
