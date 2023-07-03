import React from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';

type Props<T> = {
  labels: T[];
  dataList: number[];
  className?: string;
};

export default function TriangleRadarChart<T>({
  labels,
  dataList,
  className,
}: Props<T>) {
  const data: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        data: dataList,
        // backgroundColor: primaryColors[200],
        // borderColor: primaryColors[500],
        // pointBackgroundColor: primaryColors[500],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: complementaryColors[500],
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
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
        ticks: {
          stepSize: 1,
          display: false,
        },
      },
    },
  };

  return (
    <div className={className}>
      <Radar data={data} options={options} />
    </div>
  );
}
