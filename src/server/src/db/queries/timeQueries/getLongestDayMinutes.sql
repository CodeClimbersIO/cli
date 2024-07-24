SELECT MAX(minutes) as longest_day
FROM (SELECT count() as minutes
      FROM activities_pulse
      WHERE date(activities_pulse.time) BETWEEN date(:startDate) AND date(:endDate)
      GROUP BY strftime('%s', time) / (60 * 60 * 24))