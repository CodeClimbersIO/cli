WITH get_total_minutes (time, total_minutes) AS (
    SELECT time, count() * 2 as total_minutes
    FROM activities_pulse
    WHERE date(activities_pulse.time) BETWEEN :startDate AND :endDate
    GROUP BY category, strftime('%s', time) / 120),
get_day_minutes (time, day_minutes) AS (
    SELECT time, count() * 2 as day_minutes 
    FROM get_total_minutes
    GROUP BY strftime('%Y-%m-%d', time))
SELECT max(day_minutes) as minutes
FROM get_day_minutes;
