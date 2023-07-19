import { EssayType, TopicTitle } from '@/lib/types/index';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  nickname: string;
  email: string;
  password: string;
  gender: 'F' | 'M';
  schoolName: string;
}

export interface EvaluateRequest {
  topic: TopicTitle;
  type: EssayType;
  essayText: string;
  email: string | null;
}
