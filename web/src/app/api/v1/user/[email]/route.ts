import { NextRequest, NextResponse } from 'next/server';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import ApiError from '@/app/api/lib/class/ApiError';
import findUserInfoByEmail from '@/app/api/repository/userInfo/findUserInfoByEmail';
import { UserInfoDto, UserInfoEntity } from '@/app/api/lib/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const { email } = params;

    // 사용자 검증
    const decodedToken = await getDecodedToken(req);
    if (!decodedToken) {
      throw new ApiError(
        '회원의 토큰이 반환되지 않음',
        401,
        '토큰 정보가 유효하지 않습니다.',
      );
    }
    if (decodedToken.email !== email) {
      throw new ApiError(
        '프론트에서 받은 email정보와 토큰의 email 정보가 다름',
        401,
        '토큰 정보가 유효하지 않습니다.',
      );
    }

    const docs = await findUserInfoByEmail(email);
    const { uid, ...remain } = docs.data() as UserInfoEntity;
    const res: UserInfoDto = remain;

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }

    console.log('stack: GET /api/v1/user/[email]');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ msg: '잘못된 요청입니다.' }, { status: 404 });
}
