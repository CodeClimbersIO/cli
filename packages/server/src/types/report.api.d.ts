declare namespace CodeClimbers {
  export type WeeklyScoreRating = 'Positive' | 'Neutral' | 'Alert'
  export interface WeeklyScore {
    score: number
    actual: number // represents the number used to give the rating
    rating: WeeklyScoreRating
    explanation?: string
    breakdown?: unknown
    recommendation?: string
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
