import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createUser from '@/app/api/repository/users/createUser';
import findUserByEmailAndPassword from '@/app/api/repository/users/findUserByEmailAndPassword';

// 신규 회원 가입
export async function POST(req: NextRequest) {
  try {
    /**
     * TODO: 로그인 여부 검증 로직 필요
     * 로그인 되지 않은 상태라고 가정하고 이후 코드 작성.
     */
    const { email, password, nickName } = await req.json();

    await createUser({ email, password, nickName });
    const userCredential = await findUserByEmailAndPassword({
      email,
      password,
    });

    const res = NextResponse.json({ email, nickName }, { status: 200 });
    res.cookies.set('idToken', await userCredential.getIdToken());

    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    console.log(message);
    if (
      message === '이미 존재하는 이메일입니다' ||
      message === '유효하지 않은 이메일입니다' ||
      message === '비밀번호 형식이 올바르지 않습니다.' ||
      message === '유효하지 않은 닉네임입니다'
    )
      return NextResponse.json({ msg: message }, { status: 400 });

    return NextResponse.json({ msg: '서버 오류입니다' }, { status: 500 });
  }
}

export async function GET() {
  console.log('GET');
}
