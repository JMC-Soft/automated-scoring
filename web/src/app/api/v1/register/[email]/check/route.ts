// 존재하는 회원 여부 검증
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import findUserByEmail from '@/app/api/repository/user/findUserByEmail';
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
  try {
    /**
     * TODO: 로그인 여부 검증 로직 필요
     * 로그인 되지 않은 상태라고 가정하고 이후 코드 작성.
     */
    const { email } = params;
    const user = await findUserByEmail(email);

    // 회원이 존재함.
    if (user) {
      throw new ApiError(
        '이미 존재하는 회원입니다.',
        400,
        'register/[email]/check',
      );
    }
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.message === '유저 정보를 찾을 수 없습니다.')
        return NextResponse.json({ msg: 'ok' }, { status: 200 });

      return NextResponse.json({ msg: err.message }, { status: err.status });
    }

    console.log('stack: GET /api/v1/register/[email]/check');
    console.log(err);
    return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
}
