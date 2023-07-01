// 존재하는 회원 여부 검증
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import findUserByEmail from '@/app/api/lib/firebase/authentication/findUserByEmail';

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
    /**
     * TODO: 로그인 여부 검증 로직 필요
     * 로그인 되지 않은 상태라고 가정하고 이후 코드 작성.
     */
    const { email } = params;
    const user = await findUserByEmail(email);

    // 회원이 존재함.
    if (user) {
      throw new Error('이미 존재하는 회원입니다.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    console.log(message);

    // 회원이 존재하지 않을 때 200 ok 반환.
    // 다른 함수들과 반대되는 로직이어서 불가피하게 error 처리 부분에 200 작성.
    if (message === '유저 정보를 찾을 수 없습니다.')
      return NextResponse.json({ msg: 'ok' }, { status: 200 });

    if (message === '이미 존재하는 회원입니다.')
      return NextResponse.json({ msg: message }, { status: 400 });

    return NextResponse.json({ msg: '서버 오류입니다' }, { status: 500 });
  }
}

export async function POST() {
  console.log('POST');
}
