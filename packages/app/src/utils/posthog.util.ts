// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

export const initPosthog = () => {
  posthog.init('phc_jTQv0YoCvMEEtKYxlglm9Mo8cZgkfpvhIhRvvhTEXHY', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'always',
  })
}
