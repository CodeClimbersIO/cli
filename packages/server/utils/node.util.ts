import * as path from 'node:path'
import * as os from 'node:os'
import * as fs from 'node:fs'

export const BIN_PATH = path.join(__dirname, '..', '..', '..', 'bin')
export const HOME_DIR = os.homedir()
export const DB_DIR = `${HOME_DIR}/.codeclimbers`
export const DB_PATH = path.join(DB_DIR, 'codeclimber.sqlite')
export const DIST_PATH = path.join(__dirname, '..', '..', '..', 'dist')
export const APP_PATH = path.join(DIST_PATH, 'app')

export const initDBDir = () => {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true })
  }
  fs.chmodSync(DB_DIR, '755')
}
