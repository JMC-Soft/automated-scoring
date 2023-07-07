import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createUser from '@/app/api/repository/user/createUser';
import findUserByEmailAndPassword from '@/app/api/repository/user/findUserByEmailAndPassword';
import ApiError from '@/app/api/lib/class/ApiError';
import getUserToken from '@/app/api/lib/getUserToken';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';

// 신규 회원 가입
export async function POST(req: NextRequest) {
  try {
    const decodedToken = await getDecodedToken(req);
    if (decodedToken) {
      throw new ApiError('이미 로그인된 회원입니다.', 401);
    }

    const { email, password, nickname } = await req.json();

    await createUser({ email, password, nickname });

    const userCredential = await findUserByEmailAndPassword({
      email,
      password,
    });
    const idToken = await getUserToken(userCredential);

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

    console.log('stack: POST /api/v1/register');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
