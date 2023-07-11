import { EssaySub, SubStatistics } from '@/app/api/lib/types';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';
import { HIGH_DATA_TOTAL_NUMBER } from '@/app/api/const/dataSet';

const calculateEssaySub = (
  sub: number[],
  STATISTICS: SubStatistics,
): EssaySub => {
  // // 각 점수의 합
  // const score = sub.reduce((acc: number, cur: number) => acc + cur, 0);
  //
  // // sub: [2, 2, 2]
  // // resSub: [{ score: 2, average: 2.3 }, { score: 2, average: 2.3 }, { score: 2, average: 2.3 }]
  // const resSub = sub.reduce<{ score: number; average: number }[]>(
  //   (acc, cur, idx) => {
  //     acc.push({ score: cur, average: STATISTICS.detail[idx] });
  //     return acc;
  //   },
  //   [],
  // );
  let score = 0;
  const resSub: { score: number; average: number }[] = [];

  // resSub: [{ score: 2, average: 2.3 }, { score: 2, average: 2.3 }, { score: 2, average: 2.3 }]
  sub.forEach((cur, idx) => {
    score += cur;
    resSub.push({ score: cur, average: STATISTICS.detail[idx] });
  });

  const lowerStudents = Object.keys(STATISTICS.data).reduce(
    (acc: number, cur: string) => {
      return Number(cur) < score ? acc + STATISTICS.data[cur] : acc;
    },
    0,
  );

  const cumulativePercentage = Math.round(
    (lowerStudents / HIGH_DATA_TOTAL_NUMBER) * 100,
  );

  return {
    score,
    sub: resSub,
    average: STATISTICS.average,
    grade: calculateGrade(cumulativePercentage),
    percentage: cumulativePercentage,
    min: STATISTICS.min,
    max: STATISTICS.max,
    median: STATISTICS.median,
    Q1: STATISTICS.Q1,
    Q3: STATISTICS.Q3,
  };
};

export default calculateEssaySub;
