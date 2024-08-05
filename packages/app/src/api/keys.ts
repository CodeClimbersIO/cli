export const pulseKeys = {
  pulse: ['pulse'] as const,
  latestPulses: ['pulse', 'latest-pulses'] as const,
  sources: ['sources'] as const,
  weekOverview: (date: string) => ['weekOverview', date] as const,
  categoryTimeOverview: (startDate: string, endDate: string) =>
    ['categoryTimeOverview', startDate, endDate] as const,
}
