"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Image from "next/image";
import excelIcon from "$/images/icons/excelIcon.png";
import Button from "@/components/Button";
import useResultUrlStore from "@/store/resultStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parseSheet from "@/utils/parseSheet";

/**
 * TODO
 *  1. 컴포넌트를 분리하여 관심사를 분리하세요. 추가로, 서버컴포넌트와 클라이언트 컴포넌트를 분리하세요.
 *  2. 가능하면 재사용 가능하도록 컴포넌트를 설계하세요.
 *  3. 전역상태관리 값으로 selectedFile, isLoading, isError, isSuccess 등을 사용하여 UI를 구현하세요.
 *  */
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const fileRegExp = /(\.csv|\.xlsx|\.xls)$/i;

  const setResultUrl = useResultUrlStore((state) => state.setResultUrl);

  const notify = (content: string) =>
    toast.error(content, {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      await parseSheet(file);

      setIsLoading(true);
      await setResultUrl(file);
      router.push("/result");
    } catch (err: any) {
      notify(err.message);
    }
  };

  const handleSelectFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!fileRegExp.test(e.target.files[0].name)) {
      notify("엑셀 형식으로 제출해 주세요");
      return;
    }

    setFile(e.target.files[0]);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <main className="flex h-3/4 w-1/2 flex-col items-center justify-center gap-y-5 border-2 border-black text-gray-500">
      {!file ? (
        <>
          <h2 className="text-3xl font-bold">
            파일 업로드를 눌러 채점할 파일을 제출해주세요
          </h2>
          <span className="text-xl font-semibold">
            또는 이곳으로 파일을 드래그 하세요
          </span>
        </>
      ) : (
        <>
          <Image src={excelIcon} alt="엑셀 아이콘" height={100} />
          <span className="text-xl font-semibold">{file.name}</span>
        </>
      )}

      <input ref={inputRef} type="file" hidden onChange={handleChange} />
      <Button onClick={handleSelectFile} title="파일 선택" color="green" />
      <ToastContainer />
      {file && <Button onClick={handleSubmit} title="제출" color="green" />}
    </main>
  );
}
