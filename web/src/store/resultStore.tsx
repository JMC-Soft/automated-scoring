import { create } from 'zustand';

interface ResultUrlStore {
  resultUrl: string;
  setResultUrl: (file: File) => void;
}

const useResultUrlStore = create<ResultUrlStore>((set) => ({
  resultUrl: '',
  setResultUrl: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // 백엔드측에 파일을 formData로 전송하고, 결과 url을 json 형태로 받아옴
    const res = await fetch('api/v1/analyze', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    set({ resultUrl: data.url });
  },
}));

export default useResultUrlStore;
