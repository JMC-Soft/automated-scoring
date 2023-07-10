interface RegisterDto {
  email: string;
  password: string;
  nickname: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface UserInfoDto {
  email: string;
  nickname: string;
}

interface EssayRequestDto {
  email: string | null;
  topic: string;
  essayText: string;
}

interface EssaySub {
  score: number;
  sub: number[];
  average: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
}

interface EssayResponse {
  candidate: number; // 전체 참여자 수
  total: {
    score: number; // 이사람의 총점
    average: number; // 전체 평균
    percentageStart: number; // 이사람의 총점이 몇 %에 해당하는지 시작점
    percentageEnd: number; // 이사람의 총점이 몇 %에 해당하는지 끝점
  };
  exp: EssaySubDto;
  org: EssaySubDto;
  cont: EssaySubDto;
}

interface ScoringResponseDto {
  exp: number[];
  org: number[];
  cont: number[];
}

interface Statistics {
  average: number;
  standardDeviation: number;
  data: { [key: string]: number };
}

export {
  ScoringResponseDto,
  EssayRequestDto,
  EssayResponse,
  UserInfoDto,
  LoginDto,
  RegisterDto,
  EssaySub,
  Statistics,
};
