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
  text: string;
  createdAt: string;
  topic: string;
  countCharacters: number;
  countSentences: number;
  total: Statistic;
  exp: SubStatistic;
  org: SubStatistic;
  cont: SubStatistic;
  candidate: number;
  essayId?: string;
  type: string;
}

export interface Statistic {
  score: number;
  grade: Grade;
  title: string;
  percentage: number;
  average: number;
  min: number;
  max: number;
  median: number;
  Q1: number;
  Q3: number;
}
export interface SubStatistic extends Statistic {
  subAverage: number[];
  detail: Detail[];
}

export interface Detail {
  title: string;
  score: number;
  average: number;
}

export interface HistoryEssay {
  essayText?: string;
  createdAt: string;
  grade: Grade;
  scoringResult: {
    countCharacters: number;
    countSentences: number;
    total: {
      score: number;
      title: string;
    };
    exp: {
      score: number;
      title: string;
      detail: {
        score: number;
        title: string;
        average: number;
      }[];
    };
    org: {
      score: number;
      title: string;
      detail: {
        score: number;
        title: string;
        average: number;
      }[];
    };
    cont: {
      score: number;
      title: string;
      detail: {
        score: number;
        title: string;
        average: number;
      }[];
    };
  };
  topic: string;
  type: string;
  essayId: string;
}

export type Grade = 'A' | 'B' | 'C';

export type Topic = {
  id: number;
  title: TopicTitle;
  type: EssayType;
  prompt: string[];
  subject: EssaySubject;
};

export type TopicTitle =
  | '본인에게 의미있는 인물에 대한 위인전을 쓰시오.'
  | '본인의 성격과 장/단점에 대해 쓰시오.'
  | '본인이 최근 인상깊게 본 영화 혹은 책에 대해 감상문을 쓰시오.';

export type EssayType = '자기표현' | '설득' | '정보전달';
export type EssaySubject = '나의 위인전' | '본인의 성격' | '감상문';

export type Status = 'idle' | 'pending' | 'success' | 'error';

export interface WordCloud {
  1: { text: string; value: number }[];
  2: { text: string; value: number }[];
  3: { text: string; value: number }[];
}
