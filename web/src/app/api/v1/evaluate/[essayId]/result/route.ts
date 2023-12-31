import { NextRequest, NextResponse } from 'next/server';
import ApiError from '@/app/api/lib/class/ApiError';
import findEssayById from '@/app/api/repository/essay/findEssayById';
import {
  EssayEntity,
  EssayResponseDto,
  ScoringResponseDto,
} from '@/app/api/lib/types';
import findEssayByUidAndOrderBy from '@/app/api/repository/essay/findEssayByUidAndOrderBy';

import makeSubScoring from '@/app/api/lib/makeSubScoring';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import { BIOGRAPHY, FACILITY, REVIEW } from '@/app/api/const/dataset';

export async function GET(
  req: NextRequest,
  { params }: { params: { essayId: string } },
) {
  try {
    const decodedToken = await getDecodedToken(req);
    const checkUid = decodedToken?.uid || null;

    const { essayId: rawEssayId } = params;
    const essayId = rawEssayId.replace(/"/g, '');

    // EssayId로 EssayEntity를 찾아서 반환
    const essayEntity: EssayEntity = await findEssayById(essayId);

    // essayEntity.uid와 checkUid 모두 null 값이면 접근 가능해짐
    if (checkUid !== process.env.ADMIN_UID && checkUid !== essayEntity.uid) {
      throw new ApiError(
        '해당 사용자가 다른 유저의 채점 결과 페이지로 접근시도',
        401,
        '열람 권한이 없습니다.',
      );
    }

    let countTotal = 0;
    // 사용자 정보로 ScoringResult 세개를 찾아서 반환
    let resultHistory = null;
    if (essayEntity.uid) {
      const docs = await findEssayByUidAndOrderBy({
        uid: essayEntity.uid,
        orderBy: 'createdAt',
        orderType: 'desc',
      });

      countTotal = docs.length;
      resultHistory = docs
        .filter((doc) => doc.data().scoringResult !== null)
        .slice(0, 3)
        .map((doc) => {
          const { uid: essayUid, ...remainEssay } = doc.data() as EssayEntity;
          const res: EssayResponseDto = {
            ...remainEssay,
            essayId: doc.id,
          };
          return res;
        });
    }

    // essayEntity 중에서 필요한 것만 추출.
    const { essayText: text, uid, scoringResult, ...remainEssay } = essayEntity;
    if (!scoringResult) {
      throw new ApiError('채점 결과가 없습니다.', 404, '채점 결과가 없습니다.');
    }

    // scoringResult 를 재조합하여 반환.
    const { total, exp, org, cont, ...remainScoringResult } = scoringResult;

    // topicId에 맞게 STATISTICS 가져오기
    let topic = {} as any;
    if (essayEntity.id === 1) {
      topic = BIOGRAPHY;
    }
    if (essayEntity.id === 2) {
      topic = FACILITY;
    }
    if (essayEntity.id === 3) {
      topic = REVIEW;
    }
    const {
      DATA_TOTAL_NUMBER,
      TOTAL_STATISTICS,
      EXP_STATISTICS,
      ORG_STATISTICS,
      CONT_STATISTICS,
    } = topic;

    const res: ScoringResponseDto = {
      text,
      ...remainEssay,
      ...remainScoringResult,
      countTotal,

      total: {
        ...makeSubScoring(
          DATA_TOTAL_NUMBER,
          TOTAL_STATISTICS,
          total.score,
          total.title,
        ),
      },
      exp: {
        ...makeSubScoring(
          DATA_TOTAL_NUMBER,
          EXP_STATISTICS,
          exp.score,
          exp.title,
        ),
        detail: exp.detail,
      },
      org: {
        ...makeSubScoring(
          DATA_TOTAL_NUMBER,
          ORG_STATISTICS,
          org.score,
          org.title,
        ),
        detail: org.detail,
      },
      cont: {
        ...makeSubScoring(
          DATA_TOTAL_NUMBER,
          CONT_STATISTICS,
          cont.score,
          cont.title,
        ),
        detail: cont.detail,
      },

      resultHistory,
    };

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
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
