import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator'

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto
  count: number
}
export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export class PageOptionsDto {
  @IsEnum(Sort)
  @IsOptional()
  readonly sort?: Sort = Sort.DESC

  @IsNumber()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1

  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 10
}

export class PageMetaDto {
  readonly page: number

  readonly limit: number

  readonly count: number

  readonly pageCount: number

  readonly hasPreviousPage: boolean

  readonly hasNextPage: boolean

  constructor({ pageOptionsDto, count }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page
    this.limit = pageOptionsDto.limit
    this.count = count
    this.pageCount = Math.ceil(this.count / this.limit)
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}

export class PageDto<T> {
  readonly data: T[]

  readonly meta: PageMetaDto

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data
    this.meta = meta
  }
}
