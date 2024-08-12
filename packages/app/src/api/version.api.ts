import { useBetterQuery } from '.'

const THREE_MINUTES = 3 * 60 * 1_000

export function useLatestVersion(enabled = true) {
  const queryFn = async () => {
    // This should probably be done through a server we host in the future so we can easily update the url without having to update the client
    const res = await fetch(
      'https://raw.githubusercontent.com/CodeClimbersIO/cli/release/package.json',
    )

    if (!res.ok) {
      throw new Error('Failed to fetch latest version')
    }

    const data = await res.json()

    return String(data.version)
  }
  return useBetterQuery<string, Error>({
    queryKey: ['latestVersion'],
    queryFn,
    refetchInterval: THREE_MINUTES,
    staleTime: THREE_MINUTES,
    throwOnError: false,
    enabled,
  })
}
