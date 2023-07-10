import COLORS from '@/lib/constants/colors';

const GRADE_MAP = {
  A: {
    color: COLORS.secondary[500],
  },
  B: {
    // color: '#33CC33',
    color: COLORS.primary[500],
  },
  C: {
    color: COLORS.primary[700],
  },
  D: {
    color: COLORS.warning[300],
  },
  E: {
    color: COLORS.error[500],
  },
};

export default GRADE_MAP;
