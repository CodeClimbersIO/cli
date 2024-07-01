import { ValidationError } from 'class-validator'

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

export namespace CodeClimberError {
  class ValidationErr extends CodeClimberError {
    validationErrors?: ValidationError[]
    public constructor(message: string, validationErrors?: ValidationError[]) {
      super(message, 422)
      this.validationErrors = validationErrors
    }
  }
  export class InvalidBody extends ValidationErr {
    constructor(validationErrors: ValidationError[], message?: string) {
      super(message || 'Expected request body was invalid', validationErrors)
    }
  }
}