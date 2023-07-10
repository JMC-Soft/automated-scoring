import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';
import fetchToScoringServer from '@/app/api/lib/scoring/fetchToScoringServer';
import ApiError from '@/app/api/lib/class/ApiError';
import {
  EssayRequestDto,
  EssayResponse,
  ScoringResponseDto,
} from '@/app/api/lib/types';
import calculateEssayResult from '@/app/api/lib/scoring/calculateEssayResult';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';

export async function POST(req: NextRequest) {
  try {
    const { email, topic, essayText }: EssayRequestDto = await req.json();
    let uid = null;

    // 사용자가 로그인이 되어있는 경우
    if (email) {
      const decodedToken = await getDecodedToken(req);
      if (!decodedToken)
        throw new ApiError('토큰이 유효하지 않음', 401, '로그인이 필요합니다.');
      if (decodedToken.email !== email)
        throw new ApiError(
          '프론트에서 받은 email정보와 토큰의 email 정보가 다름',
          401,
          '로그인된 회원과 요청된 회원이 다릅니다.',
        );

      uid = decodedToken.uid;
    }
    await saveEssay({ topic, essayText, uid });

    // essay를 scoring server에 보내 채점 결과 객체를 반환
    const scoringRes: ScoringResponseDto = await fetchToScoringServer(
      essayText,
    );

    // 채점 결과 객체에서 essayResult 재조합
    const essayResult: EssayResponse = await calculateEssayResult(scoringRes);

    return NextResponse.json(essayResult, { status: 200 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }

    console.log('stack: POST /api/v1/evaluate');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: '잘못된 요청입니다.' }, { status: 404 });
}
