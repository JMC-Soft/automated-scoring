import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';
import fetchToScoringServer from '@/app/api/lib/scoring/fetchToScoringServer';
import ApiError from '@/app/api/lib/class/ApiError';
import {
  EvaluateRequestDto,
  EvaluateResponseDto,
  ScoringResponseDto,
} from '@/app/api/lib/types';
import makeEvaluateResponse from '@/app/api/lib/scoring/makeEvaluateResponse';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import saveScoringResult from '@/app/api/repository/scoringResult/saveScoringResult';

export async function POST(req: NextRequest) {
  try {
    const { email, topic, type, essayText }: EvaluateRequestDto =
      await req.json();
    let uid = null;

    // 사용자가 로그인이 되어있는 경우
    if (email) {
      const decodedToken = await getDecodedToken(req);
      if (!decodedToken) {
        await saveEssay(essayText, topic, type, uid);
        throw new ApiError('토큰이 유효하지 않음', 401, '로그인이 필요합니다.');
      }
      if (decodedToken.email !== email) {
        await saveEssay(essayText, topic, type, uid);
        throw new ApiError(
          '프론트에서 받은 email정보와 토큰의 email 정보가 다름',
          401,
          '로그인된 회원과 요청된 회원이 다릅니다.',
        );
      }

      uid = decodedToken.uid;
    }

    const { doc: essayDoc, essay } = await saveEssay(
      essayText,
      topic,
      type,
      uid,
    );

    // essay를 scoring server에 보내 채점 결과 객체를 반환
    const replaceText = essayText.replaceAll('"', "'").replaceAll('\n', ' ');
    const scoringRes: ScoringResponseDto = await fetchToScoringServer(
      replaceText,
    );

    // // dummy data
    // const scoringRes = {
    //   exp: [3, 3, 3],
    //   org: [3, 3, 3, 3],
    //   cont: [3, 3, 3],
    // };

    // 채점 결과 객체에서 EvaluateResponseDto 재조합
    const evaluateRes: EvaluateResponseDto = await makeEvaluateResponse(
      scoringRes,
      essayDoc.id,
      essay,
    );

    // EssayResultDB에 response 결과 및 essayId 저장
    const { doc: resultDoc } = await saveScoringResult(
      evaluateRes,
      uid,
      essayDoc.id,
    );
    const resultId = resultDoc.id;

    // const resultUrl = new URL(`${req.nextUrl.origin}/result/${resultId}`);
    // return NextResponse.redirect(resultUrl);
    return new NextResponse(resultId, { status: 200 });
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
