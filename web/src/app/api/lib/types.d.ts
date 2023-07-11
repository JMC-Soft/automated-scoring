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

interface EvaluateRequestDto {
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

interface EvaluateResponseDto {
  candidate: number; // 전체 참여자 수
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
  createdAt: string; // 생성일
  essayId: string; // essayId
  essayInfo: {
    text: string;
    topic: string;
    type: string;
  };

  total: EssayTotal;
  exp: EssaySub;
  org: EssaySub;
  cont: EssaySub;
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
  sub: { score: number; average: number }[];
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
interface ScoringResultEntity extends EvaluateResponseDto {
  uid: string | null; // 유저 ID
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
  EvaluateRequestDto,
  EvaluateResponseDto,
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
