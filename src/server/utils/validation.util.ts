import { validate, ValidatorOptions } from 'class-validator'

export const validateDto = async (dto: object, validatorOptions?: ValidatorOptions) => {
  const errors = await validate(dto, validatorOptions)
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
}