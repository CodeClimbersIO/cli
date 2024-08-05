import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateWakatimePulseDto {
  @IsOptional()
  @IsString()
  userId?: string

  @IsString()
  entity: string

  @IsString()
  type: string

  @IsOptional()
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

  @IsOptional()
  @IsString()
  editor?: string

  @IsOptional()
  @IsString()
  operating_system?: string

  @IsOptional()
  @IsString()
  machine?: string

  @IsOptional()
  @IsString()
  user_agent?: string

  @IsNumber()
  time: number | string

  @IsOptional()
  @IsString()
  hash?: string

  @IsOptional()
  @IsString()
  origin?: string

  @IsOptional()
  @IsString()
  origin_id?: string

  @IsOptional()
  @IsString()
  description?: string
}
