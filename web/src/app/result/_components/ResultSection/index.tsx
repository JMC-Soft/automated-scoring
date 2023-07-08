'use client';

import React from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import OverView from '@/app/result/_components/ResultSection/OverView';
import SummeryView from '@/app/result/_components/ResultSection/SummaryView';
import DetailView from '@/app/result/_components/ResultSection/DetailView';
import { EssayResult } from '@/lib/types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
);

type Props = {
  data: EssayResult;
};

function ResultSection({ data }: Props) {
  console.dir(data);

  return (
    <section className="result-grid flex-1 ">
      <OverView
        percentageStart={data.total.percentageStart}
        percentageEnd={data.total.percentageEnd}
        totalScore={data.total.score}
        totalAverage={data.total.average}
      />
      <SummeryView exp={data.exp} cont={data.cont} org={data.org} />
      <DetailView />
    </section>
  );
}

export default ResultSection;
