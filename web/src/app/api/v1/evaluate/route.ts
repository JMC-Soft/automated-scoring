import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';
import ApiError from '@/app/api/lib/class/ApiError';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import makeCreatedAt from '@/app/api/lib/makeCreatedAt';
import dummyScore from '@/app/api/const/dummyScore';
import {
  EssayEntity,
  EssayRequestDto,
  ScoredEssay,
  ScoringResultField,
} from '@/app/api/lib/types';
import COUNT_SENTENCES_REGEXP from '@/app/api/const/regExp';

export async function POST(req: NextRequest) {
  try {
    const { email, essayText, topic, type }: EssayRequestDto = await req.json();
    let uid = null;
    const scoringResult = null;

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
          scoringResult,
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
          scoringResult,
        });
        throw new ApiError(
          '토큰 정보가 유효하지 않습니다.',
          401,
          '로그인된 회원과 요청된 회원이 다릅니다.',
        );
      }

      uid = decodedToken.uid;
    }

    const essayEntity: EssayEntity = {
      essayText,
      topic,
      type,
      uid,
      createdAt: makeCreatedAt(),
      scoringResult,
    };

    /**
     * EssayEntity를 먼저 저장할 경우, scoring server에 fetch 하는 과정에서 문제가 발생하면
     * scoringResult가 null로 저장된다.
     */
    const { doc: essayDoc, essay } = await saveEssay(essayEntity);

    // // essay를 scoring server에 보내 채점 결과 객체를 반환
    // const replaceText = essayText.replaceAll('"', "'").replaceAll('\n', ' ');
    // const scoredEssay: ScoredEssay = await fetchToScoringServer(
    //   replaceText,
    // );
    const scoredEssay: ScoredEssay = dummyScore;

    // ScoringResultField 에 들어갈 값 계산
    const { exp, org, cont } = scoredEssay;
    const expSum = exp.detail.reduce((acc, cur) => acc + cur.score, 0);
    const orgSum = org.detail.reduce((acc, cur) => acc + cur.score, 0);
    const contSum = cont.detail.reduce((acc, cur) => acc + cur.score, 0);
    const totalSum = expSum + orgSum + contSum;

    // EssayEntity에 scoringResult를 추가하여 저장
    const sr: ScoringResultField = {
      countCharacters:
        essay.essayText.match(COUNT_SENTENCES_REGEXP)?.length ?? 0,
      countSentences: essay.essayText.trim().length,
      total: { title: '종합', score: totalSum },
      exp: { ...exp, score: expSum },
      org: { ...org, score: orgSum },
      cont: { ...cont, score: contSum },
    };

    essay.scoringResult = sr;
    await saveEssay(essay, essayDoc.id);

    return NextResponse.json(essayDoc.id, { status: 200 });
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
