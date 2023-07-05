interface RegisterDto {
  email: string;
  password: string;
  nickName: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface UserInfoDto {
  email: string;
  nickName: string;
}

interface EssayRequestDto {
  topic: string;
  essayText: string;
}

interface EssayResponseDto {
  candidate: number; // 전체 참여자 수
  total: {
    score: number; // 이사람의 총점
    average: number; // 전체 평균
    grade: number; // 전체 평균에 대한 이사람의 백분율
  };
  exp: {
    score: number; // 이사람의 exp 점수 합
    sub: number[]; // 이사람의 exp 점수 배열
    average: number; // 전체 exp 평균
    grade: number; // 이사람의 exp 등급
  };
  org: {
    score: number; // 이사람의 org 점수 합
    sub: number[]; // 이사람의 org 점수 배열
    average: number; // 전체 org 평균
    grade: number; // 이사람의 org 등급
  };
  cont: {
    score: number; // 이사람의 cont 점수 합
    sub: number[]; // 이사람의 cont 점수 배열
    average: number; // 전체 cont 평균
    grade: number; // 이사람의 cont 등급
  };
}

interface ScoringRequestDto {
  essayText: string;
}

interface ScoringResponseDto {
  exp: number[];
  org: number[];
  cont: number[];
}

export {
  ScoringRequestDto,
  ScoringResponseDto,
  EssayRequestDto,
  EssayResponseDto,
  UserInfoDto,
  LoginDto,
  RegisterDto,
};
