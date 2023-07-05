'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

type Props = {
  dataset1: number;
  className?: string;
};

function HorizontalBarChart({ dataset1, className }: Props) {
  const data: ChartData<'bar'> = {
    labels: ['topic'],
    datasets: [
      {
        label: '점수 분포',
        data: [dataset1],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawTicks: false,
          display: false,
        },
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        max: 100,
        grid: {
          drawTicks: false,
          display: false,
        },
        title: {
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
export default React.memo(HorizontalBarChart);
