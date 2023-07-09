import { NextRequest, NextResponse } from 'next/server';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import ApiError from '@/app/api/lib/class/ApiError';

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
  const { email } = params;
  let uid = null;

  // 사용자가 로그인이 되어있는 경우
  if (email) {
    const decodedToken = await getDecodedToken(req);
    if (!decodedToken)
      throw new ApiError('토큰이 유효하지 않음', 401, '로그인이 필요합니다.');
    if (decodedToken.email !== email)
      throw new ApiError(
        '프론트에서 받은 email정보와 토큰의 email 정보가 다름',
        401,
        '로그인된 회원과 요청된 회원이 다릅니다.',
      );

    uid = decodedToken.uid;

    /**
     * TODO: uid를 이용해서 사용자의 평가 기록을 가져온다.
     */
  }
}

export async function POST() {
  return NextResponse.json({ msg: '잘못된 요청입니다.' }, { status: 404 });
}
