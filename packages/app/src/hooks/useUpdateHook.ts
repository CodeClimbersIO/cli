import { useGetLocalVersion } from '../api/health.api'
import { useLatestVersion } from '../api/version.api'
import environmentUtil from '../utils/environment.util'

export const useUpdateVersionHook = () => {
  const { data: localVersionResponse } = useGetLocalVersion()
  const remoteVersion = useLatestVersion()
  const localVersion = localVersionResponse?.version

  const {
    major: remoteMajor,
    minor: remoteMinor,
    patch: remotePatch,
  } = environmentUtil.extractVersions(remoteVersion.data ?? '')
  const {
    major: localMajor,
    minor: localMinor,
    patch: localPatch,
  } = environmentUtil.extractVersions(localVersion ?? '')

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
