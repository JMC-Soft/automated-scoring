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
  essayId: string;
  essayInfo: EssayInfo;
  total: Statistic;
  exp: SubStatistic;
  org: SubStatistic;
  cont: SubStatistic;
}

export interface EssayInfo {
  text: string;
  topic: string;
  type: TopicType;
}

export type SubStatistic = Statistic & DetailResult;
export interface Statistic {
  title: string;
  score: number;
  average: number;
  grade: Grade;
  percentage: number;
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}

export interface DetailResult {
  detail: Detail[];
}

export interface Detail {
  title: string;
  score: number;
  average: number;
}

export type Grade = 'A' | 'B' | 'C';

export type Topic = {
  title: string;
  type: TopicType;
};

export type TopicType = '글짓기' | '대안 제시' | '설명문';
