import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateWakatimePulseDto {
  @IsString()
  userId?: string

  @IsString()
  entity: string

  @IsString()
  type: string

  @IsString()
  category?: string

  @IsString()
  project: string

  @IsString()
  branch: string

  @IsOptional()
  @IsString()
  language?: string

  @IsOptional()
  @IsBoolean()
  is_write?: boolean

  @IsString()
  editor?: string

  @IsString()
  operating_system?: string

  @IsString()
  machine?: string

  @IsString()
  user_agent?: string

  @IsNumber()
  time: number | string

  @IsString()
  hash?: string

  @IsString()
  origin?: string

  @IsString()
  origin_id?: string

  @IsString()
  description?: string
}
