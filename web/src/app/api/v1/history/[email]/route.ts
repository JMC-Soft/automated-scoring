import { NextRequest, NextResponse } from 'next/server';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import ApiError from '@/app/api/lib/class/ApiError';
import findScoringResultsByUidAndOrderBy from '@/app/api/repository/scoringResult/findScoringResultsByUidAndOrderBy';
import { ScoringResult, ScoringResultEntity } from '@/app/api/lib/types';

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
    if (decodedToken.email !== email)
      throw new ApiError(
        '사용자에게 받은 email과 token 정보가 일치하지 않음',
        401,
        '토큰 정보가 유효하지 않습니다.',
      );

    // uid 를 이용해 평가 기록 리스트를 가져옴
    const { uid } = decodedToken;
    const docs = await findScoringResultsByUidAndOrderBy({
      uid,
      orderBy: 'createdAt',
      orderType: 'desc',
    });

    const res: ScoringResult[] = docs.map((doc) => {
      const { uid: scoringResultUid, ...remain } =
        doc.data() as ScoringResultEntity;
      return remain;
    });

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
