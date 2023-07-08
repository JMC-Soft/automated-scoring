import React from 'react';
import { ChartOptions, ChartData, Plugin } from 'chart.js';
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
  innerText?: string;
};

function NormalDistributionGraph({
  innerText,
  rangeStart = 0,
  rangeEnd = 0,
  legend = false,
  title = false,
  tooltip = false,
  xGrid = false,
  yGrid = false,
  className,
}: Props) {
  const dataPoints = createNormalDistData(50, 20, 0, 100);

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
    responsive: true,
    maintainAspectRatio: false,
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

  const plugins: Plugin<'line'>[] = [
    {
      id: 'normal-distribution-graph',
      afterDraw: (chart) => {
        const { ctx } = chart;
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;
        const txt = innerText || '';
        if (ctx) {
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = '#000';
          ctx.font = 'bold 20px sans-serif';
          ctx.fillText(
            txt,
            (xAxis.left + xAxis.right) / 2,
            (yAxis.top + yAxis.bottom) / 1.2,
          );
          ctx.restore();
        }
      },
    },
  ];

  return (
    <div className={className}>
      <Line data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default React.memo(NormalDistributionGraph);
