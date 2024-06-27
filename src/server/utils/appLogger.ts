import * as bunyan from 'bunyan'
import { Writable } from 'stream'

interface LogRecord {
  name: string
  hostname: string
  pid: number
  time: string
  level: number
  msg: string
  v: number
}

const debugStream = new Writable({
  objectMode: true, // This is crucial for handling objects
  write(
    log: LogRecord,
    _: string,
    callback: (error?: Error | null) => void,
  ): void {
    console.log(`\x1b[32mCodeClimbers Log:\x1b[0m \x1b[34m${log.msg}\x1b[0m`)
    callback()
  },
})
const AppLogger = bunyan.createLogger({
  name: 'codeclimber',
  streams: [
    {
      level: process.env.NODE_ENV === 'development' ? 'info' : 'debug',
      type: 'raw',
      stream: debugStream,
    },
  ],
})
export default AppLogger
