import { useGetLocalVersion } from '../services/health.service'
import { useLatestVersion } from '../services/version.service'
import { extractVersions } from '../utils/environment.util'

export const useUpdateVersionHook = () => {
  const { data: localVersionResponse } = useGetLocalVersion()
  const remoteVersion = useLatestVersion()
  const localVersion = localVersionResponse?.version

  const {
    major: remoteMajor,
    minor: remoteMinor,
    patch: remotePatch,
  } = extractVersions(remoteVersion.data ?? '')
  const {
    major: localMajor,
    minor: localMinor,
    patch: localPatch,
  } = extractVersions(localVersion ?? '')

  const isMajorUpdate = remoteMajor > localMajor
  const isMinorUpdate = remoteMinor > localMinor
  const isPatchUpdate = remotePatch > localPatch

  return {
    isMajorUpdate,
    isMinorUpdate,
    isPatchUpdate,
    remoteVersion,
    localVersion,
  }
}
