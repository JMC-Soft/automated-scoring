// import { EssaySub, SubStatistics } from '@/app/api/lib/types';
// import { HIGH_DATA_TOTAL_NUMBER } from '@/app/api/const/dataSet';
//
// const calculateEssaySub = (
//   sub: number[],
//   STATISTICS: SubStatistics,
// ): EssaySub => {
//   let score = 0;
//   const resSub: { score: number; average: number }[] = [];
//
//   // resSub: [{ score: 2, average: 2.3 }, { score: 2, average: 2.3 }, { score: 2, average: 2.3 }]
//   sub.forEach((cur, idx) => {
//     score += cur;
//     resSub.push({ score: cur, average: STATISTICS.detail[idx] });
//   });
//
//   const lowerStudents = Object.keys(STATISTICS.data).reduce(
//     (acc: number, cur: string) => {
//       return Number(cur) < score ? acc + STATISTICS.data[cur] : acc;
//     },
//     0,
//   );
//
//   const cumulativePercentage = Math.round(
//     (lowerStudents / HIGH_DATA_TOTAL_NUMBER) * 100,
//   );
//
//   return {
//     score,
//     sub: resSub,
//     average: STATISTICS.average,
//     grade: STATISTICS.grade[score],
//     percentage: cumulativePercentage,
//     min: STATISTICS.min,
//     max: STATISTICS.max,
//     median: STATISTICS.median,
//     Q1: STATISTICS.Q1,
//     Q3: STATISTICS.Q3,
//   };
// };
//
// export default calculateEssaySub;
