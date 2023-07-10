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

interface EssayTotal {
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

interface EssaySub {
  score: number;
  sub: number[{ score: number; average: number }];
  average: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  percentage: number;
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}

interface SubStatistics {
  average: number;
  standardDeviation: number;
  data: { [key: string]: number };
  subAverage: number[];
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}
interface TotalStatistics {
  average: number;
  standardDeviation: number;
  data: { [key: string]: number };
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}

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
};
