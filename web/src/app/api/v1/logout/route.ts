import { NextRequest, NextResponse } from 'next/server';
import ApiError from '@/app/api/lib/class/ApiError';

export async function GET(req: NextRequest) {
  try {
    const idToken = req.cookies.get('idToken');
    if (!idToken) {
      return NextResponse.json(
        { msg: '로그인 되어있지 않습니다' },
        { status: 401 },
      );
    }

    // idToken을 헤더에서 삭제하여 반환
    const res = NextResponse.json({ msg: 'ok' }, { status: 200 });
    res.cookies.delete('idToken');
    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }
    console.log('stack: GET /api/v1/logout');
    console.log(err);

    const res = NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
    res.cookies.delete('idToken');

    return res;
  }
}

export async function POST() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
