import { type NextRequest, NextResponse } from 'next/server';
import saveEssay from '@/app/api/repository/essay/saveEssay';
import ApiError from '@/app/api/lib/class/ApiError';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import makeCreatedAt from '@/app/api/lib/makeCreatedAt';
import {
  EssayEntity,
  EssayRequestDto,
  ScoredEssay,
  ScoringResultField,
  WordCloudEntity,
} from '@/app/api/lib/types';
import COUNT_SENTENCES_REGEXP from '@/app/api/const/regExp';
// import fetchToScoringServer from '@/app/api/lib/scoring/fetchToScoringServer';
import dummyScore from '@/app/api/const/dummyScore';
import findWordCloudByUid from '@/app/api/repository/wordCloud/findWordCloudByUid';
import saveWordCloud from '@/app/api/repository/wordCloud/saveWordCloud';

export async function POST(req: NextRequest) {
  try {
    const { email, essayText, topic, type, id }: EssayRequestDto =
      await req.json();
    let uid = null;
    const scoringResult = null;

    // 사용자가 로그인이 되어있는 경우
    if (email) {
      const decodedToken = await getDecodedToken(req);
      // 사용자가 로그인되어있는데 토큰이 유효하지 않은 경우
      if (!decodedToken) {
        await saveEssay({
          id,
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
          id,
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
      id,
      essayText,
      topic,
      type,
      uid,
      createdAt: makeCreatedAt(),
      scoringResult,
    };

    const { doc: essayDoc, essay } = await saveEssay(essayEntity);

    // topicId에 맞는 서버를 세팅
    if (!id) {
      throw new ApiError('topicId가 지정되지 않음.', 500, '서버 오류입니다.');
    }
    let fetchServer = '';
    if (id === 1) {
      fetchServer = process.env.FLASK_SERVER_1 ?? '';
    }
    if (id === 2) {
      fetchServer = process.env.FLASK_SERVER_2 ?? '';
    }
    if (id === 3) {
      fetchServer = process.env.FLASK_SERVER_3 ?? '';
    }
    if (!fetchServer) {
      throw new ApiError(
        'flask 서버의 주소가 제대로 설정되지 않음.',
        500,
        '서버 오류입니다.',
      );
    }

    // // scoring server에 보내 채점 결과 객체를 반환
    // const replaceText = essayText.replaceAll('"', "'").replaceAll('\n', ' ');
    // const scoredEssay: ScoredEssay = await fetchToScoringServer(
    //   replaceText,
    //   fetchServer,
    // );
    const scoredEssay: ScoredEssay = dummyScore;

    // ScoringResultField 에 들어갈 값 계산
    const { exp, org, cont, wordCloud: analyzedWordCloud } = scoredEssay;
    const expSum = exp.detail.reduce((acc, cur) => acc + cur.score, 0);
    const orgSum = org.detail.reduce((acc, cur) => acc + cur.score, 0);
    const contSum = cont.detail.reduce((acc, cur) => acc + cur.score, 0);
    const totalSum = expSum + orgSum + contSum;

    // EssayEntity에 scoringResult를 추가하여 저장
    const sr: ScoringResultField = {
      countCharacters: essay.essayText.trim().length,
      countSentences: essay.essayText.split(COUNT_SENTENCES_REGEXP).length,
      total: { title: '종합', score: totalSum },
      exp: { ...exp, score: expSum },
      org: { ...org, score: orgSum },
      cont: { ...cont, score: contSum },
    };

    essay.scoringResult = sr;
    await saveEssay(essay, essayDoc.id);

    // 로그인이 되어있는 경우 wordCloud 를 저장한다.
    if (essay.uid) {
      const doc = await findWordCloudByUid(essay.uid);
      const data = doc?.[0].data() as WordCloudEntity;

      // topicId에 해당하는 기존에 저장된 wordCloud 를 불러온다.
      const preSavedWordCloud: { [key: string]: number } = data ? data[id] : {};

      // 분석된 wordCloud와 기존에 저장된 wordCloud를 합친다.
      Object.keys(analyzedWordCloud).forEach((key) => {
        if (!preSavedWordCloud[key]) {
          preSavedWordCloud[key] = 0;
        }
        preSavedWordCloud[key] += analyzedWordCloud[key];
      });

      // 새로 생성한 wordCloud를 저장한다.
      const newWordCloud: WordCloudEntity = {
        ...data,
        [id]: preSavedWordCloud,
      };
      await saveWordCloud(newWordCloud, doc?.[0].id);
    }

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
