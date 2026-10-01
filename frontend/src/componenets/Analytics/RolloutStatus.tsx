import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
)

interface RolloutStatusProps {
  active: number
  inactive: number
}

function RolloutStatus({
  active,
  inactive,
}: RolloutStatusProps) {

  const data = {
    labels: ['Rollouts'],

    datasets: [
      {
        label: 'Active',
        data: [active],
        borderWidth: 1,
      },
      {
        label: 'Inactive',
        data: [inactive],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  return (
    <div className="rollout-status-chart">
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default RolloutStatus