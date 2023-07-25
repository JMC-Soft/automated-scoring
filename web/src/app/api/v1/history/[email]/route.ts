import { NextRequest, NextResponse } from 'next/server';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import ApiError from '@/app/api/lib/class/ApiError';
import findEssayByUidAndOrderBy from '@/app/api/repository/essay/findEssayByUidAndOrderBy';
import {
  EssayEntity,
  HistoryResponseDto,
  ScoringResultField,
} from '@/app/api/lib/types';
import findUserByEmail from '@/app/api/repository/user/findUserByEmail';
import { TOTAL_STATISTICS } from '@/app/api/const/dataSet';

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      email: string;
    };
  },
) {
  try {
    const { email } = params;

    const decodedToken = await getDecodedToken(req);
    if (!decodedToken)
      throw new ApiError(
        '토큰이 유효하지 않음',
        401,
        '토큰 정보가 유효하지 않습니다.',
      );

    if (
      decodedToken.email !== email &&
      decodedToken.uid !== process.env.ADMIN_UID
    )
      throw new ApiError(
        '사용자에게 받은 email과 token 정보가 일치하지 않음',
        401,
        '토큰 정보가 유효하지 않습니다.',
      );

    // 관리자 접근 상태이면 email 의 uid 를 가져옴
    const { uid } =
      decodedToken.uid === process.env.ADMIN_UID
        ? await findUserByEmail(email)
        : decodedToken;

    const docs = await findEssayByUidAndOrderBy({
      uid,
      orderBy: 'createdAt',
      orderType: 'desc',
    });

    const history = docs.map((doc) => {
      const {
        uid: essayEntityUid,
        essayText,
        ...remainEssay
      } = doc.data() as EssayEntity;
      const res: {
        topic: string;
        type: string;
        createdAt: string;
        scoringResult: ScoringResultField | null;
        essayId: string;
      } = {
        ...remainEssay,
        essayId: doc.id,
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
        const { scoringResult, type } = cur;
        if (!scoringResult) return acc;
        const { countCharacters, countSentences } = scoringResult;

        if (type === '자기표현') {
          acc.totalExpression.score += scoringResult.total.score;
          acc.totalExpression.length += 1;
        } else if (type === '설득') {
          acc.totalPersuade.score += scoringResult.total.score;
          acc.totalPersuade.length += 1;
        } else if (type === '정보전달') {
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

    const res: HistoryResponseDto = {
      countAverageCharacters: totalAverageCharacters / history.length,
      countAverageSentences: totalAverageSentences / history.length,
      countTotal: history.length,
      expression: {
        title: '자기표현',
        average: TOTAL_STATISTICS.average,
        score: totalExpression.score / totalExpression.length,
      },
      persuade: {
        title: '설득',
        average: TOTAL_STATISTICS.average,
        score: totalPersuade.score / totalPersuade.length,
      },
      information: {
        title: '정보전달',
        average: TOTAL_STATISTICS.average,
        score: totalInformation.score / totalInformation.length,
      },

      resultHistory: history,
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
