// oclif command to get the latest 50 lines of error logs from the log file
import { Command, Flags } from '@oclif/core'
import path from 'node:path'
import fs from 'node:fs'
import { CODE_CLIMBER_META_DIR, LOG_NAME } from '../../utils/node.util'

export default class LogOut extends Command {
  static description = 'Get the latest 50 lines of error logs'

  static flags = {
    lines: Flags.string({
      char: 'l',
      description: 'Number of lines to get',
      required: false,
    }),
  }

  async run() {
    const { flags } = await this.parse(LogOut)
    const lines = flags.lines || 50
    this.log(`Getting latest ${lines} lines of logs...`)
    const logPath = path.join(CODE_CLIMBER_META_DIR, LOG_NAME)
    const logContent = fs.readFileSync(logPath, 'utf8')
    this.log(logContent.split('\n').slice(-lines).join('\n'))
  }
}
