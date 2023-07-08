import {
  HIGH_DATA_TOTAL_NUMBER,
  TOTAL_STATISTICS,
} from '@/app/api/const/dataSet';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';

const calculateEssayTotal = (totalScore: number) => {
  const result = {
    score: totalScore,
    average: TOTAL_STATISTICS.average,
    percentageStart: 0,
    percentageEnd: 0,
  };

  const lowerStudents = Object.keys(TOTAL_STATISTICS.data).reduce(
    (acc: number, cur: string) => {
      return Number(cur) <= totalScore ? acc + TOTAL_STATISTICS.data[cur] : acc;
    },
    0,
  );

  const topPercentage = (lowerStudents / HIGH_DATA_TOTAL_NUMBER) * 100;
  const totalGrade = calculateGrade(topPercentage);

  result.percentageStart = ('E'.charCodeAt(0) - totalGrade.charCodeAt(0)) * 20;
  result.percentageEnd = result.percentageStart + 20;

  return result;
};

export default calculateEssayTotal;
