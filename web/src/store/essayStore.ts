import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TopicTitle, EssayType, Topic } from '@/lib/types';

export type EssayState = {
  title: TopicTitle | null;
  type: EssayType | null;
  essayText: string;
};

export type EssayActions = {
  setTopic: ({ title, type }: Topic) => void;
  setEssayText: (essayText: string) => void;
};

const useEssayStore = create<EssayState & EssayActions>()(
  devtools(
    persist(
      (set) => ({
        title: null,
        type: null,
        essayText: '',
        setTopic: ({ title, type }) => set({ title, type }),
        setEssayText: (essayText: string) => set({ essayText }),
      }),
      {
        name: 'essayStore',
      },
    ),
  ),
);
export default useEssayStore;
