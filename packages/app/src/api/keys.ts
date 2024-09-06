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
}
