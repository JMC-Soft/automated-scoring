import { NextRequest, NextResponse } from 'next/server';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import ApiError from '@/app/api/lib/class/ApiError';
import findEssayByUidAndOrderBy from '@/app/api/repository/essay/findEssayByUidAndOrderBy';
import {
  EssayEntity,
  HistoryResponseDto,
  ScoringResultField,
  WordCloud,
  WordCloudEntity,
} from '@/app/api/lib/types';
import calculateGrade from '@/app/api/lib/scoring/calculateGrade';
import { BIOGRAPHY, FACILITY, REVIEW } from '@/app/api/const/dataset';
import findWordCloudByUid from '@/app/api/repository/wordCloud/findWordCloudByUid';
import TOPIC_ID_MAP from '@/app/api/const/topicIdMap';

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await getDecodedToken(req);
    if (!decodedToken)
      throw new ApiError(
        '토큰이 유효하지 않음',
        401,
        '토큰 정보가 유효하지 않습니다.',
      );

    // if (
    //   decodedToken.email !== email &&
    //   decodedToken.uid !== process.env.ADMIN_UID
    // )
    //   throw new ApiError(
    //     '사용자에게 받은 email과 token 정보가 일치하지 않음',
    //     401,
    //     '토큰 정보가 유효하지 않습니다.',
    //   );

    // // 관리자 접근 상태이면 email 의 uid 를 가져옴
    // const { uid } =
    //   decodedToken.uid === process.env.ADMIN_UID
    //     ? await findUserByEmail(email)
    //     : decodedToken;
    const { uid } = decodedToken;

    const docs = await findEssayByUidAndOrderBy({
      uid,
      orderBy: 'createdAt',
      orderType: 'desc',
    });

    const history = docs
      .filter((doc) => doc.data().scoringResult !== null)
      .map((doc) => {
        const {
          uid: essayEntityUid,
          essayText,
          scoringResult,
          ...remainEssay
        } = doc.data() as EssayEntity;

        if (scoringResult === null) {
          throw new ApiError(
            'firebase 에서 result 결과가 없는 애를 필터링 못해줌',
            500,
          );
        }
        const res: {
          id: number;
          topic: string;
          type: string;
          createdAt: string;
          scoringResult: ScoringResultField;
          essayId: string;
          grade: 'A' | 'B' | 'C';
        } = {
          ...remainEssay,
          essayId: doc.id,
          scoringResult,
          grade: calculateGrade(scoringResult.total.score, 30),
        };
        return res;
      });

    const {
      totalAverageCharacters,
      totalAverageSentences,
      totalExpression,
      totalPersuade,
      totalInformation,
    } = history.reduce(
      (acc, cur) => {
        const { scoringResult, id } = cur;
        if (!scoringResult) return acc;
        const { countCharacters, countSentences } = scoringResult;

        if (id === 1) {
          acc.totalExpression.score += scoringResult.total.score;
          acc.totalExpression.length += 1;
        } else if (id === 2) {
          acc.totalPersuade.score += scoringResult.total.score;
          acc.totalPersuade.length += 1;
        } else if (id === 3) {
          acc.totalInformation.score += scoringResult.total.score;
          acc.totalInformation.length += 1;
        }

        return {
          ...acc,
          totalAverageCharacters: acc.totalAverageCharacters + countCharacters,
          totalAverageSentences: acc.totalAverageSentences + countSentences,
        };
      },
      {
        totalAverageCharacters: 0,
        totalAverageSentences: 0,
        totalExpression: { length: 0, score: 0 },
        totalPersuade: { length: 0, score: 0 },
        totalInformation: { length: 0, score: 0 },
      },
    );

    // wordCloud 가져오기
    const cloudData = await findWordCloudByUid(uid);

    let wordCloud = null;
    if (cloudData) {
      const tmpCloud = cloudData[0].data() as WordCloudEntity;
      const { uid: wordUid, ...rest } = tmpCloud;

      wordCloud = Object.entries(rest).reduce((acc, [id, wordData]) => {
        Object.entries(wordData).forEach(([word, count]) => {
          if (!acc[id as '1' | '2' | '3']) {
            acc[id as '1' | '2' | '3'] = [];
          }
          acc[id as '1' | '2' | '3'].push({ text: word, value: count });
        });
        return acc;
      }, {} as WordCloud);
    }

    const res: HistoryResponseDto = {
      countAverageCharacters:
        Math.round((totalAverageCharacters / history.length) * 10) / 10,
      countAverageSentences:
        Math.round((totalAverageSentences / history.length) * 10) / 10,
      countTotal: history.length,
      expression: {
        title: TOPIC_ID_MAP[1],
        average: BIOGRAPHY.TOTAL_STATISTICS.average,
        score: totalExpression.score / totalExpression.length,
      },
      persuade: {
        title: TOPIC_ID_MAP[2],
        average: FACILITY.TOTAL_STATISTICS.average,
        score: totalPersuade.score / totalPersuade.length,
      },
      information: {
        title: TOPIC_ID_MAP[3],
        average: REVIEW.TOTAL_STATISTICS.average,
        score: totalInformation.score / totalInformation.length,
      },

      resultHistory: history,
      wordCloud,
    };

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }

    console.log('stack: GET /api/v1/evaluate/[essayId]/result');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ msg: '잘못된 요청입니다.' }, { status: 404 });
}
