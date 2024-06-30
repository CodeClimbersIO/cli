/**
 * Custom Errors are used when a developer wants the error to be displayed to the end user
 * All other errors are reported internally
 */
export class CodeClimberError extends Error {
  public message!: string
  public status: number

  public constructor(message: string, status = 500) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = status
  }
}


export namespace ValidationErrors {
  export class MissingBodyError extends CodeClimberError {
    constructor(message?: string) {
      super(message || 'Body missing from request', 422)
    }
  }
  export class MissingFieldError extends CodeClimberError {
    constructor(message?: string) {
      super(message || 'Body required missing field', 422)
    }
  }
}