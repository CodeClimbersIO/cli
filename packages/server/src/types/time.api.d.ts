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

  export interface TimeOverview {
    category: string
    minutes: number
  }

  export interface TimeOverviewDao {
    message: string
    data: TimeOverview[][]
  }
}
