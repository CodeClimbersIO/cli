import { Dayjs } from 'dayjs'
import {
  getDeepWorkBetweenDates,
  getGrowthAndMasteryScore,
  getProjectsTimeByRange,
  getSocialMediaTimeByRange,
  getTotalTimeByRange,
} from './pulse.service'
import { useTheme } from '@mui/material'

const defaultScore = {
  score: 0,
  rating: 'Alert',
} as CodeClimbers.WeeklyScore
let {
  totalTimeScore,
  projectTimeScore,
  socialMediaTimeScore,
  deepWorkTimeScore,
  growthScore,
}: CodeClimbers.WeeklyScores = {
  totalTimeScore: defaultScore,
  projectTimeScore: defaultScore,
  socialMediaTimeScore: defaultScore,
  deepWorkTimeScore: defaultScore,
  growthScore: defaultScore,
  totalScore: defaultScore,
}

const totalTimeRubric = (totalTime: number): CodeClimbers.WeeklyScore => {
  if (totalTime > 60 * 60)
    return { score: 0.5, rating: 'Alert', breakdown: totalTime }
  if (totalTime > 60 * 50)
    return { score: 2, rating: 'Neutral', breakdown: totalTime }
  if (totalTime > 60 * 20)
    return { score: 2.5, rating: 'Positive', breakdown: totalTime }
  return { score: 0.5, rating: 'Alert', breakdown: totalTime }
}

const projectTimeRubric = (
  data: CodeClimbers.PerProjectTimeOverviewDB[],
): CodeClimbers.WeeklyScore => {
  const time = data.reduce((max, { minutes }) => {
    return max > minutes ? max : minutes
  }, 0) // project with the greatest amount of time

  const defaultScore: CodeClimbers.WeeklyScore = {
    score: 0.5,
    rating: 'Alert',
    breakdown: data,
  }

  if (time > 300) return { ...defaultScore, score: 2.5, rating: 'Positive' }
  if (time > 180) return { ...defaultScore, score: 2, rating: 'Neutral' }
  if (time > 60) return { ...defaultScore, score: 1, rating: 'Neutral' }
  return defaultScore
}

const socialMediaTimeRubric = (
  data: CodeClimbers.EntityTimeOverviewDB[],
): CodeClimbers.WeeklyScore => {
  const time = data.reduce((total, { minutes }) => {
    return total + minutes
  }, 0) // total time for all sites

  const defaultScore: CodeClimbers.WeeklyScore = {
    score: 0.5,
    rating: 'Alert',
    breakdown: data,
  }

  if (time < 180) return { ...defaultScore, score: 2.5, rating: 'Positive' }
  if (time < 300) return { ...defaultScore, score: 2, rating: 'Neutral' }
  if (time < 420) return { ...defaultScore, score: 1, rating: 'Neutral' }
  return defaultScore
}

const growthTimeRubric = (
  data: CodeClimbers.EntityTimeOverviewDB[],
): CodeClimbers.WeeklyScore => {
  const time = data.reduce((total, { minutes }) => {
    return total + minutes
  }, 0)

  const defaultScore: CodeClimbers.WeeklyScore = {
    score: 0.5,
    rating: 'Alert',
    breakdown: data,
  }

  if (time > 300) return { ...defaultScore, score: 2.5, rating: 'Positive' }
  if (time > 180) return { ...defaultScore, score: 2, rating: 'Neutral' }
  if (time > 60) return { ...defaultScore, score: 1, rating: 'Neutral' }
  return defaultScore
}

const deepWorkTimeRubric = (
  data: CodeClimbers.DeepWorkPeriod[],
): CodeClimbers.WeeklyScore => {
  // get the 5 highest time days and take the average
  const highestDays = data.slice(0, 5)

  const time =
    highestDays.reduce((sum, { time }) => {
      return sum + time
    }, 0) / highestDays.length // average time on deep work each day of the week

  const defaultScore: CodeClimbers.WeeklyScore = {
    score: 0.5,
    rating: 'Alert',
    breakdown: data,
  }

  if (time > 180) return { ...defaultScore, score: 2.5, rating: 'Positive' }
  if (time > 120) return { ...defaultScore, score: 2, rating: 'Neutral' }
  if (time > 60) return { ...defaultScore, score: 1, rating: 'Neutral' }
  return defaultScore
}

const totalScoreRubric = (scoreTotal: number): CodeClimbers.WeeklyScore => {
  const defaultScore: CodeClimbers.WeeklyScore = {
    score: scoreTotal,
    rating: 'Alert',
    breakdown: null,
  }
  if (scoreTotal > 7.5) return { ...defaultScore, rating: 'Positive' }
  if (scoreTotal > 4) return { ...defaultScore, rating: 'Neutral' }
  return defaultScore
}
/**
 * Calculates the points given the comparison to the rubric
 */
const getScoresFromWeeklySummary = (
  deepWorkTime: CodeClimbers.DeepWorkPeriod[],
  growthTime: CodeClimbers.EntityTimeOverviewDB[],
  projectTime: CodeClimbers.PerProjectTimeOverviewDB[],
  socialMediaTime: CodeClimbers.EntityTimeOverviewDB[],
  totalTime: number,
): CodeClimbers.WeeklyScores => {
  // time is in minutes
  totalTimeScore = totalTimeRubric(totalTime)
  projectTimeScore = projectTimeRubric(projectTime)
  socialMediaTimeScore = socialMediaTimeRubric(socialMediaTime)
  deepWorkTimeScore = deepWorkTimeRubric(deepWorkTime)
  growthScore = growthTimeRubric(growthTime)

  const totalScore =
    projectTimeScore.score +
    growthScore.score +
    deepWorkTimeScore.score +
    totalTimeScore.score
  return {
    totalTimeScore,
    projectTimeScore,
    growthScore,
    socialMediaTimeScore,
    deepWorkTimeScore,
    totalScore: totalScoreRubric(totalScore),
  }
}

export const getWeeklyScores = async (startDate: Dayjs) => {
  // retrieve the project, deep work, social media, and total time for the week from services
  const endDate = startDate.endOf('week')

  const [deepWorkTime, growthTime, socialMedia, totalTime, projectTime] =
    await Promise.all([
      getDeepWorkBetweenDates(startDate, endDate),
      getGrowthAndMasteryScore(startDate, endDate),
      getSocialMediaTimeByRange(startDate, endDate),
      getTotalTimeByRange(startDate, endDate),
      getProjectsTimeByRange(startDate, endDate),
    ])

  return getScoresFromWeeklySummary(
    deepWorkTime,
    growthTime,
    projectTime.filter(({ name }) => !name.toLowerCase().includes('<<')), // don't include <<LAST PROJECT>>
    socialMedia,
    totalTime,
  )
}

export const getColorForRating = (
  rating: CodeClimbers.WeeklyScoreRating,
): { main: string; accent: string } => {
  const theme = useTheme()
  switch (rating) {
    case 'Positive':
      return {
        main: theme.palette.graphColors.green,
        accent: theme.palette.graphColors.greenAccent,
      }
    case 'Alert':
      return {
        main: theme.palette.graphColors.orange,
        accent: theme.palette.graphColors.orangeAccent,
      }
    case 'Neutral':
      return {
        main: theme.palette.graphColors.grey,
        accent: theme.palette.graphColors.greyAccent,
      }
  }
}
