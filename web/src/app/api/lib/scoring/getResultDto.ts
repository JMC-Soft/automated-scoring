import {
  AVERAGE_OF_CON_SUM,
  AVERAGE_OF_TOTAL_SUM,
  AVERAGE_OF_EXP_SUM,
  AVERAGE_OF_ORG_SUM,
  HIGH_DATA_TOTAL_NUMBER,
  STANDARD_DEVIATION_OF_TOTAL_SUM,
  STANDARD_DEVIATION_OF_EXP_SUM,
  STANDARD_DEVIATION_OF_ORG_SUM,
  STANDARD_DEVIATION_OF_CON_SUM,
} from '@/app/api/const/dataSet';
import countEssay from '@/app/api/repository/essay/countEssay';
import { EssayResponseDto } from '@/app/api/lib/types';
import getPercentage from '@/app/api/lib/scoring/getPercentage';
import getGrade from '@/app/api/lib/scoring/getGrade';

const getResultDto = async (
  exp: number[],
  org: number[],
  cont: number[],
): Promise<EssayResponseDto> => {
  // 각각의 합
  const expSum = exp.reduce((acc: number, cur: number) => acc + cur, 0);
  const orgSum = org.reduce((acc: number, cur: number) => acc + cur, 0);
  const conSum = cont.reduce((acc: number, cur: number) => acc + cur, 0);

  // 총점
  const totalScore = expSum + orgSum + conSum;
  const topPercentage = getPercentage(
    totalScore,
    AVERAGE_OF_TOTAL_SUM,
    STANDARD_DEVIATION_OF_TOTAL_SUM,
  );

  const expGrade = getGrade(
    expSum,
    AVERAGE_OF_EXP_SUM,
    STANDARD_DEVIATION_OF_EXP_SUM,
  );
  const orgGrade = getGrade(
    orgSum,
    AVERAGE_OF_ORG_SUM,
    STANDARD_DEVIATION_OF_ORG_SUM,
  );
  const contGrade = getGrade(
    conSum,
    AVERAGE_OF_CON_SUM,
    STANDARD_DEVIATION_OF_CON_SUM,
  );

  const highCount = await countEssay();
  const candidate = HIGH_DATA_TOTAL_NUMBER + highCount;

  return {
    candidate,
    total: {
      score: totalScore,
      average: AVERAGE_OF_TOTAL_SUM,
      grade: topPercentage,
    },
    exp: {
      score: expSum,
      sub: exp,
      average: AVERAGE_OF_EXP_SUM,
      grade: expGrade,
    },
    org: {
      score: orgSum,
      sub: org,
      average: AVERAGE_OF_ORG_SUM,
      grade: orgGrade,
    },
    cont: {
      score: conSum,
      sub: cont,
      average: AVERAGE_OF_CON_SUM,
      grade: contGrade,
    },
  };
};

export default getResultDto;
