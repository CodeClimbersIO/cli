import { useTheme } from '@mui/material'
import { BarDatum, ResponsiveBar, ResponsiveBarSvgProps } from '@nivo/bar'

type Props = ResponsiveBarSvgProps<BarDatum>

export const WeeklyBarGraph = (props: Props) => {
  const formatMinutes = (minutes: number | string) => {
    if (typeof minutes !== 'number') return
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }
  const theme = useTheme()
  return (
    <ResponsiveBar
      {...props}
      role="application"
      keys={['minutes']}
      indexBy="name"
      margin={{ top: 50, right: 10, bottom: 50, left: 10 }}
      padding={0.3}
      enableLabel={false}
      isInteractive={false}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={`${theme.palette.graphColors.green}20`}
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
          id: 'greenGradient',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: `${theme.palette.graphColors.green}20` },
            { offset: 100, color: `${theme.palette.graphColors.green}00` },
          ],
        },
      ]}
      fill={[{ match: '*', id: 'greenGradient' }]}
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
                      stroke={theme.palette.graphColors.green}
                      strokeWidth={2}
                    />
                  </g>
                </g>
              ))}
            </>
          )
        },
      ]}
    />
  )
}
