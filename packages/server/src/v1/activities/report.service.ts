import { Injectable } from '@nestjs/common'
import { PulseRepo } from '../database/pulse.repo'
import { Dayjs } from 'dayjs'
import { ActivitiesService } from './activities.service'

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
  const defaultScore: CodeClimbers.WeeklyScore = {
    score: 0.5,
    actual: totalTime,
    rating: 'Alert',
    breakdown: totalTime,
  }
  if (totalTime > 60 * 60)
    return {
      ...defaultScore,
      score: 0.5,
      rating: 'Alert',
      recommendation:
        'High risk of burnout-You have a high risk of burnout if you continue to work this many hours a week on a screen.',
    }
  if (totalTime > 60 * 50)
    return {
      ...defaultScore,
      score: 2,
      rating: 'Neutral',
      recommendation:
        'Good, but be careful-You’ve been grinding lately. Great work! Just remember to make time for renewal and self-care.',
    }
  if (totalTime > 60 * 20)
    return {
      ...defaultScore,
      score: 2.5,
      rating: 'Positive',
      recommendation:
        'Optimal-You are working a solid amount of hours each week. Keep it up!',
    }
  return {
    ...defaultScore,
    score: 0.5,
    rating: 'Alert',
    recommendation:
      'Low amount of hours-Maybe doing a lot of planning or just started out. Hopefully you can get to coding soon!',
  }
}

const projectTimeRubric = (
  data: CodeClimbers.PerProjectTimeOverviewDB[],
): CodeClimbers.WeeklyScore => {
  const highestTime = data.reduce((max, { minutes }) => {
    return max > minutes ? max : minutes
  }, 0) // project with the greatest amount of time
  const totalTime = data.reduce((total, { minutes }) => {
    return total + minutes
  }, 0)

  const defaultScore: CodeClimbers.WeeklyScore = {
    score: 0.5,
    actual: totalTime,
    rating: 'Alert',
    breakdown: data,
  }

  if (highestTime > 300)
    return { ...defaultScore, score: 2.5, rating: 'Positive' }
  if (highestTime > 180) return { ...defaultScore, score: 2, rating: 'Neutral' }
  if (highestTime > 60) return { ...defaultScore, score: 1, rating: 'Neutral' }
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
    actual: time,
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
    actual: time,
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
    actual: time,
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
    actual: scoreTotal,
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

@Injectable()
export class ReportService {
  constructor(
    private readonly pulseRepo: PulseRepo,
    private readonly activitiesService: ActivitiesService,
  ) {
    this.pulseRepo = pulseRepo
    this.activitiesService = activitiesService
  }

  getWeeklyScores = async (startDate: Dayjs) => {
    // retrieve the project, deep work, social media, and total time for the week from services
    const endDate = startDate.endOf('week')

    const [deepWorkTime, growthTime, socialMedia, totalTime, projectTime] =
      await Promise.all([
        this.activitiesService.getDeepWorkBetweenDates(startDate, endDate),
        this.activitiesService.getGrowthAndMasteryScore(startDate, endDate),
        this.activitiesService.getSocialMediaTimeByRange(startDate, endDate),
        this.activitiesService.getTotalTimeByRange(startDate, endDate),
        this.activitiesService.getProjectsTimeByRange(startDate, endDate),
      ])

    return getScoresFromWeeklySummary(
      deepWorkTime,
      growthTime,
      projectTime, // don't include <<LAST PROJECT>>
      socialMedia,
      totalTime,
    )
  }
}
