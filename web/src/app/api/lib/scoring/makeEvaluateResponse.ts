import countEssay from '@/app/api/repository/essay/countEssay';
import {
  EssayEntitiy,
  EssaySub,
  EssayTotal,
  EvaluateResponseDto,
  ScoringResponseDto,
} from '@/app/api/lib/types';
import ApiError from '@/app/api/lib/class/ApiError';
import calculateEssaySub from '@/app/api/lib/scoring/calculateEssaySub';
import {
  HIGH_DATA_TOTAL_NUMBER,
  EXP_STATISTICS,
  ORG_STATISTICS,
  CONT_STATISTICS,
  TOTAL_STATISTICS,
} from '@/app/api/const/dataSet';
import calculateEssayTotal from '@/app/api/lib/scoring/calculateEssayTotal';
import makeCreatedAt from '@/app/api/lib/makeCreatedAt';

const makeEvaluateResponse = async (
  { exp, org, cont }: ScoringResponseDto,
  essayId: string,
  essay: EssayEntitiy,
): Promise<EvaluateResponseDto> => {
  try {
    const expRes: EssaySub = calculateEssaySub(exp, EXP_STATISTICS);
    const orgRes: EssaySub = calculateEssaySub(org, ORG_STATISTICS);
    const contRes: EssaySub = calculateEssaySub(cont, CONT_STATISTICS);

    // 총점 계산
    const totalScore = expRes.score + orgRes.score + contRes.score;
    const totalRes: EssayTotal = calculateEssayTotal(
      totalScore,
      TOTAL_STATISTICS,
    );

    // 전체 글쓴이 수
    const highCount = await countEssay();
    const candidate = HIGH_DATA_TOTAL_NUMBER + highCount;

    // TODO: 글자 수 & 문장수 파싱 필요

    // 평가 결과 반환
    const evaluateRes: EvaluateResponseDto = {
      candidate,
      countCharacters: 50, // TODO: 글자 수 파싱 필요
      countSentences: 5, // TODO: 문장수 파싱 필요
      createdAt: makeCreatedAt(),
      essayId,
      essayInfo: {
        text: essay.essayText,
        topic: essay.topic,
        type: essay.type,
      },

      total: totalRes,
      exp: expRes,
      org: orgRes,
      cont: contRes,
    };

    return evaluateRes;
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default makeEvaluateResponse;
