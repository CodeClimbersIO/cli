import { posthog } from 'posthog-js'

export type FeatureState = boolean | CodeClimbers.WeeklyReportType
export type FeatureKey = 'weekly-report'

export const isFeatureEnabled = (
  feature: FeatureKey,
  state: FeatureState,
): boolean => {
  const enabledFeatures = JSON.parse(
    localStorage.getItem('enabled-features') || '{}',
  )
  return enabledFeatures[feature] === state
}

export const setFeatureEnabled = (feature: FeatureKey, state: FeatureState) => {
  const enabledFeatures = JSON.parse(
    localStorage.getItem('enabled-features') || '{}',
  )
  const newEnabledFeatures = { ...enabledFeatures, [feature]: state }
  localStorage.setItem('enabled-features', JSON.stringify(newEnabledFeatures))
  posthog.capture('$set', {
    $set: newEnabledFeatures,
  })
}

export const getFeaturePreferences = (): Record<FeatureKey, FeatureState> => {
  const enabledFeatures = JSON.parse(
    localStorage.getItem('enabled-features') || '{}',
  )
  return enabledFeatures
}
