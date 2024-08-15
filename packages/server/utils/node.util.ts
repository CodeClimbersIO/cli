import * as path from 'node:path'
import * as os from 'node:os'
import * as fs from 'node:fs'
import { execSync } from 'node:child_process'

export const BIN_PATH = path.join(__dirname, '..', '..', '..', '..', 'bin')
export const HOME_DIR = os.homedir()
export const CODE_CLIMBER_META_DIR = `${HOME_DIR}/.codeclimbers`
export const DB_PATH = path.join(CODE_CLIMBER_META_DIR, 'codeclimber.sqlite')
export const DIST_PATH = path.join(__dirname, '..', '..', '..', 'dist')
export const APP_PATH = path.join(DIST_PATH, 'app')
export const NODE_PATH = function () {
  const result = execSync('which node').toString().trim()
  const dir = result.slice(0, -5) // result is /usr/local/bin/node, we need to remove node
  return dir
}

export const initDBDir = () => {
  if (!fs.existsSync(CODE_CLIMBER_META_DIR)) {
    fs.mkdirSync(CODE_CLIMBER_META_DIR, { recursive: true })
  }
  fs.chmodSync(CODE_CLIMBER_META_DIR, '755')
}
