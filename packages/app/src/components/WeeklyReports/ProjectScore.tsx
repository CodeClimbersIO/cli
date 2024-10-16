import { Box, useTheme } from '@mui/material'
import { Bar } from 'react-chartjs-2'

interface Props {
  projectScore: CodeClimbers.WeeklyScore & {
    breakdown: CodeClimbers.PerProjectTimeOverviewDB[]
  }
}

export const ProjectScore = ({ projectScore }: Props) => {
  const theme = useTheme()
  const top5Projects = projectScore.breakdown.slice(0, 5)

  const baseColor = theme.palette.graphColors.green

  const data = {
    labels: top5Projects.map(({ name }) => name),
    datasets: [
      {
        label: 'Project Time in Minutes',
        data: top5Projects.map(({ minutes }) => minutes),
        backgroundColor: function (context: any) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) {
            return null
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          )
          gradient.addColorStop(0, `${baseColor}00`) // 10% opacity
          gradient.addColorStop(1, `${baseColor}60`) // 50% opacity
          return gradient
        },
        borderWidth: 0,
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  }

  return (
    <Box>
      <Bar data={data} options={options} />
    </Box>
  )
}
