export const deepWorkSql = (startDate: string, endDate: string) => `
  WITH get_periods AS (
    select MIN(time) AS interval_start,
           COUNT(*) AS activity_count,
           (strftime('%s', time) / 120) AS interval_id
    from activities_pulse
    where time BETWEEN '${startDate}' AND '${endDate}'
    group by (strftime('%s', time) / 120)
    order by interval_id asc
),

     flagged AS (
         SELECT *,
                (strftime('%s', interval_start) - strftime('%s', LAG(interval_start) OVER (ORDER BY interval_start)) <= 240) AS within_4_minutes
         FROM get_periods
     ),
     groups AS (
         SELECT *,
                SUM(CASE WHEN within_4_minutes = 0 THEN 1 ELSE 0 END) OVER (ORDER BY interval_start) AS reset_group
         FROM flagged
     ),
     flow_states AS (
         SELECT *,
                SUM(within_4_minutes) OVER (PARTITION BY reset_group ORDER BY interval_start) AS cumulative_within_4_minutes
         FROM groups
     ),
     flow_final AS (

         select reset_group as flow_group, min(interval_start) as flow_start, (max(cumulative_within_4_minutes) + 1) * 2 as flow_time
         from flow_states
         group by flow_group
     )

select * from flow_final
where flow_time > 14;
`
