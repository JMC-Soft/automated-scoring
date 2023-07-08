import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { EssayRequest, EssayResponse, EssayResult } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants/constants';
import useAuthStore from '@/store/authStore';

export type EssayState = EssayRequest & {
  result: EssayResult;
};

export type EssayActions = {
  setTopic: (topic: string) => void;
  setEssayText: (essayText: string) => void;
  fetchEvaluateEssay: ({
    topic,
    essayText,
  }: EssayRequest) => Promise<EssayResult>;
  setResult: (result: EssayResult) => void;
};

const useEssayStore = create<EssayState & EssayActions>()(
  devtools(
    persist(
      (set) => ({
        topic: '',
        essayText: '',
        result: {} as EssayResult,
        setTopic: (topic: string) => set({ topic }),
        setEssayText: (essayText: string) => set({ essayText }),
        fetchEvaluateEssay: async ({ topic, essayText }) => {
          const email = useAuthStore.getState().user?.email ?? null;
          const replaceText = essayText
            .replaceAll('"', "'")
            .replaceAll('\n', ' ');
          const response = await fetch(`${API_BASE_URL}/evaluate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              topic,
              essayText: replaceText,
            }),
          });

          if (!response.ok) {
            throw new Error('에세이 평가에 실패했습니다.\n다시 시도해 주세요.');
          }

          return {
            topic,
            essayText,
            ...((await response.json()) as EssayResponse),
          };
        },
        setResult: (result: EssayResult) => set({ result }),
      }),
      {
        name: 'essayStore',
      },
    ),
  ),
);
export default useEssayStore;
