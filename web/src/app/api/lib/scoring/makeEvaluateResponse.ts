// import countEssay from '@/app/api/repository/essay/countEssay';
// import {
//   EssayEntitiy,
//   EvaluateResponseDto,
//   ScoringResponseDto,
// } from '@/app/api/lib/types';
// import ApiError from '@/app/api/lib/class/ApiError';
// import {
//   HIGH_DATA_TOTAL_NUMBER,
//   EXP_STATISTICS,
//   ORG_STATISTICS,
//   CONT_STATISTICS,
// } from '@/app/api/const/dataSet';
// import makeCreatedAt from '@/app/api/lib/makeCreatedAt';
//
// const makeEvaluateResponse = async (
//   { exp, org, cont }: ScoringResponseDto,
//   essayId: string,
//   essay: EssayEntitiy,
// ): Promise<EvaluateResponseDto> => {
//   try {
//     const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);
//     function reduceObject<T>(
//       obj: { [key: string | number]: T },
//       callback: Function,
//       acc: T,
//     ) {
//       return Object.entries(obj).reduce(
//         (prev, [key, value]) => callback(acc, value, key),
//         acc,
//       );
//     }
//
//     // function filterObject<T>(
//     //   obj: { [key: string]: T },
//     //   callback: (value: T, key: string | number) => boolean,
//     // ): { [key: string]: T } {
//     //   return Object.entries(obj).reduce(
//     //     (acc: { [key: string]: T }, [key, value]) => {
//     //       if (callback(value, key)) {
//     //         acc[key] = value;
//     //       }
//     //     },
//     //     {},
//     //   );
//     // }
//
//     function filterObject<T>(
//       obj: { [key: string]: T },
//       callback: (value: T, key: string) => boolean,
//     ): { [key: string]: T } {
//       return Object.entries(obj).reduce(
//         (accumulator: { [key: string]: T }, [key, value]: [string, T]) => {
//           if (callback(value, key)) {
//             accumulator[key] = value;
//           }
//           return accumulator;
//         },
//         {},
//       );
//     }
//
//     const STATISTICS = [EXP_STATISTICS, ORG_STATISTICS, CONT_STATISTICS];
//     const resultObj = [exp, org, cont].map((value, idx) => {
//       const score = sum(value);
//       const statistics = STATISTICS[idx];
//
//       return {
//         score,
//         sub: value.map((cur, subIdx) => ({
//           score: cur,
//           average: statistics.detail[subIdx],
//         })),
//         percentage: Math.round(
//           (sum(
//             Object.values(
//               filterObject(
//                 statistics.data,
//                 (value, key) => Number(key) < score,
//               ),
//             ),
//           ) /
//             HIGH_DATA_TOTAL_NUMBER) *
//             100,
//         ),
//         // percentage: reduceObject(
//         //   STATISTICS.data,
//         //   (acc: number, value: number, key: number) => {
//         //     if (Number(key) < score) {
//         //       return acc + value;
//         //     }
//         //     return acc;
//         //   },
//         //   0,
//         // ),
//         ...STATISTICS,
//       };
//     });
//
//     // const expRes: EssaySub = calculateEssaySub(exp, EXP_STATISTICS);
//     // const orgRes: EssaySub = calculateEssaySub(org, ORG_STATISTICS);
//     // const contRes: EssaySub = calculateEssaySub(cont, CONT_STATISTICS);
//
//     // 총점 계산
//     // const totalScore = expRes.score + orgRes.score + contRes.score;
//     // const totalRes: EssayTotal = calculateEssayTotal(
//     //   totalScore,
//     //   TOTAL_STATISTICS,
//     // );
//
//     // 전체 글쓴이 수
//     const highCount = await countEssay();
//     const candidate = HIGH_DATA_TOTAL_NUMBER + highCount;
//
//     // TODO: 글자 수 & 문장수 파싱 필요
//
//     // 평가 결과 반환
//     const evaluateRes: EvaluateResponseDto = {
//       candidate,
//       countCharacters: 50, // TODO: 글자 수 파싱 필요
//       countSentences: 5, // TODO: 문장수 파싱 필요
//       createdAt: makeCreatedAt(),
//       essayId,
//       essayInfo: {
//         text: essay.essayText,
//         topic: essay.topic,
//         type: essay.type,
//       },
//
//       total: totalRes,
//       exp: expRes,
//       org: orgRes,
//       cont: contRes,
//     };
//
//     return evaluateRes;
//   } catch (err) {
//     throw ApiError.handleError(err);
//   }
// };
//
// export default makeEvaluateResponse;
