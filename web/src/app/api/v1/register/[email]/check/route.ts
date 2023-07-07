// 존재하는 회원 여부 검증
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import findUserByEmail from '@/app/api/repository/user/findUserByEmail';
import ApiError from '@/app/api/lib/class/ApiError';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';

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
    const decodedToken = await getDecodedToken(req);
    if (decodedToken) {
      throw new ApiError(
        '로그인된 회원이 회원가입 가능 여부 검증을 시도',
        401,
        '이미 로그인된 회원입니다.',
      );
    }

    const { email } = params;
    const user = await findUserByEmail(email);

    // 회원이 존재함.
    if (user) {
      return NextResponse.json(
        { msg: '이미 존재하는 회원입니다.' },
        { status: 400 },
      );
    }
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.message === '유저 정보를 찾을 수 없습니다.')
        return NextResponse.json({ msg: 'ok' }, { status: 200 });

      return NextResponse.json({ msg: err.message }, { status: err.status });
    }

    console.log('stack: GET /api/v1/register/[email]/check');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
