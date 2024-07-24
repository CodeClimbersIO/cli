SELECT category, count() AS minutes
FROM (SELECT category, count()
      FROM activities_pulse
      WHERE date(activities_pulse.time) BETWEEN :startDate AND :endDate
      GROUP BY strftime('%s', time) / 60) 
GROUP BY category
