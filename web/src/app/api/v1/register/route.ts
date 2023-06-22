import type { NextRequest } from 'next/server';
import { findUserByEmail, saveUser } from '@/app/api/repository/User';
import { NextResponse } from 'next/server';

// 존재하는 회원 여부 검증
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';

  // 이메일 형식이 올바르지 않음
  if (!email) {
    return NextResponse.json(
      {
        result: 'error',
        status: { errCode: 1, msg: '이메일 형식이 올바르지 않습니다.' },
      },
      { status: 200 },
    );
  }

  const user = await findUserByEmail(email);

  // 회원이 존재함.
  if (user) {
    return NextResponse.json(
      {
        result: 'error',
        status: { errCode: 2, msg: '이미 존재하는 회원입니다.' },
      },
      { status: 200 },
    );
  }

  // 회원이 존재하지 않음.
  return NextResponse.json(
    {
      result: 'success',
    },
    { status: 200 },
  );
}

// 신규 회원 가입
export async function POST(req: NextRequest) {
  const { email, password, nickName } = await req.json();

  const checkUser = await findUserByEmail(email);
  if (checkUser)
    return NextResponse.json({
      result: 'error',
      status: { errCode: 2, msg: '이미 존재하는 회원입니다.' },
    });

  const user = await saveUser(email, password, nickName);

  if (!user) {
    return NextResponse.json(
      {
        result: 'error',
        status: { errCode: 4, msg: '회원 가입에 실패했습니다.' },
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      result: 'success',
    },
    { status: 200 },
  );
}
