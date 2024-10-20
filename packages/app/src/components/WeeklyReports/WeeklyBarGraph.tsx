import { useTheme } from '@mui/material'
import { BarDatum, ResponsiveBar, ResponsiveBarSvgProps } from '@nivo/bar'
import { getColorForRating } from '../../api/services/report.service'
import { formatMinutes } from '../../utils/time'

type Props = ResponsiveBarSvgProps<BarDatum> & {
  rating: CodeClimbers.WeeklyScoreRating
}

export const WeeklyBarGraph = (props: Props) => {
  const theme = useTheme()
  const color = getColorForRating(props.rating)
  const trimmedData = props.data.map((record) => {
    if (typeof record.name === 'number') return record
    const length = record.name.length
    return {
      ...record,
      name: length > 13 ? `${record.name.slice(0, 12)}..` : record.name,
    }
  })

  return (
    <ResponsiveBar
      role="application"
      keys={['minutes']}
      indexBy="name"
      margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
      padding={0.3}
      enableLabel={false}
      isInteractive={false}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={`${color.main}20`}
      axisTop={null}
      axisRight={null}
      layout="vertical"
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={null}
      enableGridY={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      legends={[]}
      defs={[
        {
          id: `${color.main}gradient`,
          type: 'linearGradient',
          colors: [
            { offset: 0, color: `${color.main}20` },
            { offset: 100, color: `${color.main}00` },
          ],
        },
      ]}
      fill={[{ match: '*', id: `${color.main}gradient` }]}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: theme.palette.text.primary,
            },
          },
        },
      }}
      layers={[
        'grid',
        'bars',
        'axes',
        'markers',
        'legends',
        'annotations',
        ({ bars }) => {
          return (
            <>
              {bars.map((bar) => (
                <g key={bar.key}>
                  <g transform={`translate(${bar.x},${bar.y - 15})`}>
                    <text
                      x={bar.width / 2}
                      y={-10}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={theme.palette.text.primary}
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {formatMinutes(bar.data.data.minutes)}
                    </text>
                  </g>
                  <g transform={`translate(${bar.x},${bar.y})`}>
                    <line
                      x1={0}
                      y1={0}
                      x2={bar.width}
                      y2={0}
                      stroke={color.main}
                      strokeWidth={2}
                    />
                  </g>
                </g>
              ))}
            </>
          )
        },
      ]}
      {...props}
      data={trimmedData}
    />
  )
}
