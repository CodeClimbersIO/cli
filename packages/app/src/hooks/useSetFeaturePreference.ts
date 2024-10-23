/**
 * hook checks if the user settings has a particular field, and updates the local storage for if the feature is enabled
 *
 */

import { useEffect } from 'react'
import { useGetCurrentUser } from '../api/browser/user.api'
import { setFeatureEnabled } from '../services/feature.service'

// TODO: Remove this hook after a week or two
export const useSetFeaturePreference = () => {
  const { data: user } = useGetCurrentUser()

  useEffect(() => {
    if (!user) return
    setFeatureEnabled('weekly-report', user.weeklyReportType)
  }, [user])
}
