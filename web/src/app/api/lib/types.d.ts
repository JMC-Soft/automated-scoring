export interface RegisterDto {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserInfoDto {
  email: string;
  nickname: string;
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

// export interface EvaluateResponseDto {
//   candidate: number; // 전체 참여자 수
//   countCharacters: number; // 글자 수
//   countSentences: number; // 문장수
//   createdAt: string; // 생성일
//   essayId: string; // essayId
//   essayInfo: {
//     text: string;
//     topic: string;
//     type: string;
//   };
//
//   total: EssayTotal;
//   exp: EssaySub;
//   org: EssaySub;
//   cont: EssaySub;
// }

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

// DB 구조
export interface ScoringResultEntity {
  candidate: number; // 전체 참여자 수
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
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
  uid: string | null; // 유저 ID
  createdAt?: string; // 생성일
}

export interface EssayEntitiy {
  essayText: string;
  topic: string;
  type: string;
  uid: string | null;
  createdAt: string;
}
