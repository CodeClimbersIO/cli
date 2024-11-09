// oclif command to get the latest 50 lines of error logs from the log file
import { Command, Flags } from '@oclif/core'
import path from 'node:path'
import fs from 'node:fs'
import { CODE_CLIMBER_META_DIR, ERROR_LOG_NAME } from '../../utils/node.util'

export default class Log extends Command {
  static description = 'Get the latest 50 lines of error logs'

  static flags = {
    lines: Flags.string({
      char: 'l',
      description: 'Number of lines to get',
      required: false,
    }),
  }

  async run() {
    const { flags } = await this.parse(Log)
    const lines = flags.lines || 50
    this.log(`Getting latest ${lines} lines of error logs...`)
    const errorLogPath = path.join(CODE_CLIMBER_META_DIR, ERROR_LOG_NAME)
    const errorLogContent = fs.readFileSync(errorLogPath, 'utf8')
    this.log(errorLogContent.split('\n').slice(-lines).join('\n'))
  }
}
