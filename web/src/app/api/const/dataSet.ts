import { SubStatistics, TotalStatistics } from '@/app/api/lib/types';

// 총 글 수
const HIGH_DATA_TOTAL_NUMBER: number = 712;

// Total 통계 데이터
const TOTAL_STATISTICS: TotalStatistics = {
  maxScore: 30,
  average: 25.5,
  standardDeviation: 3.45,
  data: {
    17: 2,
    18: 9,
    19: 21,
    20: 45,
    21: 51,
    22: 65,
    23: 60,
    24: 47,
    25: 39,
    26: 28,
    27: 80,
    28: 43,
    29: 103,
    30: 119,
  },

  min: 17,
  max: 30,
  median: 26,
  Q1: 22,
  Q3: 29,
};

// EXP 통계 데이터
const EXP_STATISTICS: SubStatistics = {
  maxScore: 9,
  average: 7.7,
  standardDeviation: 1.29,
  data: {
    3: 1,
    4: 1,
    5: 14,
    6: 209,
    7: 110,
    8: 65,
    9: 312,
  },
  detail: [2.6, 2.6, 2.4],
  min: 3,
  max: 9,
  median: 8,
  Q1: 6,
  Q3: 9,
};

// ORG 통계 데이터
const ORG_STATISTICS: SubStatistics = {
  maxScore: 12,
  average: 10.5,
  standardDeviation: 1.62,
  data: {
    7: 16,
    8: 101,
    9: 117,
    10: 109,
    11: 63,
    12: 306,
  },
  detail: [2.5, 2.6, 2.7, 2.6],
  min: 7,
  max: 12,
  median: 11,
  Q1: 9,
  Q3: 12,
};

// CONT 통계 데이터
const CONT_STATISTICS: SubStatistics = {
  maxScore: 9,
  average: 7.3,
  standardDeviation: 1.2,
  data: {
    3: 1,
    4: 2,
    5: 18,
    6: 167,
    7: 168,
    8: 212,
    9: 144,
  },
  detail: [2.6, 2.2, 2.6],
  min: 3,
  max: 9,
  median: 7.5,
  Q1: 6,
  Q3: 8,
};

export {
  HIGH_DATA_TOTAL_NUMBER,
  TOTAL_STATISTICS,
  EXP_STATISTICS,
  ORG_STATISTICS,
  CONT_STATISTICS,
};
