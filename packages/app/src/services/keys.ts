export const pulseKeys = {
  pulse: ['pulse'] as const,
  latestPulses: ['pulse', 'latest-pulses'] as const,
  sources: ['sources'] as const,
  weekOverview: (date: string) => ['weekOverview', date] as const,
  deepWork: (startDate: string, endDate: string) =>
    ['deepWork', startDate, endDate] as const,
  categoryTimeOverview: (startDate: string, endDate: string) =>
    ['categoryTimeOverview', startDate, endDate] as const,
  sourcesMinutes: (startDate: string, endDate: string) =>
    ['sourcesMinutes', startDate, endDate] as const,
  sitesMinutes: (startDate: string, endDate: string) =>
    ['sitesMinutes', startDate, endDate] as const,
  perProjectOverviewTopThree: (startDate: string, endDate: string) =>
    ['perProjectTimeOverview', 'topThree', startDate, endDate] as const,
}

export const userKeys = {
  user: ['user'] as const,
}
