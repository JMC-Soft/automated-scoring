import { NextRequest, NextResponse } from 'next/server';
import findUserByEmailAndPassword from '@/app/api/repository/user/findUserByEmailAndPassword';
import ApiError from '@/app/api/lib/class/ApiError';
import { LoginDto } from '@/app/api/lib/types';
import getUserToken from '@/app/api/lib/getUserToken';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';

export async function POST(req: NextRequest) {
  try {
    const decodedToken = await getDecodedToken(req);
    if (decodedToken) {
      throw new ApiError(
        '로그인된 상태로 로그인 요청',
        401,
        '이미 로그인된 회원입니다.',
      );
    }

    const loginDto: LoginDto = await req.json();
    const user = await findUserByEmailAndPassword(loginDto);

    const { email, displayName: nickname } = user;

    if (!email) {
      throw new ApiError(
        'firebase에서 받아온 User객체에서 email을 찾지 못하는 에러',
        500,
      );
    }
    if (!nickname) {
      throw new ApiError(
        'firebase에서 받아온 User객체에서 nickname을 찾지 못하는 에러',
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
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }

    console.log('stack: POST /api/v1/login');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function GET() {
  console.log('GET');
}
