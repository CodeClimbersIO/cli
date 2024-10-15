// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace CodeClimbers {
  export interface PerProjectTimeOverviewDB {
    minutes: number
    name: string
  }

  export interface PerProjectTimeAndCategoryOverviewDB {
    category: string
    minutes: number
    name: string
  }

  export interface EntityTimeOverviewDB {
    entity: string
    minutes: number
  }

  export interface CategoryTimeOverviewDB {
    category: string
    minutes: number
  }

  export interface DeepWorkPeriod {
    startDate: string
    endDate: string
    time: number
  }
}
