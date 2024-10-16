import { Dayjs } from 'dayjs'
import {
  getDeepWorkBetweenDates,
  getMasteryAndGrowthByRange,
  getProjectsTimeByRange,
  getSocialMediaTimeByRange,
  getTotalTimeByRange,
} from './pulse.service'

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
  const totalTimeRubric = (totalTime: number): CodeClimbers.WeeklyScore => {
    if (totalTime > 60 * 60) return { score: 0.5, rating: 'Alert' }
    if (totalTime > 60 * 50) return { score: 2, rating: 'Nuetral' }
    if (totalTime > 60 * 20) return { score: 2.5, rating: 'Positive' }
    return { score: 0.5, rating: 'Alert' }
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
      breakdown: projectTime,
    }

    if (time > 300) return { ...defaultScore, score: 2.5, rating: 'Positive' }
    if (time > 180) return { ...defaultScore, score: 2, rating: 'Nuetral' }
    if (time > 60) return { ...defaultScore, score: 1, rating: 'Nuetral' }
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
      breakdown: projectTime,
    }

    if (time < 180) return { ...defaultScore, score: 2.5, rating: 'Positive' }
    if (time < 300) return { ...defaultScore, score: 2, rating: 'Nuetral' }
    if (time < 420) return { ...defaultScore, score: 1, rating: 'Nuetral' }
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
      breakdown: projectTime,
    }

    if (time < 300) return { ...defaultScore, score: 2.5, rating: 'Positive' }
    if (time < 180) return { ...defaultScore, score: 2, rating: 'Nuetral' }
    if (time < 60) return { ...defaultScore, score: 1, rating: 'Nuetral' }
    return defaultScore
  }

  const deepWorkTimeRubric = (
    data: CodeClimbers.DeepWorkPeriod[],
  ): CodeClimbers.WeeklyScore => {
    const time =
      data.reduce((sum, { time }) => {
        return sum + time
      }, 0) / deepWorkTime.length // average time on deep work each day of the week

    const defaultScore: CodeClimbers.WeeklyScore = {
      score: 0.5,
      rating: 'Alert',
      breakdown: projectTime,
    }

    if (time > 180) return { ...defaultScore, score: 2.5, rating: 'Positive' }
    if (time > 120) return { ...defaultScore, score: 2, rating: 'Nuetral' }
    if (time > 60) return { ...defaultScore, score: 1, rating: 'Nuetral' }
    return defaultScore
  }

  totalTimeScore = totalTimeRubric(totalTime)
  projectTimeScore = projectTimeRubric(projectTime)
  socialMediaTimeScore = socialMediaTimeRubric(socialMediaTime)
  deepWorkTimeScore = deepWorkTimeRubric(deepWorkTime)
  growthScore = growthTimeRubric(growthTime)

  const totalScoreRubric = (scoreTotal: number): CodeClimbers.WeeklyScore => {
    console.log(scoreTotal)
    const defaultScore: CodeClimbers.WeeklyScore = {
      score: 0,
      rating: 'Alert',
      breakdown: null,
    }
    if (scoreTotal > 7.5)
      return { ...defaultScore, rating: 'Positive', score: 2.5 }
    if (scoreTotal > 4)
      return { ...defaultScore, rating: 'Nuetral', score: 1.5 }
    return defaultScore
  }

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
      getMasteryAndGrowthByRange(startDate, endDate),
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
