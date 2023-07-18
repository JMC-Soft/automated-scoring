import React from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import merge from 'lodash/merge';

export function ComboChart({
  className,
  options: customOptions,
  data: customData,
}: {
  className?: string;
  options?: ChartOptions;
  data?: Partial<ChartData>;
}) {
  const labels = Array(3)
    .fill(0)
    .map((_, i) => i + 1);

  const defaultData = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Dataset 1',
        borderColor: 'rgb(99,255,255)',
        borderWidth: 2,
        fill: false,
        data: labels.map(() => Math.floor(Math.random() * 100)),
      },
      {
        type: 'bar' as const,
        label: 'Dataset 2',
        backgroundColor: 'rgb(75,94,192)',
        data: labels.map(() => Math.floor(Math.random() * 10)),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Dataset 2',
        backgroundColor: 'rgb(192,75,75)',
        data: labels.map(() => Math.floor(Math.random() * 10)),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Dataset 2',
        backgroundColor: 'rgb(100,192,75)',
        data: labels.map(() => Math.floor(Math.random() * 10)),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = merge({}, defaultData, customData);
  const options = merge({}, defaultOptions, customOptions);

  return (
    <div className={className}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}

export default ComboChart;
