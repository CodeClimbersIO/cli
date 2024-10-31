export const gamemakerKeys = {
  gameSettings: (id: string) => ['gameSettings', id] as const,
  aiWeeklyReports: ['aiWeeklyReports'] as const,
}

export const weeklyReportKeys = {
  aiWeeklyReports: (date: string) => ['aiWeeklyReports', date] as const,
}
