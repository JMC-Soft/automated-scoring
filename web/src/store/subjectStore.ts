import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EssayState = {
  topic: string;
  setTopic: (topic: string) => void;
  essayText: string;
  setEssayText: (essayText: string) => void;
};

const useEssayStore = create<EssayState>()(
  persist(
    (set) => ({
      topic: '',
      essayText: '',
      setTopic: (topic: string) => set({ topic }),
      setEssayText: (essayText: string) => set({ essayText }),
    }),
    {
      name: 'essayStore',
    },
  ),
);

export default useEssayStore;
