'use client';

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
} from 'chart.js';
import { Detail } from '@/lib/types';
import hexToRGBA from '@/lib/utils/colors';
import COLORS from '@/lib/constants/colors';
import DEFAULT_OPTIONS from '@/lib/constants/chart';
import pretendard from '@/lib/constants/fonts';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

export const CATEGORY_LIST = {
  '주제의 명료성': '주제 명료성',
  '근거의 적절성': '근거 적절성',
  '프롬프트 독해력': '독해력',
  '문단 내 구조의 적절성': '문단 내 구조',
  '문단 간 구조의 적절성': '문단 간 구조',
  '구조의 일관성': '구조 일관성',
  '분량의 적절성': '분량 적절성',
  '문법의 적절성': '문법',
  '단어 사용의 적절성': '단어 사용',
  '문장 표현의 적절성': '문장 표현',
};

type Props = {
  myDataList: Detail[];
  averageDataList: number[];
};

function RadarView({ myDataList, averageDataList }: Props) {
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);
  // const [cache, setCache] = useState<CanvasGradient | null>(null);
  // const createConicGradient = (context: ScriptableContext<'radar'>) => {
  //   const { chartArea } = context.chart;
  //   if (!chartArea) {
  //     // This case happens on initial chart load
  //     return undefined;
  //   }
  //
  //   const chartWidth = chartArea.right - chartArea.left;
  //   const chartHeight = chartArea.bottom - chartArea.top;
  //   if (width !== chartWidth || height !== chartHeight) {
  //     setCache(null);
  //   }
  //
  //   let gradient: null | CanvasGradient = cache;
  //   if (!gradient) {
  //     setWidth(chartWidth);
  //     setHeight(chartHeight);
  //     const centerX = (chartArea.left + chartArea.right) / 2;
  //     const centerY = (chartArea.top + chartArea.bottom) / 2;
  //     const { ctx } = context.chart;
  //     gradient = ctx.createConicGradient((Math.PI * -1) / 2, centerX, centerY);
  //     gradient.addColorStop(0, hexToRGBA(COLORS.accent[500], 0.1)); // blue
  //     gradient.addColorStop(0.3, hexToRGBA(COLORS.accent[500], 0.1)); // orange
  //     gradient.addColorStop(0.301, hexToRGBA(COLORS.success[500], 0.1)); // turqoise
  //     gradient.addColorStop(0.7, hexToRGBA(COLORS.success[500], 0.1)); // green
  //     gradient.addColorStop(0.701, hexToRGBA(COLORS.primary[500], 0.1)); // blue
  //     gradient.addColorStop(1, hexToRGBA(COLORS.primary[500], 0.1)); // blue
  //     setCache(gradient);
  //   }
  //
  //   return gradient;
  // };

  const data: ChartData<'radar'> = {
    labels: myDataList.map(
      (value) => CATEGORY_LIST[value.title as keyof typeof CATEGORY_LIST],
    ),
    datasets: [
      {
        label: '내 점수',
        data: myDataList.map((value) => value.score),
        backgroundColor: hexToRGBA(COLORS.secondary[500], 0.2),
        // backgroundColor: createConicGradient,
        borderColor: hexToRGBA(COLORS.secondary[500], 1),
        pointBackgroundColor: COLORS.secondary[500],
        pointBorderColor: COLORS.secondary[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.secondary[500],
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: '전체 평균',
        data: averageDataList,
        backgroundColor: hexToRGBA(COLORS.warning[500], 0.15),
        // backgroundColor: createConicGradient,
        borderColor: hexToRGBA(COLORS.warning[500], 1),
        pointBackgroundColor: COLORS.warning[500],
        pointBorderColor: COLORS.warning[500],
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.warning[500],
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    ...DEFAULT_OPTIONS,
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
          color: (context) => {
            const idx = context.index;
            if (idx >= 0 && idx < 3) return hexToRGBA(COLORS.accent[500], 1);
            if (idx >= 3 && idx < 7) return hexToRGBA(COLORS.success[500], 1);
            return hexToRGBA(COLORS.secondary[500], 1);
          },
          font: {
            size: 14,
            weight: '700',
            family: pretendard.style.fontFamily,
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
        // angleLines: {
        //   color: (context) => {
        //     const idx = context.index;
        //     if (idx >= 0 && idx < 3) return COLORS.accent[500];
        //     if (idx >= 3 && idx < 7) return COLORS.success[500];
        //     return COLORS.primary[500];
        //   },
        // },
      },
    },
  };

  return (
    <article className="col-start-4 col-end-5 row-start-2 row-end-4 bg-white p-8">
      <Radar data={data} options={options} />
    </article>
  );
}

export default RadarView;
