import { create } from "zustand";

interface FileStore {
  file: File | null;

  setFile: (file: File | null) => void;
}
interface ResultFileStore {
  resultFile: FormData | null;
  setResultFile: (file: File) => void;
}

const useFileStore = create<FileStore>((set) => ({
  file: null,
  setFile: (file: File | null) => set({ file }),
}));

const useResultFileStore = create<ResultFileStore>((set) => ({
  resultFile: null,
  setResultFile: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // const res =  fetch("api/v1/analyze", {
    //   method: "POST",
    //   body: formData,
    // });
    // // TODO: fetch를 통해 formData를 전송 및 받아온 Response 값에서 formData 추출



    set({ resultFile: formData });

  },
}));

export { useFileStore, useResultFileStore };
