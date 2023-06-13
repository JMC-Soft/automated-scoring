import { create } from "zustand";

interface ResultUrlStore {
  resultUrl: String;
  setResultUrl: (file: File) => void;
}

const useResultUrlStore = create<ResultUrlStore>((set) => ({
  resultUrl: "",
  setResultUrl: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // const res = await fetch("api/v1/analyze", {
    //   method: "POST",
    //   body: formData,
    // });
    // // TODO: fetch를 통해 formData를 전송 및 받아온 Response 값에서 formData 추출

    const resultFile = formData.get("file");
    if (!resultFile) return;
    const result = new Blob([resultFile]);
    const url = URL.createObjectURL(result);
    set({ resultUrl: url });
  },
}));

export default useResultUrlStore;
