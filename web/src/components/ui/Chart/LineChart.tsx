'use client';

import React from 'react';
import {
  CategoryScale,
  registerables,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  LineElement,
  LineController,
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
import clsx from 'clsx';
import COLORS from '@/lib/constants/colors';
import hexToRGBA from '@/lib/utils/colors';
import pretendard from '@/lib/constants/fonts';
import { HistoryEssay } from '@/lib/types';

ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
);

type Props = {
  dataList: HistoryEssay[];
  className: string;
  countTotal: number;
};

export function LineChart({ dataList, className, countTotal }: Props) {
  const hasData = dataList.length > 0;

  const labels = dataList.map(
    (v, i) => `${countTotal - (dataList.length - 1) + i ?? 0}회차`,
  );

  const data: ChartData = {
    labels,
    datasets: [
      {
        label: '내용',
        data: dataList.map((v) => v?.scoringResult.cont.score ?? 0),
        backgroundColor: hexToRGBA(COLORS.accent[500], 0.85),
        type: 'bar',
        barPercentage: 0.75,
      },
      {
        label: '구성',
        data: dataList?.map((v) => v?.scoringResult.org.score ?? 0),
        backgroundColor: hexToRGBA(COLORS.success[500], 0.85),
        barPercentage: 0.75,
        type: 'bar',
      },
      {
        label: '표현',
        data: dataList?.map((v) => v?.scoringResult.exp.score ?? 0),
        backgroundColor: hexToRGBA(COLORS.secondary[500], 0.85),
        barPercentage: 0.75,
        type: 'bar',
      },

      {
        label: '종합',
        data: dataList?.map((v) => v?.scoringResult.total.score ?? 0),
        borderColor: COLORS.secondary[500],
        backgroundColor: hexToRGBA(COLORS.secondary[500], 0.7),
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
                  dataset.backgroundColor) as string,
                lineWidth: 2,
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
        max: 18,
        ticks: {
          stepSize: 3,
        },
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
    <div
      className={clsx('overflow-auto bg-white p-4 scrollbar-hide', className)}
    >
      {hasData && <Chart type="line" data={data} options={options} />}
    </div>
  );
}

export default LineChart;
