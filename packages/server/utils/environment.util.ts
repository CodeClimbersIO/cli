export const isCli = () => process.env.CODECLIMBERS_SERVER_APP_CONTEXT === 'cli'
export const isTest = () => process.env.NODE_ENV === 'test'
