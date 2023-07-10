import {
  HIGH_DATA_TOTAL_NUMBER,
  TOTAL_STATISTICS,
} from '@/app/api/const/dataSet';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';

const calculateEssayTotal = (totalScore: number) => {
  const totalPercentage = { start: 0, end: 0 };

  const lowerStudents = Object.keys(TOTAL_STATISTICS.data).reduce(
    (acc: number, cur: string) => {
      return Number(cur) <= totalScore ? acc + TOTAL_STATISTICS.data[cur] : acc;
    },
    0,
  );
  const topPercentage = (lowerStudents / HIGH_DATA_TOTAL_NUMBER) * 100;
  const totalGrade = calculateGrade(topPercentage);

  if (totalGrade === 'A') {
    totalPercentage.start = 80;
    totalPercentage.end = 100;
  }
  if (totalGrade === 'B') {
    totalPercentage.start = 60;
    totalPercentage.end = 80;
  }
  if (totalGrade === 'C') {
    totalPercentage.start = 40;
    totalPercentage.end = 60;
  }
  if (totalGrade === 'D') {
    totalPercentage.start = 20;
    totalPercentage.end = 40;
  }
  if (totalGrade === 'E') {
    totalPercentage.start = 0;
    totalPercentage.end = 20;
  }

  return {
    score: totalScore,
    average: TOTAL_STATISTICS.average,
    percentageStart: totalPercentage.start,
    percentageEnd: totalPercentage.end,
  };
};

export default calculateEssayTotal;
