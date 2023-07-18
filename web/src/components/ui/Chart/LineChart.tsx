'use client';

import React from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  LegendItem,
  PointStyle,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import COLORS from '@/lib/constants/colors';
import hexToRGBA from '@/lib/utils/colors';
import pretendard from '@/lib/constants/fonts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
);

type Props = {
  className?: string;
};

export function DoughnutChart({ className }: Props) {
  const labels = ['월', '화', '수', '목', '금', '토', '일', '금', '토', '일'];

  const data: ChartData = {
    labels,
    datasets: [
      {
        label: '표현',
        data: Array(10)
          .fill(0)
          .map(() => Math.floor(Math.random() * 3 + 6)),
        backgroundColor: COLORS.accent[500],
        barPercentage: 0.7,
        type: 'bar',
      },
      {
        label: '구성',
        data: Array(10)
          .fill(0)
          .map(() => Math.floor(Math.random() * 3 + 9)),
        backgroundColor: COLORS.success[500],
        barPercentage: 0.7,
        type: 'bar',
      },
      {
        label: '내용',
        data: Array(10)
          .fill(0)
          .map(() => Math.floor(Math.random() * 3 + 6)),
        backgroundColor: COLORS.secondary[500],
        type: 'bar',
        barPercentage: 0.7,
      },
      {
        label: '종합',
        data: Array(10)
          .fill(0)
          .map(() => Math.floor(Math.random() * 10 + 20)),
        borderColor: COLORS.primary[500],
        backgroundColor: hexToRGBA(COLORS.primary[500], 0.2),
        type: 'line',
        yAxisID: 'y1',
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick(e, legendItem, legend) {
          const datasets = legend.legendItems?.map((dataset) => {
            return dataset.text;
          });

          const index = datasets?.indexOf(legendItem.text) ?? -1;
          if (legend.chart.isDatasetVisible(index)) {
            legend.chart.hide(index);
          } else {
            legend.chart.show(index);
          }
        },
        labels: {
          usePointStyle: true,
          pointStyleWidth: 40,
          generateLabels(chart: ChartJS): LegendItem[] {
            const visibility: boolean[] = [];
            for (let i = 0; i < chart.data.datasets.length; i += 1) {
              if (chart.isDatasetVisible(i)) {
                visibility.push(false);
              } else {
                visibility.push(true);
              }
            }

            const pointStyle: PointStyle[] = [];

            chart.data.datasets.forEach((dataset) => {
              if (dataset.type === 'line') {
                pointStyle.push('line');
              } else {
                pointStyle.push('rect');
              }
            });

            return chart.data.datasets.map((dataset, i) => {
              return {
                boxWidth: 200,
                text: dataset.label ?? '범례',
                hidden: visibility[i] ?? false,
                fillStyle: (dataset.backgroundColor ??
                  COLORS.primary[500]) as string,
                strokeStyle: (dataset.borderColor ??
                  COLORS.primary[500]) as string,
                lineWidth: 1,
                pointStyle: pointStyle[i],
              };
            });
          },
        } as any,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 15,
        position: 'left',
        type: 'linear',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        title: {
          display: true,
          text: '채점 영역',
          color: COLORS.text[500],
          font: {
            size: 14,
            family: pretendard.style.fontFamily,
            weight: 'bold',
          },
        },
      },
      y1: {
        min: 0,
        max: 30,
        position: 'right',
        type: 'linear',
        title: {
          display: true,
          text: '종합',
          color: COLORS.text[500],
          font: {
            size: 14,
            family: pretendard.style.fontFamily,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className={className}>
      <Chart type="line" data={data} options={options} />
    </div>
  );
}

export default React.memo(DoughnutChart);
