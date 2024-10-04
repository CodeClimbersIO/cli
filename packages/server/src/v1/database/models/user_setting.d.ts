declare namespace CodeClimbers {
  export type WeeklyReportType = 'ai' | 'standard' | 'none'
  export interface UserSettings {
    id?: number
    user_id: number
    weekly_report_type: WeeklyReportType
    created_at: string
    updated_at: string
  }
  // same as User but snake case
  export interface UserSettingsDB {
    id?: number
    user_id: number
    weekly_report_type: WeeklyReportType
    created_at: string
    updated_at: string
  }
}
