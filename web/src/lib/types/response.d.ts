import { Essay, HistoryEssay, User, WordCloud } from '@/lib/types/index';

export type EvaluateResponse = string;

export type SignUpResponse = User;

export type SignInResponse = User;
export interface EssayResponse {}

export interface ResultResponse extends Essay {
  resultHistory: HistoryEssay[];
  countTotal: number;
}

export interface HistoryResponse {
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

  resultHistory: HistoryEssay[];
  wordCloud: WordCloud;
}
