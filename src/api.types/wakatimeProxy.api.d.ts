declare namespace CodeClimbersApi {
  export interface WakatimeStatusbar {
    cached_at: string
    data: {
      categories?: StatusBarBreakdown[]
      dependencies?: StatusBarBreakdown[]
      editors?: StatusBarBreakdown[]
      languages?: StatusBarBreakdown[]
      machines?: StatusBarBreakdown[]
      operating_systems?: StatusBarBreakdown[]
      projects?: StatusBarBreakdown[]
      branches?: StatusBarBreakdown[]
      entities?: StatusBarBreakdown[]
      grand_total?: StatusBarBreakdown
      range?: {
        date: string
        end: string
        start: string
        text: string
        timezone: string
      }
    }
  }

  export interface CreateWakatimePulseDto {
      userId?: string
      entity: string
      type: string
      category?: string
      project: string
      branch: string
      language?: string
      is_write?: boolean
      editor?: string
      operating_system?: string
      machine?: string
      user_agent?: string
      time: number | string
      hash?: string
      origin?: string
      origin_id?: string
      description?: string
  }
}
