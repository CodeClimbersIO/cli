import { validate, ValidationError, ValidatorOptions } from 'class-validator'
import { CodeClimberError } from './codeClimberErrors'

export const validateDto = async (
  dto: object,
  validatorOptions?: ValidatorOptions,
) => {
  const errors: ValidationError[] = await validate(dto, validatorOptions)
  if (errors.length > 0) {
    throw new CodeClimberError.InvalidBody(errors)
  }
}
