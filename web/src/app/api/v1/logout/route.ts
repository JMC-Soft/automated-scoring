import { NextRequest, NextResponse } from 'next/server';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import ApiError from '@/app/api/lib/class/ApiError';

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await getDecodedToken(req);
    if (!decodedToken) {
      throw new ApiError(
        '로그인 정보 없이 로그아웃 요청',
        401,
        '로그인 되어있지 않습니다',
      );
    }

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
