declare namespace CodeClimbers {
  import { PageMetaDto } from '../v1/dtos/pagination.dto'
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

  export interface TimeOverview {
    category: string
    minutes: number
  }

  export interface TimeOverviewDao {
    message: string
    data: TimeOverview[]
  }

  export interface ProjectTimeOverview {
    name: string
    minutes: number
  }

  export interface PerProjectTimeOverview {
    [key: string]: ProjectTimeOverview[]
  }

  export interface PerProjectTimeOverviewDao {
    message: string
    data: PerProjectTimeOverview[]
  }

  export interface PerProjectOverviewByCategoryDao {
    message: string
    data: ProjectTimeOverview[]
    meta: PageMetaDto
  }
}
