import * as path from 'node:path'
import * as os from 'node:os'
import * as fs from 'node:fs'
import { execSync } from 'node:child_process'

const commandPath = (command: string) => {
  const result = execSync(`which ${command}`).toString().trim()
  const dir = result.slice(0, -command.length - 1) // result is /usr/local/bin/codeclimbers, we need to remove codeclimbers
  return dir
}
export const BIN_PATH = commandPath('codeclimbers')
export const HOME_DIR = os.homedir()
export const CODE_CLIMBER_META_DIR = `${HOME_DIR}/.codeclimbers`
export const DB_PATH = path.join(CODE_CLIMBER_META_DIR, 'codeclimber.sqlite')
export const APP_DIST_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'app',
  'dist',
)
export const NODE_PATH = commandPath('node')

export const initDBDir = () => {
  if (!fs.existsSync(CODE_CLIMBER_META_DIR)) {
    fs.mkdirSync(CODE_CLIMBER_META_DIR, { recursive: true })
  }
  fs.chmodSync(CODE_CLIMBER_META_DIR, '755')
}
