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
  total: {
    score: number;
    average: number;
    percentageStart: number;
    percentageEnd: number;
  };
  exp: SubCategory;
  org: SubCategory;
  cont: SubCategory;
}

export interface SubCategory {
  score: number;
  sub: number[];
  average: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
}

export type EssayResult = EssayRequest & EssayResponse;
