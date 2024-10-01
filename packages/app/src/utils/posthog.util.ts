// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

export const initPosthog = () => {
  posthog.init('phc_MPX1sQylN646gExgBzp69irMAuUVUQ28fpqeCrwrWDU', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'always',
  })

  posthog.register({
    isBrowserApp: true,
  })
}
