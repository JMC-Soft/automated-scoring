import { NextRequest, NextResponse } from 'next/server';
import findUserByEmailAndPassword from '@/app/api/repository/users/findUserByEmailAndPassword';

export async function POST(req: NextRequest) {
  try {
    /**
     * TODO: 로그인 여부 검증 로직 필요
     * 로그인 되지 않은 상태라고 가정하고 이후 코드 작성.
     */
    const loginDto = await req.json();
    const user = await findUserByEmailAndPassword(loginDto);

    const { email, displayName } = user;
    const idToken = await user.getIdToken();

    return NextResponse.json(
      { email, nickName: displayName },
      {
        status: 200,
        headers: {
          'Set-Cookie': `idToken=${idToken};`,
        },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    console.log(message);
    if (
      message === '패스워드가 잘못되었습니다.' ||
      message === '유저 정보가 없습니다.'
    )
      return NextResponse.json({ msg: message }, { status: 400 });

    return NextResponse.json({ msg: '서버 오류입니다' }, { status: 500 });
  }
}

export async function GET() {
  console.log('GET');
}
