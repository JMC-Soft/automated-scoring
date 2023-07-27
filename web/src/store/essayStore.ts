import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Topic } from '@/lib/types';

export type EssayState = {
  topic: Topic | null;
  essayText: string;
};

export type EssayActions = {
  setTopic: (topic: Topic) => void;
  setEssayText: (essayText: string) => void;
};

const useEssayStore = create<EssayState & EssayActions>()(
  devtools(
    persist(
      (set) => ({
        topic: null,
        essayText: '',
        setTopic: (topic) => set({ topic }),
        setEssayText: (essayText: string) => set({ essayText }),
      }),
      {
        name: 'essayStore',
      },
    ),
  ),
);
export default useEssayStore;
