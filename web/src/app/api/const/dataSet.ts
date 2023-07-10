import { Statistics } from '@/app/api/lib/types';

const HIGH_DATA_TOTAL_NUMBER: number = 713;

const TOTAL_STATISTICS: Statistics = {
  average: 25.5,
  standardDeviation: 3.45,
  data: {
    16: 2,
    17: 3,
    18: 7,
    19: 6,
    20: 55,
    21: 35,
    22: 72,
    23: 54,
    24: 34,
    25: 48,
    26: 52,
    27: 110,
    28: 49,
    29: 70,
    30: 115,
  },
};

const EXP_STATISTICS: Statistics = {
  average: 7.7,
  standardDeviation: 1.29,
  data: {
    3: 1,
    4: 3,
    5: 13,
    6: 167,
    7: 101,
    8: 139,
    9: 288,
  },
};

const ORG_STATISTICS: Statistics = {
  average: 10.5,
  standardDeviation: 1.62,
  data: {
    6: 1,
    7: 15,
    8: 106,
    9: 107,
    10: 85,
    11: 71,
    12: 327,
  },
};

const CONT_STATISTICS: Statistics = {
  average: 7.3,
  standardDeviation: 1.2,
  data: {
    4: 1,
    5: 23,
    6: 208,
    7: 153,
    8: 177,
    9: 150,
  },
};

export {
  HIGH_DATA_TOTAL_NUMBER,
  TOTAL_STATISTICS,
  EXP_STATISTICS,
  ORG_STATISTICS,
  CONT_STATISTICS,
};
