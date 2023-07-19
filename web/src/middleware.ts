// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import getDecodedToken from '@/app/api/lib/auth/getDecodedToken';
// import ApiError from '@/app/api/lib/class/ApiError';
//
// export async function middleware(req: NextRequest) {
//   try {
//     if (req.nextUrl.pathname.startsWith('/api/v1/verify/idToken')) {
//       // 토큰이 존재하는지 확인
//       const decodedToken = await getDecodedToken(req);
//       if (!decodedToken) {
//         throw new ApiError(
//           '토큰이 존재하지 않습니다.',
//           401,
//           '로그인 되어있지 않습니다.',
//         );
//       }
//
//       return NextResponse;
//     }
//
//     if (req.nextUrl.pathname.startsWith('/api/v1/')) {
//     }
//   } catch (err) {
//     if (err instanceof ApiError) {
//       return NextResponse.json({ msg: err.resMessage }, { status: err.status });
//     }
//
//     console.log('stack: POST /api/v1/register');
//     console.log(err);
//     return NextResponse.json({ msg: '서버 오류입니다.' }, { status: 500 });
//   }
// }
//
// export const config = {
//   matcher: '/api/v1/*',
// };
