declare namespace CodeClimbers {
  export interface StartupService {
    enableStartup: () => Promise<void>
    disableStartup: () => Promise<void>
    launchAndEnableStartup: () => Promise<void>
    closeAndDisableStartup: () => Promise<void>
  }
}
