import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import isLoggedIn from '@/app/api/lib/isLoggedIn';
import findUserByEmail from '@/app/api/repository/user/findUserByEmail';
import ApiError from '@/app/api/lib/class/ApiError';

export async function GET(req: NextRequest) {
  try {
    const idToken = req.cookies.get('idToken');

    if (!idToken)
      return NextResponse.json(
        { msg: '로그인 되어있지 않습니다' },
        { status: 401 },
      );

    const email = await isLoggedIn(idToken.value);
    if (!email)
      throw new ApiError(
        '토큰 검증 후 이메일 불러오는 과정 중 발생한 오류',
        500,
      );

    const user = await findUserByEmail(email);
    const { displayName: nickname } = user;

    return NextResponse.json(
      { email, nickname },
      {
        status: 200,
      },
    );
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.message }, { status: err.status });
    }

    console.log('stack: GET /api/v1/verify/idToken');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
