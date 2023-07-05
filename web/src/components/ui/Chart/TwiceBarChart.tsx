'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

type Props = {
  dataset1: number;
  dataset2: number;
  className?: string;
};

function TwiceBarChart({ dataset1, dataset2, className }: Props) {
  const data: ChartData<'bar'> = {
    labels: ['Average', 'My Score'],
    datasets: [
      {
        label: '점수 분포',
        data: [dataset1, dataset2],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(0, 123, 255, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(0, 123, 255)'],
        borderWidth: 1,
        barPercentage: 0.4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={className}>
      <Bar data={data} options={options} />
    </div>
  );
}
export default React.memo(TwiceBarChart);
