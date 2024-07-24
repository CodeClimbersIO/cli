SELECT count() AS minutes
FROM (SELECT count()
      FROM activities_pulse
      WHERE date(activities_pulse.time) IS date(:queryDate)
      GROUP BY strftime('%s', time) / 60)