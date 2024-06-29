import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class WakatimePulse {
  @IsString()
  userId?: string

  @IsString()
  entity = ''

  @IsString()
  type = ''

  @IsString()
  category?: string

  @IsString()
  project = ''

  @IsString()
  branch = ''

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
  time: number | string = 0

  @IsString()
  hash?: string

  @IsString()
  origin?: string = ''

  @IsString()
  origin_id?: string = ''

  @IsString()
  description?: string
}