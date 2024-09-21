declare namespace CodeClimbers {
  export interface LocalDbQueryDao {
    message: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
  }

  export interface LocalAuthDao {
    message: string
    data: {
      apiKey: string
    }
  }
}
