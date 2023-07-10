import countEssay from '@/app/api/repository/essay/countEssay';
import {
  EssayResponseDto,
  EssaySub,
  EssayTotal,
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

const calculateEssayResult = async ({
  exp,
  org,
  cont,
}: ScoringResponseDto): Promise<EssayResponseDto> => {
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

    return {
      candidate,
      total: totalRes,
      exp: expRes,
      org: orgRes,
      cont: contRes,
      countCharacters: 100,
      countSentences: 10,
    };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default calculateEssayResult;
