export interface RegisterDto {
  email: string;
  password: string;
  nickName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserInfoDto {
  email: string;
  nickName: string;
}

export interface EssayDto {
  topic: string;
  essayText: string;
}
