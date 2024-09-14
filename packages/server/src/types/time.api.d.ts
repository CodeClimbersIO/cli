declare namespace CodeClimbers {
  export interface WeekOverview {
    longestDayMinutes: number
    yesterdayMinutes: number
    todayMinutes: number
    weekMinutes: number
  }

  export interface WeekOverviewDao {
    message: string
    data: WeekOverview
  }

  export interface Health {
    OK: boolean
    app: string
    version: string
  }

  export interface TimeOverview {
    category: string
    minutes: number
  }

  export interface DeepWorkTime {
    flowGroup: number
    flowTime: number
    flowStart: string
  }

  export interface DeepWorkDao {
    message: string
    data: DeepWorkTime[]
  }

  export interface TimeOverviewDao {
    message: string
    data: TimeOverview[][]
  }

  export interface SourceMinutes {
    name: string
    minutes: number
    lastActive: string
  }

  export interface SourcesOverviewDao {
    message: string
    data: SourceMinutes[]
  }

  export interface SiteMinutes {
    name: string
    minutes: number
  }

  export interface SitesOverviewDao {
    message: string
    data: SiteMinutes[]
  }
}
