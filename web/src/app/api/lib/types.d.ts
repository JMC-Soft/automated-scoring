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

export interface StatisticsObject {
  DATA_TOTAL_NUMBER: number;
  TOTAL_STATISTICS: TotalStatistics;
  EXP_STATISTICS: SubStatistics;
  ORG_STATISTICS: SubStatistics;
  CONT_STATISTICS: SubStatistics;
}

/**
 * 통신에 필요한 Essay 및 채점결과 interface
 */
export interface EssayRequestDto {
  email: string;
  id: number;
  essayText: string;
  topic: string;
  type: string;
}
export interface EssayResponseDto {
  id: number;
  essayText: string;
  topic: string;
  type: string;
  createdAt: string;
  essayId: string;

  scoringResult: ScoringResultField | null;
}

export interface Score {
  score: number;
  average: number;
  grade: 'A' | 'B' | 'C';
  percentage: number;
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}

// omit 문법 ref: https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type ResultHistory = (Omit<EssayEntity, 'uid'> & { essayId: string })[] | null;

export interface ScoringResponseDto {
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
  countTotal: number; // 총 답안수
  text: string;
  topic: string;
  type: string;
  createdAt: string;

  total: {
    title: string;
  } & Score;
  exp: ScoredEssay.exp & Score;
  org: ScoredEssay.org & Score;
  cont: ScoredEssay.cont & Score;

  resultHistory: ResultHistory;
}

type ResultHistoryMinusEssayText = Omit<ResultHistory, 'essayText'>;

export interface HistoryResponseDto {
  countAverageCharacters: number;
  countAverageSentences: number;
  countTotal: number;
  expression: {
    title: string;
    average: number;
    score: number | null;
  };
  information: {
    title: string;
    average: number;
    score: number | null;
  };
  persuade: {
    title: string;
    average: number;
    score: number | null;
  };

  resultHistory: ResultHistoryMinusEssayText;
}

/**
 * DB에 저장할 Essay 및 채점 결과 interface
 */

export interface ScoredEssay {
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

export interface ScoringResultField {
  countCharacters: number; // 글자 수
  countSentences: number; // 문장수
  total: { title: '종합'; score: number };
  exp: ScoredEssay.exp & { score: number };
  org: ScoredEssay.org & { score: number };
  cont: ScoredEssay.cont & { score: number };
}

export interface EssayEntity {
  id: number;
  essayText: string;
  topic: string;
  type: string;
  uid: string | null;
  createdAt: string;

  scoringResult: ScoringResultField | null;
}
