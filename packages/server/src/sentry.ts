import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://00224a056c118536fd6c78e3df9619ed@o4507760376348672.ingest.us.sentry.io/4507760378118144',
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 0.1, //  Capture 100% of the transactions

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 0.1,
  })
}
