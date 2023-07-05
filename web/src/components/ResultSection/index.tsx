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
import OverView from '@/components/ResultSection/OverView';
import SummeryView from '@/components/ResultSection/SummaryView';
import DetailView from '@/components/ResultSection/DetailView';

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

function ResultSection() {
  return (
    <section className="result-grid flex-1 ">
      <OverView />
      <SummeryView />
      <DetailView />
    </section>
  );
}

export default ResultSection;
