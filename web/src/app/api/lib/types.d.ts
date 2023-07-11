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
  type: string;
  essayText: string;
}

interface ScoringResponseDto {
  exp: number[];
  org: number[];
  cont: number[];
}

interface EssayResponseDto {
  candidate: number; // 전체 참여자 수
  total: EssayTotal;
  exp: EssaySub;
  org: EssaySub;
  cont: EssaySub;
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
}

// Essay.
interface Essay {
  score: number;
  average: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  percentage: number;
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}
interface EssayTotal extends Essay {}
interface EssaySub extends Essay {
  sub: object[{ score: number; average: number }];
}

// Statistics. 채점 결과 결과 통계 interface
interface Statistics {
  average: number;
  standardDeviation: number;
  data: { [key: string]: number };
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}
interface TotalStatistics extends Statistics {}
interface SubStatistics extends Statistics {
  detail: number[];
}

// DB 구조
interface ScoringResultEntity {
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
  createdAt: string; // 생성일
  essayId: string; // 에세이 ID
  uid: string | null; // 유저 ID
  topic: string; // 주제
  candidate: number; // 전체 참여자 수
  total: EssayTotal;
  exp: EssaySub;
  org: EssaySub;
  cont: EssaySub;
}
interface EssayEntitiy {
  essayText: string;
  topic: string;
  type: string;
  uid: string | null;
  createdAt?: string;
}

export {
  ScoringResponseDto,
  EssayRequestDto,
  EssayResponseDto,
  UserInfoDto,
  LoginDto,
  RegisterDto,
  EssaySub,
  EssayTotal,
  SubStatistics,
  TotalStatistics,
  ScoringResultEntity,
  EssayEntitiy,
  Statistics,
};
