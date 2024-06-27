// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace CodeClimbers {
  export interface Pulse {
    id: number
    userId: string
    entity: string
    type: string
    category?: string
    project?: string
    branch?: string
    language?: string
    isWrite: boolean
    editor: string
    operatingSystem: string
    application?: string
    machine: string
    userAgent: string
    time: string
    hash: string
    origin?: string
    originId?: string
    createdAt: string
    source?: string
    description?: string
  }
}
