SELECT MAX(minutes) as longest_day
FROM (SELECT count() as minutes
      FROM activities_pulse
      WHERE date(activities_pulse.time) BETWEEN :startDate AND :endDate
      GROUP BY strftime('%s', time) / (60 * 60 * 24))