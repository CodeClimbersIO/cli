import { Injectable } from '@nestjs/common'
import { DarwinStartupService } from './darwinStartup.service'
import { UnsupportedStartupService } from './unsupportedStartup.service'

@Injectable()
export class StartupServiceFactory {
  constructor(
    private readonly darwinStartupService: DarwinStartupService,
    private readonly unsupportedStartupService: UnsupportedStartupService,
  ) {}

  getStartupService(): CodeClimbers.StartupService {
    const os = process.platform
    switch (os) {
      case 'darwin':
        return this.darwinStartupService
      default:
        return this.unsupportedStartupService
    }
  }

  static buildStartupService(): CodeClimbers.StartupService {
    return new StartupServiceFactory(
      new DarwinStartupService(),
      new UnsupportedStartupService(),
    ).getStartupService()
  }
}
