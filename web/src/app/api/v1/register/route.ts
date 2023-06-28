import type { NextRequest } from 'next/server';
import { findUserByEmail, saveUser } from '@/app/api/repository/user';
import { NextResponse } from 'next/server';

// 신규 회원 가입
export async function POST(req: NextRequest) {
  try {
    const { email, password, nickName } = await req.json();

    const checkUser = await findUserByEmail(email);
    if (checkUser) {
      return NextResponse.json(
        { msg: '이미 존재하는 회원입니다.' },
        {
          status: 400,
        },
      );
    }

    const user = await saveUser(email, password, nickName);

    if (!user) {
      return NextResponse.json(
        { msg: '회원 가입에 실패했습니다' },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        email: user.email,
        nickName: user.nickName,
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    console.log(message);
    return NextResponse.json({ msg: '서버 오류입니다' }, { status: 500 });
  }
}

export async function GET() {
  console.log('GET');
}
