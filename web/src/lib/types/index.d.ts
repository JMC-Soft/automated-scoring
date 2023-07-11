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

export interface EvaluateRequest {
  topic: Topic;
  essayText: string;
}

export type EvaluateResponse = string;

export interface EssayResult {
  candidate: number;
  countCharacters: number;
  countSentences: number;
  createdAt: string;
  total: Statistic;
  exp: SubStatistic;
  org: SubStatistic;
  cont: SubStatistic;
  essayInfo: EssayInfo;
}

export interface EssayInfo {
  text: string;
  topic: string;
  type: TopicType;
}

export type SubStatistic = Statistic & DetailResult;
export interface Statistic {
  score: number;
  average: number;
  grade: Grade;
  percentage: number;
  min: 0;
  max: 0;
  median: 0;
  Q1: 0;
  Q3: 0;
}

export interface DetailResult {
  sub: Detail[];
}

export interface Detail {
  score: number;
  average: number;
}

export type Grade = 'A' | 'B' | 'C' | 'D' | 'E';

export type Topic = {
  title: string;
  type: TopicType;
};

export type TopicType = '글짓기' | '대안 제시' | '설명문';
