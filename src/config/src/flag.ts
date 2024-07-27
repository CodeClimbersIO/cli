export class Flag {
  public readonly enabled: boolean
  public readonly source: 'CORE' | 'ENV' | 'LOCAL' | 'ID'
  constructor(
    public readonly name: string,
    public readonly coreEnabled: boolean,
    public readonly localEnabled?: boolean,
    public readonly envEnabled?: boolean,
    public readonly identityEnabled?: boolean,
  ) {
    this.enabled = identityEnabled ?? envEnabled ?? localEnabled ?? coreEnabled
    if (
      coreEnabled === this.enabled &&
      (envEnabled === undefined || envEnabled === this.enabled) &&
      (identityEnabled === undefined || identityEnabled === this.enabled) &&
      (localEnabled === undefined || localEnabled === this.enabled)
    ) {
      this.source = 'CORE'
    } else if (
      envEnabled === this.enabled &&
      (identityEnabled === undefined || identityEnabled === this.enabled)
    ) {
      this.source = 'ENV'
    } else if (identityEnabled === this.enabled) {
      this.source = 'ID'
    } else {
      this.source = 'LOCAL'
    }
  }
}
