import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type State = {
  topic: string;
  resultText: string;
  essayText: string;
  resultTopic: string;
};

export type Actions = {
  setTopic: (topic: string) => void;
  setEssayText: (essayText: string) => void;
};

const useEssayStore = create<State & Actions>()(
  persist(
    (set) => ({
      topic: '',
      essayText: '',
      resultTopic: '안녕하세요',
      resultText:
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요ffdgs\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n' +
        '안녕하세요\n' +
        '\n',
      setTopic: (topic: string) => set({ topic }),
      setEssayText: (essayText: string) => set({ essayText }),
    }),
    {
      name: 'essayStore',
    },
  ),
);

export default useEssayStore;
