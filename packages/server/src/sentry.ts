import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://e885e4c5eeed09d6229c7d7bfdc8d762@o4507772937043968.ingest.us.sentry.io/4507772946022400',
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 0.1, //  Capture 100% of the transactions

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 0.1,
  })
}
