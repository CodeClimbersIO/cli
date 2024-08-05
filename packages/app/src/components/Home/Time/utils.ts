export const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const minutesRemaining = minutes % 60

  return `${hours}h ${minutesRemaining}m`
}
