import { EssaySub, Statistics } from '@/app/api/lib/types';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';
import { HIGH_DATA_TOTAL_NUMBER } from '@/app/api/const/dataSet';

const calculateEssaySub = (sub: number[], STATISTICS: Statistics): EssaySub => {
  const score = sub.reduce((acc: number, cur: number) => acc + cur, 0);

  const lowerStudents = Object.keys(STATISTICS.data).reduce(
    (acc: number, cur: string) => {
      return Number(cur) <= score ? acc + STATISTICS.data[cur] : acc;
    },
    0,
  );

  const cumulativePercentage = (lowerStudents / HIGH_DATA_TOTAL_NUMBER) * 100;

  return {
    score,
    sub,
    average: STATISTICS.average,
    grade: calculateGrade(cumulativePercentage),
  };
};

export default calculateEssaySub;
