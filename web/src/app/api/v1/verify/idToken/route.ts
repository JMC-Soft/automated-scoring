import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import isLoggedIn from '@/app/api/lib/isLoggedIn';
import findUserByEmail from '@/app/api/repository/users/findUserByEmail';

export async function GET(req: NextRequest) {
  try {
    const idToken = await req.cookies.get('idToken');

    if (!idToken) {
      throw new Error('로그인 되어있지 않습니다');
    }

    const email = await isLoggedIn(idToken.value);
    if (!email) throw new Error('사용자의 이메일 정보가 존재하지 않습니다.');

    const user = await findUserByEmail(email);
    const { displayName } = user;

    return NextResponse.json(
      { email, nickName: displayName },
      {
        status: 200,
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    console.log(message);
    if (
      message === '로그인 되어있지 않습니다' ||
      message === '토큰이 만료되었습니다.' ||
      message === '토큰 정보가 유효하지 않습니다.'
    )
      return NextResponse.json({ msg: message }, { status: 401 });

    if (
      message === '사용자의 이메일 정보가 존재하지 않습니다.' ||
      message === '유저 정보를 찾을 수 없습니다.'
    )
      return NextResponse.json({ msg: message }, { status: 400 });

    return NextResponse.json({ msg: '서버 오류입니다' }, { status: 500 });
  }
}

export async function POST() {
  console.log('POST');
}
