import {
  HIGH_DATA_TOTAL_NUMBER,
  TOTAL_STATISTICS,
} from '@/app/api/const/dataSet';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';
import { EssayTotal, TotalStatistics } from '@/app/api/lib/types';

const calculateEssayTotal = (
  totalScore: number,
  STATISTICS: TotalStatistics,
): EssayTotal => {
  const lowerStudents = Object.keys(STATISTICS.data).reduce(
    (acc: number, cur: string) => {
      return Number(cur) < totalScore ? acc + STATISTICS.data[cur] : acc;
    },
    0,
  );

  const cumulativePercentage = (lowerStudents / HIGH_DATA_TOTAL_NUMBER) * 100;

  return {
    score: totalScore,
    average: TOTAL_STATISTICS.average,
    grade: calculateGrade(cumulativePercentage),
    percentage: cumulativePercentage,
    min: TOTAL_STATISTICS.min,
    max: TOTAL_STATISTICS.max,
    median: TOTAL_STATISTICS.median,
    Q1: TOTAL_STATISTICS.Q1,
    Q3: TOTAL_STATISTICS.Q3,
  };
};

export default calculateEssayTotal;
