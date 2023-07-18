import {
  EssayEntitiy,
  ScoringResponseDto,
  ScoringResponseSub,
  ScoringResultEntity,
  Statistics,
} from '@/app/api/lib/types';
import reduceArray from '@/app/api/lib/utils/reduceArray';
import {
  CONT_STATISTICS,
  EXP_STATISTICS,
  HIGH_DATA_TOTAL_NUMBER,
  ORG_STATISTICS,
  TOTAL_STATISTICS,
} from '@/app/api/const/dataSet';
import countEssay from '@/app/api/repository/essay/countEssay';
import getGrade from '@/app/api/lib/scoring/getGrade';
import reduceObject from '@/app/api/lib/utils/reduceObject';

const makeScoringResult = async (
  subScore: ScoringResponseDto,
  essayId: string,
  essay: EssayEntitiy,
): Promise<ScoringResultEntity> => {
  const { exp, org, cont } = subScore;

  const calculateSum = (arr: ScoringResponseSub[]) =>
    reduceArray(
      arr,
      (acc: number, cur: ScoringResponseSub) => {
        return acc + cur.score;
      },
      0,
    );

  const expSum = calculateSum(exp);
  const orgSum = calculateSum(org);
  const contSum = calculateSum(cont);
  const totalSum = expSum + orgSum + contSum;

  // TODO: countCharacters, countSentences 계산

  // percentage 계산에 필요한 callback 함수
  const callback = (sum: number) => {
    return (acc: number, value: number, key: number) => {
      if (Number(key) < sum) {
        return acc + value;
      }
      return acc;
    };
  };

  const subResult = (STATISTICS: Statistics, sum: number) => {
    return {
      score: sum,
      average: STATISTICS.average,
      grade: getGrade(sum, STATISTICS.maxScore),
      percentage: reduceObject(STATISTICS.data, callback(sum), 0),
      min: STATISTICS.min,
      max: STATISTICS.max,
      median: STATISTICS.median,
      Q1: STATISTICS.Q1,
      Q3: STATISTICS.Q3,
    };
  };

  return {
    candidate: HIGH_DATA_TOTAL_NUMBER + (await countEssay()),
    countCharacters: 10,
    countSentences: 10,
    essayId,
    essayInfo: {
      text: essay.essayText,
      topic: essay.topic,
      type: essay.type,
    },
    uid: essay.uid,

    total: {
      ...subResult(TOTAL_STATISTICS, totalSum),
    },
    exp: {
      ...subResult(EXP_STATISTICS, expSum),
      detail: exp,
    },
    org: {
      ...subResult(ORG_STATISTICS, expSum),
      detail: org,
    },
    cont: {
      ...subResult(CONT_STATISTICS, expSum),
      detail: cont,
    },
  };
};

export default makeScoringResult;
