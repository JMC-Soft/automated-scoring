import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  EvaluateRequest,
  EvaluateResponse,
  EssayResult,
  Topic,
} from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants/constants';
import useAuthStore from '@/store/authStore';

export type EssayState = EvaluateRequest & {
  result: EssayResult;
};

export type EssayActions = {
  setTopic: (topic: Topic) => void;
  setEssayText: (essayText: string) => void;
  fetchEvaluateEssay: ({
    topic,
    essayText,
  }: EvaluateRequest) => Promise<EvaluateResponse>;
};

const useEssayStore = create<EssayState & EssayActions>()(
  devtools(
    persist(
      (set) => ({
        topic: {} as Topic,
        essayText: '',
        result: {} as EssayResult,
        setTopic: (topic) => set({ topic }),
        setEssayText: (essayText: string) => set({ essayText }),
        fetchEvaluateEssay: async ({ topic, essayText }) => {
          const email = useAuthStore.getState().user?.email ?? null;

          const response = await fetch(`${API_BASE_URL}/evaluate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              topic: topic.title,
              type: topic.type,
              essayText,
            }),
          });

          if (!response.ok) {
            throw new Error('에세이 평가에 실패했습니다.\n다시 시도해 주세요.');
          }

          const essayId: EvaluateResponse = await response.json();

          return essayId;
        },
      }),
      {
        name: 'essayStore',
      },
    ),
  ),
);
export default useEssayStore;
