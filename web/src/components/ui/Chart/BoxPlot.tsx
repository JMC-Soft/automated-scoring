import React from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import merge from 'lodash/merge';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';
import { Statistic } from '@/lib/types';

type Props = {
  className?: string;
  statistics: Statistic[];
  labels: string[];
  options?: ChartOptions<'boxplot'>;
  data?: Partial<ChartData<'boxplot'>>;
};

export function BoxPlot({
  className,
  labels,
  options: customOptions,
  data: customData,
  statistics,
}: Props) {
  const defaultData: ChartData<'boxplot'> = {
    labels,
    datasets: [
      {
        label: '11',
        outlierBackgroundColor: hexToRGBA(COLORS.accent[500], 0.5),
        outlierBorderColor: COLORS.accent[500],
        data: statistics.map((value) => {
          const { min, Q1: q1, median, Q3: q3, max, score } = value;
          return {
            min,
            q1,
            median,
            q3,
            max,
            outliers: [score],
          };
        }),
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
