import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import ApiError from '@/app/api/lib/class/ApiError';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await getDecodedToken(req);

    if (!decodedToken) {
      throw new ApiError(
        '토큰이 존재하지 않습니다.',
        401,
        '로그인 되어있지 않습니다.',
      );
    }

    const { email, name: nickname } = decodedToken;

    if (!email)
      throw new ApiError(
        '토큰 검증 후 이메일 불러오는 과정 중 발생한 오류',
        500,
      );

    return NextResponse.json(
      { email, nickname },
      {
        status: 200,
      },
    );
  } catch (err) {
    const isInstanceofApiError = err instanceof ApiError;

    const res = NextResponse.json(
      { msg: isInstanceofApiError ? err.resMessage : '서버 오류입니다.' },
      { status: isInstanceofApiError ? err.status : 500 },
    );

    res.cookies.delete('idToken');

    console.log('stack: GET /api/v1/verify/idToken');
    console.log(err);

    return res;
  }
}

export async function POST() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
