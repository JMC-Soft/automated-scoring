import { EssaySub } from '@/app/api/lib/types';

const calculateGrade = (topPercentage: number): EssaySub['grade'] => {
  if (topPercentage >= 90) {
    return 'A';
  }
  if (topPercentage >= 70) {
    return 'B';
  }
  if (topPercentage >= 30) {
    return 'C';
  }
  if (topPercentage >= 10) {
    return 'D';
  }
  return 'E';
};

export default calculateGrade;
