declare namespace CodeClimbers {
  export interface WeekOverviewDao {
    longestDayMinutes: number
    yesterdayMinutes: number
    todayMinutes: number
    weekMinutes: number
  }

  export interface TimeOverviewDao {
    category: string
    minutes: number
  }
}
