import React from 'react';
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  RadialLinearScale,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import merge from 'lodash/merge';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';

type Props<T> = {
  labels: T[];
  totalDataList: number[];
  dataList: number[];
  className?: string;
  options?: ChartOptions<'radar'>;
  data?: Partial<ChartData<'radar'>>;
};

ChartJS.register(RadialLinearScale);

function RadarChart<T>({
  labels,
  totalDataList,
  dataList,
  className,
  options: customOptions,
  data: customData,
}: Props<T>) {
  const defaultData: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        label: '내 점수',
        data: dataList,
        backgroundColor: hexToRGBA(COLORS.primary[500], 0.2),
        borderColor: COLORS.primary[500],
        pointBackgroundColor: COLORS.primary[500],
        pointBorderColor: COLORS.primary[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.secondary[500],
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: '전체 평균',
        data: totalDataList,
        backgroundColor: hexToRGBA(COLORS.accent[500], 0.2),
        borderColor: COLORS.accent[500],
        pointBackgroundColor: COLORS.accent[500],
        pointBorderColor: COLORS.accent[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.accent[500],
        borderWidth: 2,
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

            return score.toFixed(1);
          },
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 3,
        pointLabels: {
          font: {
            size: 14,
            weight: '500',
            family: 'pretendard',
          },
        },
        // 간격
        ticks: {
          stepSize: 1,
          display: false,
        },
        // 배경 선
        grid: {
          color: hexToRGBA(COLORS.primary[500], 0.2),
          lineWidth: 1,
        },
        // 수직 선
        angleLines: { color: hexToRGBA(COLORS.primary[500], 0.2) },
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

export default React.memo(RadarChart);
