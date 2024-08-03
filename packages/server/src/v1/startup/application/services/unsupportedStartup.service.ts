import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class UnsupportedStartupService implements CodeClimbers.StartupService {
  async enableStartup() {
    Logger.error(`Unsupported operating system: ${process.platform}`)
  }

  async disableStartup() {
    Logger.error(`Unsupported operating system: ${process.platform}`)
  }

  // cleanly separate implementation code for each environment. If I'm working on windows, I see all the implementation around startup
  async launchAndEnableStartup() {
    Logger.error(`Unsupported operating system: ${process.platform}`)
  }

  async closeAndDisableStartup() {
    Logger.error(`Unsupported operating system: ${process.platform}`)
  }
}
