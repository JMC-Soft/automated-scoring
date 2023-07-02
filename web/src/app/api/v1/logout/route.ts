import { NextResponse } from 'next/server';

export async function GET() {
  /**
   * TODO: 로그인 여부 검증 로직 필요
   * 로그인 된 상태라고 가정하고 이후 코드 작성.
   */

  // idToken을 헤더에서 삭제하여 반환
  return NextResponse.json(
    { msg: 'ok' },
    {
      status: 200,
      headers: {
        'Set-Cookie': `idToken=false;`,
      },
    },
  );
}

export async function POST() {
  console.log('POST');
}
