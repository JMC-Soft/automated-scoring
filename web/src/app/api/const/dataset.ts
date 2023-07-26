import { StatisticsObject } from '@/app/api/lib/types';

export const BIOGRAPHY: StatisticsObject = {
  DATA_TOTAL_NUMBER: 712,

  // Total 통계 데이터
  TOTAL_STATISTICS: {
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
  },

  // EXP 통계 데이터
  EXP_STATISTICS: {
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
    subAverage: [2.6, 2.6, 2.4],
    min: 3,
    max: 9,
    median: 8,
    Q1: 6,
    Q3: 9,
  },

  // ORG 통계 데이터
  ORG_STATISTICS: {
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
    subAverage: [2.5, 2.6, 2.7, 2.6],
    min: 7,
    max: 12,
    median: 11,
    Q1: 9,
    Q3: 12,
  },

  // CONT 통계 데이터
  CONT_STATISTICS: {
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
    subAverage: [2.6, 2.2, 2.6],
    min: 3,
    max: 9,
    median: 7.5,
    Q1: 6,
    Q3: 8,
  },
};

export const FACILITY: StatisticsObject = {
  // 총 글 수
  DATA_TOTAL_NUMBER: 543,

  // Total 통계 데이터
  TOTAL_STATISTICS: {
    average: 27.6,
    standardDeviation: 2.28,
    data: {
      16: 1,
      19: 2,
      20: 5,
      21: 6,
      22: 8,
      23: 11,
      24: 20,
      25: 32,
      26: 47,
      27: 64,
      28: 95,
      29: 147,
      30: 105,
    },

    min: 16,
    max: 30,
    median: 28,
    Q1: 27,
    Q3: 29,
  },

  // EXP 통계 데이터
  EXP_STATISTICS: {
    average: 8.4,
    standardDeviation: 0.97,
    data: {
      4: 1,
      6: 46,
      7: 42,
      8: 100,
      9: 354,
    },
    subAverage: [2.7, 2.8, 2.8],
    min: 4,
    max: 9,
    median: 9,
    Q1: 8,
    Q3: 9,
  },

  // ORG 통계 데이터
  ORG_STATISTICS: {
    average: 10.8,
    standardDeviation: 1.15,
    data: {
      6: 1,
      7: 3,
      8: 26,
      9: 42,
      10: 94,
      11: 209,
      12: 168,
    },
    subAverage: [2.8, 2.3, 2.8, 2.8],
    min: 6,
    max: 12,
    median: 11,
    Q1: 10,
    Q3: 12,
  },

  // CONT 통계 데이터
  CONT_STATISTICS: {
    average: 8.4,
    standardDeviation: 0.82,
    data: {
      5: 1,
      6: 15,
      7: 65,
      8: 124,
      9: 338,
    },
    subAverage: [2.7, 2.8, 2.9],
    min: 5,
    max: 9,
    median: 9,
    Q1: 8,
    Q3: 9,
  },
};

export const REVIEW: StatisticsObject = {
  // 총 글 수
  DATA_TOTAL_NUMBER: 995,

  // Total 통계 데이터
  TOTAL_STATISTICS: {
    average: 25.2,
    standardDeviation: 4.13,
    data: {
      10: 7,
      11: 4,
      12: 4,
      13: 4,
      14: 9,
      15: 15,
      16: 35,
      17: 34,
      18: 66,
      19: 82,
      20: 147,
      21: 79,
      22: 55,
      23: 62,
      24: 61,
      25: 71,
      26: 75,
      27: 78,
      28: 53,
      29: 38,
      30: 16,
    },

    min: 10,
    Q1: 19,
    median: 22,
    Q3: 26,
    max: 30,
  },

  // EXP 통계 데이터
  EXP_STATISTICS: {
    average: 6.7,
    standardDeviation: 1.3,
    data: {
      3: 7,
      4: 22,
      5: 137,
      6: 334,
      7: 166,
      8: 244,
      9: 85,
    },
    subAverage: [2.4, 2.4, 1.9],
    min: 3,
    Q1: 6,
    median: 6,
    Q3: 8,
    max: 9,
  },

  // ORG 통계 데이터
  ORG_STATISTICS: {
    average: 8.9,
    standardDeviation: 1.3,
    data: {
      3: 2,
      4: 14,
      5: 10,
      6: 35,
      7: 133,
      8: 287,
      9: 156,
      10: 127,
      11: 134,
      12: 97,
    },
    subAverage: [2.1, 2.2, 2.4, 2.1],
    min: 3,
    Q1: 8,
    median: 9,
    Q3: 10,
    max: 12,
  },

  // CONT 통계 데이터
  CONT_STATISTICS: {
    average: 6.5,
    standardDeviation: 1.41,
    data: {
      2: 6,
      3: 16,
      4: 49,
      5: 130,
      6: 309,
      7: 207,
      8: 204,
      9: 74,
    },
    subAverage: [2.4, 2.0, 2.2],
    min: 2.0,
    Q1: 6.0,
    median: 6.0,
    Q3: 8.0,
    max: 9.0,
  },
};
