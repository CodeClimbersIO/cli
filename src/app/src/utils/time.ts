export function timeSince(utcDateString: string): string {
  const utcDate: Date = new Date(utcDateString)
  const now: Date = new Date()
  const diffMs: number = now.getTime() - utcDate.getTime()

  const diffSeconds: number = Math.floor(diffMs / 1000)
  const diffMinutes: number = Math.floor(diffSeconds / 60)
  const diffHours: number = Math.floor(diffMinutes / 60)
  const diffDays: number = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `${diffDays}D`
  } else if (diffHours > 0) {
    return `${diffHours}h`
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m`
  } else {
    return `${diffSeconds}s`
  }
}
