'use client';

import React from 'react';
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Plugin,
  Title,
  SubTitle,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import COLORS from '@/lib/constants/colors';
import pretendard from '@/lib/constants/fonts';

ChartJS.register(Title, Tooltip, ArcElement, SubTitle);

function OverallPercentage({ percentage }: { percentage: number }) {
  const data: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [COLORS.primary[500], COLORS.background[500]],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    cutout: '70%',
    circumference: 180,
    plugins: {
      title: {
        display: true,
        text: '전체\n백분위',
        position: 'top',
        font(context) {
          const { height } = context.chart;
          const size = Math.round(height / 12);

          return {
            weight: 'bold',
            size,
            family: pretendard.style.fontFamily,
          };
        },
      },
    },
  };

  const textCenterPlugin: Plugin<'doughnut'> = {
    id: 'textCenter',
    beforeDatasetDraw: (chart) => {
      const { ctx, data: chartData, height } = chart;
      const size = Math.round(height / 8);

      const text = chartData.datasets[0].data[0];
      ctx.save();
      ctx.font = `bold ${size}px pretendard`;
      ctx.fillStyle = '#000033';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        `${text}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y - Math.round(height / 15),
      );
    },
  };

  return (
    <article className="h-full w-full overflow-auto bg-white px-6 py-4 scrollbar-hide">
      {percentage && (
        <Doughnut data={data} options={options} plugins={[textCenterPlugin]} />
      )}
    </article>
  );
}

export default OverallPercentage;
