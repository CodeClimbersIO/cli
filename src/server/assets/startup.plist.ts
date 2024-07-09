import AppLogger from '../utils/appLogger.util'

export const plist = () => {
  AppLogger.info('Current working directory:', process.cwd())
  const dir = process.cwd()
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>Label</key>
        <string>io.codeclimbers.plist</string>

        <key>ProgramArguments</key>
        <array>
          <string>./${dir}/bin/run.js</string>
        </array>
        
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <true/>

        <key>StandardOutPath</key>
        <string>/Users/paulhovley/nodeserver.out</string>
        <key>StandardErrorPath</key>
        <string>/Users/paulhovley/nodeserver.err</string>

      </dict>
    </plist>
  `
}
