import { Injectable } from "@nestjs/common";
import { DarwinStartupService } from "./darwinStartup.service";
import { WindowStartupService } from "./windowStartup.service";
import { UnsupportedStartupService } from "./unsupportedStartup.service";

@Injectable()
export class StartupServiceFactory {
  constructor(
    private readonly darwinStartupService: DarwinStartupService,
    private readonly unsupportedStartupService: UnsupportedStartupService,
    private readonly windowStartupService: WindowStartupService,
  ) {}

  getStartupService(): CodeClimbers.StartupService {
    const os = process.platform;
    switch (os) {
      case "darwin":
        return this.darwinStartupService;
      case "win32":
        return this.windowStartupService;
      default:
        return this.unsupportedStartupService;
    }
  }

  static buildStartupService(): CodeClimbers.StartupService {
    return new StartupServiceFactory(
      new DarwinStartupService(),
      new UnsupportedStartupService(),
      new WindowStartupService(),
    ).getStartupService();
  }
}
