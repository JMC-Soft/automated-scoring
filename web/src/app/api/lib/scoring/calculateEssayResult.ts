import countEssay from '@/app/api/repository/essay/countEssay';
import { EssayResponse, ScoringResponseDto } from '@/app/api/lib/types';
import ApiError from '@/app/api/lib/class/ApiError';
import calculateEssaySub from '@/app/api/lib/scoring/calculateEssaySub';
import {
  HIGH_DATA_TOTAL_NUMBER,
  EXP_STATISTICS,
  ORG_STATISTICS,
  CONT_STATISTICS,
} from '@/app/api/const/dataSet';
import calculateEssayTotal from '@/app/api/lib/scoring/calculateEssayTotal';

const calculateEssayResult = async ({
  exp,
  org,
  cont,
}: ScoringResponseDto): Promise<EssayResponse> => {
  try {
    const expRes = calculateEssaySub(exp, EXP_STATISTICS);
    const orgRes = calculateEssaySub(org, ORG_STATISTICS);
    const contRes = calculateEssaySub(cont, CONT_STATISTICS);

    // 총점 계산
    const totalScore = expRes.score + orgRes.score + contRes.score;
    const totalRes = calculateEssayTotal(totalScore);

    // 전체 글쓴이 수
    const highCount = await countEssay();
    const candidate = HIGH_DATA_TOTAL_NUMBER + highCount;

    return {
      candidate,
      total: totalRes,
      exp: expRes,
      org: orgRes,
      cont: contRes,
    };
  } catch (err) {
    throw ApiError.handleError(err);
  }
};

export default calculateEssayResult;
