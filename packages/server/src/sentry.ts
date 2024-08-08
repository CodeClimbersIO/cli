import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://b0f891e49c8abcbabf80bf8c82e0cf77@o4507739058208768.ingest.de.sentry.io/4507739060568144',
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  })
}
