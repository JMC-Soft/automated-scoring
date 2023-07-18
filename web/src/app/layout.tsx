import './globals.css';
import React from 'react';
import localFont from 'next/font/local';
import {
  ArcElement,
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
import {
  BoxAndWiskers,
  BoxPlotController,
} from '@sgratzl/chartjs-chart-boxplot';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import getUser from '@/lib/utils/api/getUser';
import StoreInitializer from '@/components/StoreInitializer';
import pretendard from '@/lib/constants/fonts';

// const pretendard = Roboto({
//   weight: ['100', '300', '400', '500', '700', '900'],
//   subsets: ['latin'],
// });

export const metadata = {
  title: '한국어 에세이 자동채점',
  description: '한국어 에세이 자동채점 프로그램',
};

ChartJS.register(
  RadialLinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
  LineElement,
  BoxPlotController,
  BoxAndWiskers,
  BarElement,
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <StoreInitializer user={user} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
