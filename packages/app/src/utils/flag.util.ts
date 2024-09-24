// save feature flag to local storage
export const saveFeatureFlag = (featureFlag: string, value: boolean) => {
  localStorage.setItem(`feature-flag-${featureFlag}`, value.toString())
}

// get feature flag from local storage
export const getFeatureFlag = (featureFlag: string) => {
  return localStorage.getItem(`feature-flag-${featureFlag}`) === 'true'
}
