// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace CodeClimbers {
  export interface WeeklyScore {
    score: number
    rating: 'Positive' | 'Nuetral' | 'Alert'
    explanation?: string
    breakdown?: unknown
  }

  export interface WeeklyScores {
    totalTimeScore: WeeklyScore
    projectTimeScore: WeeklyScore
    socialMediaTimeScore: WeeklyScore
    deepWorkTimeScore: WeeklyScore
    growthScore: WeeklyScore
    totalScore: WeeklyScore
  }

  export interface UserWeeklySummary {
    totalTime: number // total time over the period
    greatestProjectTime: number // total time on a specific project
    totalSocialMediaTime: number // total time on social media
    totalGrowthTime: number // total time spent on sites related to learning
    averageDeepWorkTime: number // average time on deep work each day of the week
  }
}
