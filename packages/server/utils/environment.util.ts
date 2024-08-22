export const isCli = () => process.env.CODECLIMBERS_SERVER_APP_CONTEXT === 'cli'
export const isTest = () => process.env.NODE_ENV === 'test'
export const isDev = () => process.env.NODE_ENV === 'development'
export const isProd = () => process.env.NODE_ENV === 'production'
