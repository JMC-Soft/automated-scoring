import getPercentage from '@/app/api/lib/scoring/getPercentage';

const getGrade = (score: number, average: number, deviation: number) => {
  const topPercentage = getPercentage(score, average, deviation);

  if (topPercentage >= 80) {
    return 1;
  }
  if (topPercentage >= 60) {
    return 2;
  }
  if (topPercentage >= 40) {
    return 3;
  }
  if (topPercentage >= 20) {
    return 4;
  }
  return 5;
};

export default getGrade;
