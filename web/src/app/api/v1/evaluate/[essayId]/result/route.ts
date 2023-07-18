import { NextRequest, NextResponse } from 'next/server';
import ApiError from '@/app/api/lib/class/ApiError';
import findScoringResultByEssayId from '@/app/api/repository/scoringResult/findScoringResultByEssayId';
import findEssayById from '@/app/api/repository/essay/findEssayById';
import { ScoringResultResponse } from '@/app/api/lib/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { essayId: string } },
) {
  try {
    const { essayId } = params;

    // EssayId로 ScoringResult를 찾아서 반환
    const { uid, ...remainScoringResult } = await findScoringResultByEssayId(
      essayId,
    );
    // EssayId로 Essay를 찾아서 반환
    const {
      essayText: text,
      createdAt,
      uid: essayUid,
      ...remainEssay
    } = await findEssayById(essayId);

    // TODO: 사용자 정보로 ScoringResult 세개를 찾아서 반환

    const res: ScoringResultResponse = {
      ...remainScoringResult,
      essayInfo: {
        text,
        ...remainEssay,
      },
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
