import create from 'zustand';

type State = {
  topic: string;
};

const useAuthStore = create<State>((set) => ({
  topic: '',
  set,
}));

export default useAuthStore;
