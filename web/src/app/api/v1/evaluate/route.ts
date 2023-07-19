import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';
import ApiError from '@/app/api/lib/class/ApiError';
import { EvaluateRequestDto, ScoringResultEntity } from '@/app/api/lib/types';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import saveScoringResult from '@/app/api/repository/scoringResult/saveScoringResult';
import makeCreatedAt from '@/app/api/lib/makeCreatedAt';
import makeScoringResult from '@/app/api/lib/scoring/makeScoringResult';
import dummyScore from '@/app/api/const/dummyScore';

export async function POST(req: NextRequest) {
  try {
    const { email, essayText, topic, type }: EvaluateRequestDto =
      await req.json();
    let uid = null;

    // 사용자가 로그인이 되어있는 경우
    if (email) {
      const decodedToken = await getDecodedToken(req);
      // 사용자가 로그인되어있는데 토큰이 유효하지 않은 경우
      if (!decodedToken) {
        await saveEssay({
          essayText,
          topic,
          type,
          uid,
          createdAt: makeCreatedAt(),
        });
        throw new ApiError('토큰이 유효하지 않음', 401, '로그인이 필요합니다.');
      }
      if (decodedToken.email !== email) {
        // 사용자의 이메일 정보와 토큰의 이메일 정보가 다른 경우
        await saveEssay({
          essayText,
          topic,
          type,
          uid,
          createdAt: makeCreatedAt(),
        });
        throw new ApiError(
          '토큰 정보가 유효하지 않습니다.',
          401,
          '로그인된 회원과 요청된 회원이 다릅니다.',
        );
      }

      uid = decodedToken.uid;
    }

    const { doc: essayDoc, essay } = await saveEssay({
      essayText,
      topic,
      type,
      uid,
      createdAt: makeCreatedAt(),
    });

    // essay를 scoring server에 보내 채점 결과 객체를 반환
    // const replaceText = essayText.replaceAll('"', "'").replaceAll('\n', ' ');
    // const subScore: ScoringResponseDto = await fetchToScoringServer(
    //   replaceText,
    // );
    const subScore = dummyScore;

    // 채점 결과 객체에서 ScoringResult 객체 재조합
    const scoringResult: ScoringResultEntity = await makeScoringResult(
      subScore,
      essayDoc.id,
      essay,
    );

    // EssayResultDB에 response 결과 및 essayId 저장
    const { doc: resultDoc } = await saveScoringResult(
      { ...scoringResult, createdAt: makeCreatedAt() },
      essayDoc.id,
    );

    return new NextResponse(resultDoc.id, { status: 200 });
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
