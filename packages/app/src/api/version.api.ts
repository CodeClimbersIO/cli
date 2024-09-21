import { useBetterQuery } from '.'
import environmentUtil from '../utils/environment.util'

const THREE_MINUTES = 3 * 60 * 1_000

export function useLatestVersion(enabled = true) {
  const environment = environmentUtil.getFEEnvironment()

  const packageJsonUrl =
    environment === 'release'
      ? 'https://raw.githubusercontent.com/CodeClimbersIO/cli/release/package.json'
      : `https://raw.githubusercontent.com/CodeClimbersIO/cli/main/package.json`

  const queryFn = async () => {
    const res = await fetch(packageJsonUrl)

    if (!res.ok) {
      throw new Error('Failed to fetch latest version')
    }

    if (localStorage.getItem('latestVersion')) {
      // allows override for testing
      return localStorage.getItem('latestVersion') as string
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
