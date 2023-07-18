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
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';
import reduceObject from '@/app/api/lib/utils/reduceObject';

const makeScoringResult = async (
  subScore: ScoringResponseDto,
  essayId: string,
  essay: EssayEntitiy,
): Promise<ScoringResultEntity> => {
  const { exp, org, cont } = subScore;
  const sentenceRegex = /[.?!]+/g;
  const characterRegex = /\b\w+\b/g;

  // sum 계산에 필요한 callback 함수
  const sumCallback = (acc: number, cur: ScoringResponseSub) => {
    return acc + cur.score;
  };
  const expSum = reduceArray(exp, sumCallback, 0);
  const orgSum = reduceArray(org, sumCallback, 0);
  const contSum = reduceArray(cont, sumCallback, 0);
  const totalSum = expSum + orgSum + contSum;

  // 글자수, 문장수 계산
  const sentences = essay.essayText.match(sentenceRegex);
  const countSentences = sentences ? sentences.length : 0;

  const characters = essay.essayText.match(characterRegex);
  const countCharacters = characters ? characters.length : 0;

  // percentage 계산에 필요한 callback 함수
  const percentageCallback = (sum: number) => {
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
      grade: calculateGrade(sum, STATISTICS.maxScore),
      percentage: reduceObject(STATISTICS.data, percentageCallback(sum), 0),
      min: STATISTICS.min,
      max: STATISTICS.max,
      median: STATISTICS.median,
      Q1: STATISTICS.Q1,
      Q3: STATISTICS.Q3,
    };
  };

  return {
    candidate: HIGH_DATA_TOTAL_NUMBER + (await countEssay()),
    countCharacters,
    countSentences,
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
