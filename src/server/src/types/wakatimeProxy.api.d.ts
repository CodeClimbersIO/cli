declare namespace CodeClimbers {
  interface ActivitiesDetail {
    digital: string
    hours: number
    minutes: number
    name?: string
    percent?: number
    seconds?: number
    text: string
    total_seconds: number
  }
  export interface ActivitiesStatusBarData {
    categories?: ActivitiesDetail[]
    dependencies?: ActivitiesDetail[]
    editors?: ActivitiesDetail[]
    languages?: ActivitiesDetail[]
    machines?: ActivitiesDetail[]
    operating_systems?: ActivitiesDetail[]
    projects?: ActivitiesDetail[]
    branches?: ActivitiesDetail[] | null
    entities?: ActivitiesDetail[] | null
    grand_total?: ActivitiesDetail
    range?: {
      date: string
      end: string
      start: string
      text: string
      timezone: string
    }
  }
  export interface ActivitiesStatusBar {
    cached_at: string
    data: ActivitiesStatusBarData
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
