import { FirebaseAuthError } from 'firebase-admin/lib/utils/error';
import { FirebaseError } from '@firebase/util';
import {
  EMAIL_ALREADY_EXISTS,
  ID_TOKEN_EXPIRED,
  INVALID_CREDENTIAL,
  INVALID_DISPLAY_NAME,
  INVALID_EMAIL,
  USER_NOT_FOUND,
  WEAK_PASSWORD,
} from '@/app/api/const/errors';

class ApiError extends Error {
  status: number;

  resMessage: string;

  constructor(message: string, status: number, resMessage?: string) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.resMessage = resMessage || '서버 오류입니다.';

    console.log('status: ', this.status);
    console.log('message: ', this.message);
    console.log('resMessage: ', this.resMessage);
    console.log('stack: ', this.stack);
  }

  public static firebaseError(err: FirebaseError) {
    // AuthErrorCode
    // AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY

    if (err.code === USER_NOT_FOUND)
      return new ApiError(err.message, 404, '유저 정보를 찾을 수 없습니다.');
    if (err.code === EMAIL_ALREADY_EXISTS)
      throw new ApiError(err.message, 409, '이미 존재하는 이메일입니다.');
    if (err.code === INVALID_EMAIL)
      throw new ApiError(err.message, 422, '유효하지 않은 이메일입니다.');
    if (err.code === WEAK_PASSWORD)
      throw new ApiError(
        err.message,
        422,
        '비밀번호 형식이 올바르지 않습니다.',
      );
    if (err.code === INVALID_DISPLAY_NAME)
      throw new ApiError(err.message, 422, '유효하지 않은 닉네임입니다.');
    if (err.code === ID_TOKEN_EXPIRED)
      return new ApiError(err.message, 401, '토큰이 만료되었습니다.');
    if (err.code === INVALID_CREDENTIAL)
      return new ApiError(err.message, 401, '토큰 정보가 유효하지 않습니다.');

    return new ApiError(err.message, 500, '서버 오류입니다.');
  }

  private static isFirebaseAuthError(err: unknown): err is FirebaseAuthError {
    try {
      return (err as FirebaseAuthError).code.startsWith('auth/');
    } catch (error) {
      return false;
    }
  }

  public static handleError(err: any) {
    if (err instanceof FirebaseError || ApiError.isFirebaseAuthError(err)) {
      return ApiError.firebaseError(err);
    }

    if (err instanceof ApiError) {
      return err;
    }

    if (err instanceof Error) {
      return new ApiError(err.message, 500);
    }

    console.log('err: ', err);
    return new ApiError('알 수 없는 에러', 500);
  }
}

export default ApiError;
