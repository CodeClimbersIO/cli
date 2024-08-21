import { Injectable } from '@nestjs/common'
import { DarwinStartupService } from './darwinStartup.service'
import { UnsupportedStartupService } from './unsupportedStartup.service'
import { WindowsStartupService } from './windowsStartup.service'
import { LinuxStartupService } from './linuxStartup.service'

@Injectable()
export class StartupServiceFactory {
  constructor(
    private readonly darwinStartupService: DarwinStartupService,
    private readonly windowsStartupService: WindowsStartupService,
    private readonly linuxStartupService: LinuxStartupService,
    private readonly unsupportedStartupService: UnsupportedStartupService,
  ) {}

  getStartupService(): CodeClimbers.StartupService {
    const os = process.platform
    switch (os) {
      case 'darwin':
        return this.darwinStartupService
      case 'win32':
        return this.windowsStartupService
      case 'linux':
        return this.linuxStartupService
      default:
        return this.unsupportedStartupService
    }
  }

  static buildStartupService(): CodeClimbers.StartupService {
    return new StartupServiceFactory(
      new DarwinStartupService(),
      new WindowsStartupService(),
      new LinuxStartupService(),
      new UnsupportedStartupService(),
    ).getStartupService()
  }
}
