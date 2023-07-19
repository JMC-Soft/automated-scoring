import React from 'react';

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

export interface Essay {
  candidate: number;
  countCharacters: number;
  countSentences: number;
  createdAt: string;
  essayId: string;
  total: Statistic;
  exp: SubStatistic;
  org: SubStatistic;
  cont: SubStatistic;
  text: string;
  type: string;
  topic: string;
}

export type Result = {
  resultHistory: Essay[];
} & Essay;

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
  title: TopicTitle;
  type: EssayType;
};

export type TopicTitle =
  | '나의 위인전'
  | '혐오시설 건설문제에 대한 본인의 생각'
  | '영화감상문';

export type EssayType = '글짓기' | '대안 제시' | '설명문';

export type Status = 'idle' | 'pending' | 'success' | 'error';
