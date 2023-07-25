import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createAuth from '@/app/api/repository/user/createAuth';
import findUserByEmailAndPassword from '@/app/api/repository/user/findUserByEmailAndPassword';
import ApiError from '@/app/api/lib/class/ApiError';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import { RegisterDto } from '@/app/api/lib/types';
import saveUserInfo from '@/app/api/repository/user/saveUserInfo';
import makeCreatedAt from '@/app/api/lib/makeCreatedAt';

// 신규 회원 가입
export async function POST(req: NextRequest) {
  try {
    // 이미 로그인된 상태이면 에러처리
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
    if (!email || !password || !nickname || !gender || !schoolName) {
      throw new ApiError(
        '회원가입 요청 시 필요한 정보가 부족합니다.',
        400,
        '필수 정보를 모두 입력해주세요.',
      );
    }

    // auth 생성
    const user = await createAuth({ email, password, nickname });

    // User 추가정보 db에 저장
    await saveUserInfo({
      uid: user.uid,
      email,
      nickname,
      gender,
      schoolName,
      createdAt: makeCreatedAt(),
    });

    // 회원가입과 동시에 로그인 처리
    const userCredential = await findUserByEmailAndPassword({
      email,
      password,
    });

    const idToken = await userCredential.getIdToken();

    // 토큰값 세팅
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
