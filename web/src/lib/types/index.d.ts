export type HeroIconComponent = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface User {
  email: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  nickname: string;
  email: string;
  password: string;
}

export interface EssayRequest {
  topic: string;
  essayText: string;
}

export interface EssayResponse {
  candidate: number;
  countCharacters: number;
  countSentences: number;
  total: Category;
  exp: Category & Detail[];
  org: Category & Detail[];
  cont: Category & Detail[];
}

export interface Category {
  sub: Detail[];
  min: 0;
  max: 0;
  median: 0;
  Q1: 0;
  Q3: 0;
  score: number;
  average: number;
  grade: Grade;
  percentage: number;
}

export type Grade = 'A' | 'B' | 'C' | 'D' | 'E';

export type EssayResult = EssayRequest & EssayResponse;

export type Detail = {
  score: number;
  average: number;
};
