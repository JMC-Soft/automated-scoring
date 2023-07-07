import { NextRequest, NextResponse } from 'next/server';
import findUserByEmailAndPassword from '@/app/api/repository/user/findUserByEmailAndPassword';
import ApiError from '@/app/api/lib/class/ApiError';
import { LoginDto } from '@/app/api/lib/types';
import getUserToken from '@/app/api/lib/getUserToken';

export async function POST(req: NextRequest) {
  try {
    /**
     * TODO: 로그인 여부 검증 로직 필요
     * 로그인 되지 않은 상태라고 가정하고 이후 코드 작성.
     */
    const loginDto: LoginDto = await req.json();
    const user = await findUserByEmailAndPassword(loginDto);

    const { email, displayName: nickname } = user;
    if (!email || !nickname) {
      throw new ApiError(
        'firebase에서 받아온 User객체에서 email or nickname을 찾지 못하는 에러',
        500,
      );
    }

    const idToken = await getUserToken(user);

    const res = NextResponse.json({ email, nickname }, { status: 200 });
    res.cookies.set('idToken', idToken, {
      httpOnly: true,
      secure: true,
    });

    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.message }, { status: err.status });
    }

    console.log('stack: POST /api/v1/login');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function GET() {
  console.log('GET');
}
