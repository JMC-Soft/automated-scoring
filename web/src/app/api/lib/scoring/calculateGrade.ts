import { EssaySub } from '@/app/api/lib/types';

const calculateGrade = (topPercentage: number): EssaySub['grade'] => {
  if (topPercentage >= 80) {
    return 'A';
  }
  if (topPercentage >= 60) {
    return 'B';
  }
  if (topPercentage >= 40) {
    return 'C';
  }
  if (topPercentage >= 20) {
    return 'D';
  }
  return 'E';
};

export default calculateGrade;
