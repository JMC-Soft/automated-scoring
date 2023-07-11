import React from 'react';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import merge from 'lodash/merge';

type Props = {
  percentage: number;
  className?: string;
  options?: ChartOptions<'doughnut'>;
  data?: Partial<ChartData<'doughnut'>>;
};

export function HalfDoughnutChart({
  className,
  options: customOptions,
  data: customData,
  percentage,
}: Props) {
  const defaultData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#0066B3', '#F0F8FF'],
        borderWidth: 0,
      },
    ],
  };

  const defaultOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    cutout: 40,
    circumference: 180,
    plugins: {
      title: {
        display: true,
        text: '전체\n백분위',
        font: {
          size: 18,
          weight: 'bold',
          family: 'pretendard',
        },
      },
    },
  };

  const textCenter: Plugin<'doughnut'> = {
    id: 'textCenter',
    beforeDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.font = 'bold 2rem pretendard';
      ctx.fillStyle = '#000033';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${percentage}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      );
    },
  };

  const plugins: Plugin<'doughnut'>[] = [textCenter];

  const data = merge({}, defaultData, customData);
  const options = merge({}, defaultOptions, customOptions);

  return (
    <div className={className}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default React.memo(HalfDoughnutChart);
