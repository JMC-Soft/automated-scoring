import { NextResponse } from 'next/server';

export async function GET() {
  try {
    /**
     * TODO: 로그인 여부 검증 로직 필요
     * 로그인 된 상태라고 가정하고 이후 코드 작성.
     */

    // idToken을 헤더에서 삭제하여 반환
    const res = NextResponse.json({ msg: 'ok' }, { status: 200 });
    res.cookies.delete('idToken');
    return res;
  } catch (err) {
    console.log('stack: GET /api/v1/logout');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
