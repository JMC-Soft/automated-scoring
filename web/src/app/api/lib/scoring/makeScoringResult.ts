import {
  EssayEntitiy,
  ScoringResponseDetail,
  ScoringResponseDto,
  Statistics,
} from '@/app/api/lib/types';
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
import COUNT_SENTENCES_REGEXP from '@/app/api/const/regExp';

const makeScoringResult = async (
  subScore: ScoringResponseDto,
  essayId: string,
  essay: EssayEntitiy,
) => {
  const { exp, org, cont } = subScore;

  // sum 계산에 필요한 callback 함수
  const sumCallback = (acc: number, cur: ScoringResponseDetail) => {
    return acc + cur.score;
  };
  const expSum = exp.detail.reduce((acc, cur) => sumCallback(acc, cur), 0);
  const orgSum = org.detail.reduce((acc, cur) => sumCallback(acc, cur), 0);
  const contSum = cont.detail.reduce((acc, cur) => sumCallback(acc, cur), 0);
  const totalSum = expSum + orgSum + contSum;

  // 글자수, 문장수 계산
  const sentences = essay.essayText.match(COUNT_SENTENCES_REGEXP);
  const countSentences = sentences ? sentences.length : 0;

  // 글자 수 계산
  const countCharacters = essay.essayText.trim().length;

  // percentage 계산에 필요한 callback 함수
  const percentageCallback = (sum: number) => {
    return (acc: number, value: number, key: number) => {
      if (Number(key) < sum) {
        return acc + value;
      }
      return acc;
    };
  };
  const subResult = (
    STATISTICS: Statistics,
    sum: number,
    title: string = '종합',
  ) => {
    const { data, standardDeviation, ...remainStatistics } = STATISTICS;

    return {
      score: sum,
      grade: calculateGrade(sum, STATISTICS.max),
      title,
      percentage: Math.round(
        (reduceObject(STATISTICS.data, percentageCallback(sum), 0) /
          HIGH_DATA_TOTAL_NUMBER) *
          100,
      ),
      ...remainStatistics,
    };
  };

  return {
    candidate: HIGH_DATA_TOTAL_NUMBER + (await countEssay()),
    countCharacters,
    countSentences,
    essayId,
    uid: essay.uid,
    topic: essay.topic,
    type: essay.type,

    total: {
      ...subResult(TOTAL_STATISTICS, totalSum),
    },
    exp: {
      ...subResult(EXP_STATISTICS, expSum, exp.title),
      detail: exp.detail,
    },
    org: {
      ...subResult(ORG_STATISTICS, expSum, org.title),
      detail: org.detail,
    },
    cont: {
      ...subResult(CONT_STATISTICS, expSum, cont.title),
      detail: cont.detail,
    },
  };
};

export default makeScoringResult;
