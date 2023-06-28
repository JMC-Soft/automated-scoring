// 존재하는 회원 여부 검증
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/app/api/repository/User';

const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/;

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
    const { email } = params;

    // 이메일이 들어오지 않았을 때
    if (!email) {
      return NextResponse.json(
        { msg: '이메일을 입력해 주세요' },
        {
          status: 400,
        },
      );
    }

    // 이메일 형식이 올바르지 않을 때
    if (emailRegex.test(email) === false) {
      return NextResponse.json(
        { msg: '이메일의 형식이 올바르지 않습니다.' },
        {
          status: 400,
        },
      );
    }

    const user = await findUserByEmail(email);

    // 회원이 존재함.
    if (user) {
      return NextResponse.json(
        { msg: '이미 존재하는 회원입니다.' },
        {
          status: 400,
        },
      );
    }

    // 회원이 존재하지 않음.
    return NextResponse.json({ msg: 'ok' }, { status: 200 });
  } catch (error) {
    // 레퍼런스 : https://github.com/vercel/next.js/issues/50491
    const message = error instanceof Error ? error.message : 'Unexpected error';
    console.log(message);
    return NextResponse.json({ msg: '서버 오류입니다' }, { status: 500 });
  }
}

export async function POST() {
  console.log('POST');
}
