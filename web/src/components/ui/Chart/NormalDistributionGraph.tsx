import React from 'react';
import { ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import createNormalDistData from '@/lib/utils/chart/createNormalDistData';

type Props = {
  rangeStart?: number;
  rangeEnd?: number;
  legend?: boolean;
  title?: boolean;
  tooltip?: boolean;
  xGrid?: boolean;
  yGrid?: boolean;
  className?: string;
};

export default function NormalDistributionGraph({
  rangeStart = 0,
  rangeEnd = 0,
  legend = false,
  title = false,
  tooltip = false,
  xGrid = false,
  yGrid = false,
  className,
}: Props) {
  const dataPoints = createNormalDistData(50, 15, 0, 100);

  const data: ChartData<'line'> = {
    labels: dataPoints.map((point) => point.x),
    datasets: [
      {
        label: '전체',
        data: dataPoints.map((point) =>
          point.x <= rangeStart || point.x >= rangeEnd ? point.y : NaN,
        ),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointRadius: 0,
      },
      {
        label: '소속',
        data: dataPoints.map((point) =>
          point.x >= rangeStart && point.x <= rangeEnd ? point.y : NaN,
        ),
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgb(0, 123, 255)',
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: legend,
      },
      title: {
        display: title,
      },
      tooltip: {
        enabled: tooltip,
      },
    },
    scales: {
      x: {
        display: xGrid,
      },
      y: {
        display: yGrid,
      },
    },
  };

  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
}
