WITH heartbeats_with_diff AS (
        SELECT
    project,
    language,
    editor,
    operating_system,
    machine,
    branch,
    time,
    MIN(
        (JULIANDAY(time) - JULIANDAY(LAG(time) OVER w)) * 86400,
        120
    ) AS diff
FROM
    activities_pulse
WHERE
    DATE(time, 'localtime') >= DATE('now', 'localtime')
    AND DATE(time, 'localtime') < DATE('now', 'localtime', '+1 day')
WINDOW
    w AS (ORDER BY time)
    )
    SELECT
        project,
        language,
        editor,
        operating_system,
        machine,
        branch,
        ROUND(SUM(MAX(1, diff))) AS seconds,
        MIN(time) AS min_heartbeat_time,
        MAX(time) AS max_heartbeat_time
    FROM
        heartbeats_with_diff
    WHERE
        diff IS NOT NULL
    GROUP BY
        project,
        language,
        editor,
        operating_system,
        machine,
        branch