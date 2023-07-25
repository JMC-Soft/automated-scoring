import { NextRequest, NextResponse } from 'next/server';
import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
import ApiError from '@/app/api/lib/class/ApiError';
import findUsers from '@/app/api/repository/user/findUsers';
import { UserInfoDto, UserInfoEntity } from '@/app/api/lib/types';

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await getDecodedToken(req);
    if (!decodedToken) {
      throw new ApiError(
        '관리자 토큰 정보가 유효하지 않음',
        401,
        '토큰 정보가 유효하지 않습니다.',
      );
    }

    if (decodedToken.uid !== process.env.ADMIN_UID) {
      throw new ApiError(
        '관리자 토큰의 정보와 관리자 이메일이 일치하지 않음',
        401,
        '열람 권한이 없습니다.',
      );
    }

    const users = await findUsers();
    const res: UserInfoDto[] = users.map((user) => {
      const { uid, ...remainUser } = user.data() as UserInfoEntity;
      const userInfo: UserInfoDto = {
        ...remainUser,
      };
      return userInfo;
    });

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ msg: err.resMessage }, { status: err.status });
    }

    console.log('stack: GET /api/v1/admin/user');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}
export async function POST() {
  return NextResponse.json({ msg: '잘못된 요청입니다.' }, { status: 404 });
}
