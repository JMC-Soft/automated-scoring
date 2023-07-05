import React from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import merge from 'lodash/merge';

type Props<T> = {
  labels: T[];
  dataList: number[];
  className?: string;
  options?: ChartOptions<'radar'>;
  data?: Partial<ChartData<'radar'>>;
};

export default function TriangleRadarChart<T>({
  labels,
  dataList,
  className,
  options: customOptions,
  data: customData,
}: Props<T>) {
  const defaultData: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        data: dataList,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgb(0, 123, 255)',
        pointBackgroundColor: 'rgb(0, 123, 255)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(0, 123, 255)',
        borderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  const defaultOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            const score = context.raw as number;
            let grade;
            if (score === 5) grade = 'A';
            else if (score === 4) grade = 'B';
            else if (score === 3) grade = 'C';
            else if (score === 2) grade = 'D';
            else if (score === 1) grade = 'E';
            else grade = 'F';
            return `${grade}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 5,
        pointLabels: {
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        // 간격
        ticks: {
          stepSize: 1,
          display: false,
        },
        // 배경 선
        grid: {
          color: 'rgba(255, 99, 132, 0.2)',
          lineWidth: 1,
        },
        // 수직 선
        angleLines: { color: 'rgba(255, 99, 132, 0.2)' },
      },
    },
  };

  const data = merge({}, defaultData, customData);
  const options = merge({}, defaultOptions, customOptions);

  return (
    <div className={className}>
      <Radar data={data} options={options} />
    </div>
  );
}
