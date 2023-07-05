import { erf } from 'mathjs';

/**
 * reference: https://kr.mathworks.com/help/matlab/ref/erf.html
 * "정규분포의 누적 확률 분포 함수 구하기" 섹션
 */
const getPercentage = (score: number, average: number, deviation: number) => {
  const zScore = (score - average) / deviation;

  // 누적 확률 분포 계산
  const topPercentage = Math.round(
    ((1 + erf(zScore / Math.sqrt(2))) / 2) * 100,
  );

  return topPercentage;
};

export default getPercentage;
