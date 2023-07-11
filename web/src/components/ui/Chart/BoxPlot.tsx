import React from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import merge from 'lodash/merge';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';

type Props = {
  className?: string;
  options?: ChartOptions<'boxplot'>;
  data?: Partial<ChartData<'boxplot'>>;
};

export function BoxPlot({
  className,
  options: customOptions,
  data: customData,
}: Props) {
  const defaultData: ChartData<'boxplot'> = {
    labels: ['표현', '구성', '내용', '종합'], // original
    datasets: [
      {
        label: '11',
        outlierBackgroundColor: hexToRGBA(COLORS.accent[500], 0.5),
        outlierBorderColor: COLORS.accent[500],
        data: [
          { min: 17, q1: 22, median: 26, q3: 29, max: 30, outliers: [25] },
          { min: 3, q1: 5, median: 6, q3: 8, max: 9, outliers: [6] },
          { min: 5, q1: 6, median: 9, q3: 11, max: 12, outliers: [8] },
          { min: 3, q1: 5, median: 6, q3: 8, max: 9, outliers: [6] },
        ],
        backgroundColor: hexToRGBA(COLORS.secondary[500], 0.5),
        borderColor: COLORS.secondary[500],
        borderWidth: 2,
      },
    ],
  };

  const defaultOptions: ChartOptions<'boxplot'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = merge({}, defaultData, customData);
  const options = merge({}, defaultOptions, customOptions);

  return (
    <div className={className}>
      <Chart type="boxplot" data={data} options={options} />
    </div>
  );
}

export default BoxPlot;
