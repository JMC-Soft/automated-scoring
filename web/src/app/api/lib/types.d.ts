/**
 * 로그인 or 회원가입 interface
 */
export interface UserAuth {
  email: string;
  password: string;
  nickname: string;
}

export interface UserInfoDto {
  email: string;
  nickname: string;
  gender: 'M' | 'F';
  schoolName: string;
  createdAt?: string;
}
export interface UserInfoEntity extends UserInfoDto {
  uid: string;
}

export interface RegisterDto extends UserAuth {
  gender: 'M' | 'F';
  schoolName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

/**
 * 통계 interface
 */
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
  subAverage: number[];
}

/**
 * 반환할 채점 결과 interface
 */

// Essay.
// export interface Essay {
//   score: number;
//   average: number;
//   grade: 'A' | 'B' | 'C';
//   percentage: number;
//   min: number;
//   max: number;
//   median: number;
//   Q1: number;
//   Q3: number;
//   title: string;
// }
// export interface EssayTotal extends Essay {}
// export interface EssaySub extends Essay {
//   detail: ScoringResponseDetail[];
// }
//
// export interface ScoringResultResponse extends ScoringResult {
//   essayInfo: {
//     text: string;
//     topic: string;
//     type: string;
//   };
//   resultHistory: ScoringResult[] | null;
// }

/**
 * DB에 저장할 Essay 및 채점 결과 interface
 */
export interface ScoringResponse {
  exp: {
    title: string;
    detail: { title: string; score: number; average: number }[];
  };
  org: {
    title: string;
    detail: { title: string; score: number; average: number }[];
  };
  cont: {
    title: string;
    detail: { title: string; score: number; average: number }[];
  };
}

export interface ScoringResult {
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
  total: { title: '종합'; score: number };
  exp: { score: number } & ScoringResponse.exp;
  org: { score: number } & ScoringResponse.org;
  cont: { score: number } & ScoringResponse.cont;
}

export interface EssayEntitiy {
  essayText: string;
  topic: string;
  type: string;
  uid: string | null;
  createdAt: string;

  scoringResult: ScoringResult;
}
