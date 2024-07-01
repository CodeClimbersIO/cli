import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { CodeClimberError } from './codeClimberErrors'

type Constructor<T> = new (...args: object[]) => T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateBodyObject = async <T extends Constructor<any>>(
  body: CodeClimbers.Body,
  DtoClass: T,
  validatorOptions?: ValidatorOptions,
): Promise<InstanceType<T>> => {
  const dto = new DtoClass(body)
  const errors: ValidationError[] = await validate(dto, validatorOptions)
  if (errors.length > 0) {
    throw new CodeClimberError.InvalidBody(errors)
  }
  return dto
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateBodyArray = async <T extends Constructor<any>>(
  body: Array<CodeClimbers.Body>,
  DtoClass: T,
  validatorOptions?: ValidatorOptions,
): Promise<Array<InstanceType<T>>> => {
  const dtos = body.map((b) => new DtoClass(b))
  const errors: ValidationError[] = await validate(dtos, validatorOptions)
  if (errors.length > 0) {
    throw new CodeClimberError.InvalidBody(errors)
  }
  return dtos
}

export default {
  validateBodyObject,
  validateBodyArray,
}
