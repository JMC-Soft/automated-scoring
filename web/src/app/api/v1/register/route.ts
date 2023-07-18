import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createAuth from '@/app/api/repository/user/createAuth';
import findUserByEmailAndPassword from '@/app/api/repository/user/findUserByEmailAndPassword';
import ApiError from '@/app/api/lib/class/ApiError';
import getUserToken from '@/app/api/lib/getUserToken';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import { RegisterDto } from '@/app/api/lib/types';
import saveUser from '@/app/api/repository/user/saveUser';

// 신규 회원 가입
export async function POST(req: NextRequest) {
  try {
    const decodedToken = await getDecodedToken(req);
    if (decodedToken) {
      throw new ApiError(
        '로그인된 상태로 회원가입 요청',
        401,
        '이미 로그인 되어있습니다.',
      );
    }

    const { email, password, nickname, gender, schoolName }: RegisterDto =
      await req.json();

    const user = await createAuth({ email, password, nickname });

    // 여기 뭔가 이상하다.. 두개 하나로 합칠 수 있을거 같은데
    await saveUser({ gender, schoolName }, user.uid);
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
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }

    console.log('stack: POST /api/v1/register');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
