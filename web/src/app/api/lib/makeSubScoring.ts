import { Statistics } from '@/app/api/lib/types';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';
import reduceObject from '@/app/api/lib/utils/reduceObject';
import scorePercentageCallback from '@/app/api/lib/callback/scorePercentageCallback';

const makeSubScoring = (
  DATA_TOTAL_NUMBER: number,
  STATISTICS: Statistics,
  sum: number,
  title: string,
) => {
  const { data, standardDeviation, ...remainStatistics } = STATISTICS;

  return {
    score: sum,
    grade: calculateGrade(sum, STATISTICS.max),
    title,
    percentage: Math.round(
      (reduceObject(STATISTICS.data, scorePercentageCallback(sum), 0) /
        DATA_TOTAL_NUMBER) *
        100,
    ),
    ...remainStatistics,
  };
};

export default makeSubScoring;
