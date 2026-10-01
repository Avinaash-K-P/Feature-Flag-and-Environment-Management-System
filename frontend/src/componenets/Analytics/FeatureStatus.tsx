import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
)

interface FeatureStatusProps {
  active: number
  inactive: number
}

function FeatureStatus({
  active,
  inactive,
}: FeatureStatusProps) {

  const data = {
    labels: ['Active', 'Inactive'],

    datasets: [
      {
        data: [active, inactive],
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
  }

  return (
    <div className="feature-status-chart">
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  )
}

export default FeatureStatus