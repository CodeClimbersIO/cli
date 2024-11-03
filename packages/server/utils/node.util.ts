import * as path from 'node:path'
import * as os from 'node:os'
import * as fs from 'node:fs'
import pc from 'picocolors'
import { Logger } from '@nestjs/common'
import { isProd, isTest } from './environment.util'
import { execSync } from 'node:child_process'

const EMULATE_ONBOARDING = process.env.EMULATE_ONBOARDING
const dbName = EMULATE_ONBOARDING
  ? 'codeclimber.onboarding.sqlite'
  : 'codeclimber.sqlite'

const areWeInDist = () => {
  // returns if part of our path is in the dist folder
  return __dirname.includes('dist')
}

interface INodeUtil {
  PROJECT_ROOT: string
  BIN_PATH: string
  START_ERR_LOG_MESSAGE: string
  HOME_DIR: string
  CODE_CLIMBER_META_DIR: string
  DB_PATH: string
  APP_DIST_PATH: string
  CODE_CLIMBER_INI_PATH: string
  NODE_PATH: () => string
  initDBDir: () => void
}

abstract class BaseNodeUtil implements INodeUtil {
  PROJECT_ROOT = areWeInDist() // we have to go up one more level because we're in the dist folder
    ? path.join(__dirname, '..', '..', '..', '..')
    : path.join(__dirname, '..', '..', '..')
  BIN_PATH = path.join(this.PROJECT_ROOT, 'bin')
  HOME_DIR = os.homedir()

  abstract START_ERR_LOG_MESSAGE: string
  abstract CODE_CLIMBER_META_DIR: string
  abstract DB_PATH: string
  APP_DIST_PATH = path.join(this.PROJECT_ROOT, 'packages', 'app', 'dist')
  abstract NODE_PATH(): string
  abstract CODE_CLIMBER_INI_PATH: string

  initDBDir = (): void => {
    if (!fs.existsSync(this.CODE_CLIMBER_META_DIR)) {
      fs.mkdirSync(this.CODE_CLIMBER_META_DIR, { recursive: true })
    }
    fs.chmodSync(this.CODE_CLIMBER_META_DIR, '755')
  }
}

class DarwinNodeUtil extends BaseNodeUtil {
  CODE_CLIMBER_META_DIR = `${this.HOME_DIR}/.codeclimbers`
  CODE_CLIMBER_INI_PATH = path.join(
    this.CODE_CLIMBER_META_DIR,
    isTest() ? '.codeclimbers.test.cfg' : '.codeclimbers.cfg',
  )
  DB_PATH = path.join(
    this.CODE_CLIMBER_META_DIR,
    isTest() ? 'codeclimber.test.sqlite' : dbName,
  )
  START_ERR_LOG_MESSAGE = pc.red(`      
    It seems the server is having trouble starting. Run the command 
  
    ${pc.white('cat ' + this.CODE_CLIMBER_META_DIR + '/codeclimbers_error.log')} 
    
    to investigate the issue further. You can also refer to https://github.com/CodeClimbersIO/cli/blob/release/docs/Troubleshooting.md or message us on our Discord
        `)

  NODE_PATH = (): string => {
    const result = execSync('which node').toString().trim()
    return result.slice(0, -5) // result is /usr/local/bin/node, we need to remove 'node'
  }
}

class WindowsNodeUtil extends BaseNodeUtil {
  CODE_CLIMBER_META_DIR = `${this.HOME_DIR}\\.codeclimbers`
  CODE_CLIMBER_INI_PATH = path.join(
    this.CODE_CLIMBER_META_DIR,
    isTest() ? '.codeclimbers.test.cfg' : '.codeclimbers.cfg',
  )
  DB_PATH = path.join(
    this.CODE_CLIMBER_META_DIR,
    isTest() ? 'codeclimber.test.sqlite' : 'codeclimber.sqlite',
  )
  START_ERR_LOG_MESSAGE: string = pc.red(`      
    It seems the server is having trouble starting. Run the command in cmd (not powershell)
  
    ${pc.white('more ' + this.CODE_CLIMBER_META_DIR + '\\codeclimbers.err.log')} 
    
    to investigate the issue further. You can also refer to https://github.com/CodeClimbersIO/cli/blob/release/docs/Troubleshooting.md or message us on our Discord
        `)

  NODE_PATH = (): string => {
    const result = execSync('where node').toString().trim()
    return path.dirname(result.split('\n')[0])
  }
}

class LinuxNodeUtil extends BaseNodeUtil {
  CODE_CLIMBER_META_DIR = `${this.HOME_DIR}/.codeclimbers`
  CODE_CLIMBER_INI_PATH = path.join(
    this.CODE_CLIMBER_META_DIR,
    isTest() ? '.codeclimbers.test.cfg' : '.codeclimbers.cfg',
  )
  DB_PATH = path.join(
    this.CODE_CLIMBER_META_DIR,
    isTest() ? 'codeclimber.test.sqlite' : 'codeclimber.sqlite',
  )
  START_ERR_LOG_MESSAGE = pc.red(`      
    It seems the server is having trouble starting. Run the command 
  
    ${pc.white('cat ' + this.CODE_CLIMBER_META_DIR + '/codeclimbers_error.log')} 
    
    to investigate the issue further
        `)
  NODE_PATH = (): string => {
    const result = execSync('which node').toString().trim()
    return path.dirname(result)
  }
}

const createNodeUtil = (): INodeUtil => {
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
export const PROJECT_ROOT = nodeUtil.PROJECT_ROOT
export const BIN_PATH = nodeUtil.BIN_PATH
export const START_ERR_LOG_MESSAGE = nodeUtil.START_ERR_LOG_MESSAGE
export const HOME_DIR = nodeUtil.HOME_DIR
export const CODE_CLIMBER_META_DIR = nodeUtil.CODE_CLIMBER_META_DIR
export const DB_PATH = nodeUtil.DB_PATH
export const APP_DIST_PATH = nodeUtil.APP_DIST_PATH
export const CODE_CLIMBER_INI_PATH = nodeUtil.CODE_CLIMBER_INI_PATH
export const NODE_PATH = nodeUtil.NODE_PATH
export const initDBDir = nodeUtil.initDBDir

const logPaths = () => {
  if (isProd()) return
  if (process.env.NODE_ENV === 'test') return
  Logger.debug(NODE_PATH(), 'NODE_PATH')
  Logger.debug(PROJECT_ROOT, 'PROJECT_ROOT')
  Logger.debug(BIN_PATH, 'BIN_PATH')
  Logger.debug(CODE_CLIMBER_META_DIR, 'CODE_CLIMBER_META_DIR')
  Logger.debug(DB_PATH, 'DB_PATH')
  Logger.debug(HOME_DIR, 'HOME_DIR')
  Logger.debug(APP_DIST_PATH, 'APP_DIST_PATH')
  Logger.debug(CODE_CLIMBER_INI_PATH, 'CODE_CLIMBER_INI_PATH')
}

logPaths()

export { nodeUtil }
