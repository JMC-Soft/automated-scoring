export interface UserAuth {
  email: string;
  password: string;
  nickname: string;
}

export interface UserInfo {
  uid: string;
  email: string;
  nickname: string;
  gender: 'M' | 'F';
  schoolName: string;
  createdAt?: string;
}

export interface RegisterDto extends UserAuth {
  gender: 'M' | 'F';
  schoolName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface EvaluateRequestDto {
  email: string | null;
  topic: string;
  type: string;
  essayText: string;
}

export interface ScoringResponseDetail {
  title: string;
  score: number;
  average: number;
}

export interface ScoringResponseDto {
  exp: { title: string; detail: ScoringResponseDetail[] };
  org: { title: string; detail: ScoringResponseDetail[] };
  cont: { title: string; detail: ScoringResponseDetail[] };
}

// Statistics. 채점 결과 결과 통계 interface
export interface Statistics {
  average: number;
  standardDeviation: number;
  data: { [key: number]: number };
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}
export interface TotalStatistics extends Statistics {}
export interface SubStatistics extends Statistics {
  detail: number[];
}

// Essay.
export interface Essay {
  score: number;
  average: number;
  grade: 'A' | 'B' | 'C';
  percentage: number;
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
  title: string;
}
export interface EssayTotal extends Essay {}
export interface EssaySub extends Essay {
  detail: ScoringResponseDetail[];
}

interface ScoringResult {
  candidate: number; // 전체 참여자 수
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
  essayId: string; // essayId
  total: EssayTotal;
  exp: EssaySub;
  org: EssaySub;
  cont: EssaySub;
  createdAt?: string; // 생성일
}

// DB 구조
export interface ScoringResultEntity extends ScoringResult {
  uid: string | null; // 유저 ID
}

export interface ScoringResultResponse extends ScoringResult {
  essayInfo: {
    text: string;
    topic: string;
    type: string;
  };
  resultHistory: ScoringResult[] | null;
}

export interface EssayEntitiy {
  essayText: string;
  topic: string;
  type: string;
  uid: string | null;
  createdAt: string;
}
