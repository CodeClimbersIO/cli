import { posthog } from 'posthog-js'

export type FeatureState = boolean | CodeClimbers.WeeklyReportType
export type FeatureKey = 'weekly-report'

export const isFeatureEnabled = (
  feature: FeatureKey,
  state: FeatureState,
): boolean => {
  const enabledFeatures = JSON.parse(
    localStorage.getItem(`enabled-features-${feature}`) || '',
  )
  return enabledFeatures === state
}

export const setFeatureEnabled = (feature: FeatureKey, state: FeatureState) => {
  let stringState = ''
  try {
    stringState = JSON.stringify(state)
    localStorage.setItem(`enabled-features-${feature}`, stringState)
    posthog.capture('$set', {
      $set: { [`enabled-features-${feature}`]: state },
    })
  } catch (error) {
    console.error(`Error setting feature enabled-features-${feature}`, error)
  }
}
