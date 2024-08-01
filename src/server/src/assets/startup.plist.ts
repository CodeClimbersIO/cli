import { Logger } from '@nestjs/common'
import { BIN_PATH } from '../../utils/node.util'
import * as path from 'node:path'

export const plist = () => {
  Logger.log('Current working directory:', process.cwd())
  try {
    const bashScriptPath = path.join(BIN_PATH, 'run.sh')
    return `
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
      
        <key>Label</key>
        <string>io.codeclimbers.plist</string>

        <key>ProgramArguments</key>
        <array>
          <string>/bin/bash</string>
          <string>${bashScriptPath}</string>
        </array>
        
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <true/>

        <key>StandardOutPath</key>
        <string>/Users/paulhovley/.codeclimbers/log.out</string>
        <key>StandardErrorPath</key>
        <string>/Users/paulhovley/.codeclimbers/log.err</string>

      </dict>
    </plist>
  `
  } catch (error) {
    console.error(`Error creating plist declaration: ${error.message}`)
  }
}
