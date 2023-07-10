import { EssaySub, SubStatistics } from '@/app/api/lib/types';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';
import { HIGH_DATA_TOTAL_NUMBER } from '@/app/api/const/dataSet';

const calculateEssaySub = (
  sub: number[],
  STATISTICS: SubStatistics,
): EssaySub => {
  const score = sub.reduce((acc: number, cur: number) => acc + cur, 0);

  const resSub = sub.reduce<{ score: number; average: number }[]>(
    (acc, cur, idx) => {
      acc.push({ score: cur, average: STATISTICS.subAverage[idx] });
      return acc;
    },
    [],
  );

  const lowerStudents = Object.keys(STATISTICS.data).reduce(
    (acc: number, cur: string) => {
      return Number(cur) < score ? acc + STATISTICS.data[cur] : acc;
    },
    0,
  );

  const cumulativePercentage = (lowerStudents / HIGH_DATA_TOTAL_NUMBER) * 100;

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
