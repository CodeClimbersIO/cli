import { BIN_PATH, HOME_DIR } from '../../utils/node.util'
import * as path from 'node:path'

export const plist = () => {
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
        
        <key>KeepAlive</key>
        <true/>

        <key>StandardOutPath</key>
        <string>${HOME_DIR}/.codeclimbers/log.out</string>
        <key>StandardErrorPath</key>
        <string>${HOME_DIR}/.codeclimbers/log.err</string>

      </dict>
    </plist>
  `
  } catch (error) {
    console.error(`Error creating plist declaration: ${error.message}`)
  }
}
