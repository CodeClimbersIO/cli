declare namespace CodeClimbers {
  export interface WakatimePulseStatusDao {
    project: string
    language: string
    editor: string
    operatingSystem: string
    machine: string
    branch: string
    seconds: number | string
    maxHeartbeatTime: string
    minHeartbeatTime: string
  }

  export interface Source {
    name: string
    lastActive: string
  }

  export interface SourceWithMinutes {
    name: string
    lastActive: string
    minutes: number
  }

  export interface SiteWithMinutes {
    name: string
    minutes: number
  }

  export interface PerProjectTimeOverviewDB {
    minutes: number
    name: string
  }

  export interface PerProjectTimeAndCategoryOverviewDB {
    category: string
    minutes: number
    name: string
  }

  export interface EntityTimeOverviewDB {
    entity: string
    minutes: number
  }

  export interface CategoryTimeOverviewDB {
    category: string
    minutes: number
  }

  export interface DeepWorkPeriod {
    startDate: string
    endDate: string
    time: number
  }
}
