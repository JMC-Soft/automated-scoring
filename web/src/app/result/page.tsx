"use client";

import React from "react";
import Image from "next/image";
import result1 from "$/images/temp/result1.png";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useResultUrlStore from "@/store/resultStore";

export default function Page() {
  const router = useRouter();
  const resultUrl = useResultUrlStore((state) => state.resultUrl);

  console.log("resultPage Url: ", resultUrl);

  const handleAgain = () => {
    router.push("/");
  };

  return (
    <main className="flex w-3/4 flex-col items-center justify-center ">
      <section className="flex w-full justify-between">
        <article className="flex h-full flex-col text-center ">
          <Image
            src={result1}
            width={400}
            style={{ objectFit: "contain" }}
            alt="과제 영역 채점 결과"
          />
          <span className="mt-2 text-xl font-bold">과제 영역</span>
        </article>
        <article className="flex h-full flex-col text-center ">
          <Image
            src={result1}
            width={400}
            style={{ objectFit: "contain" }}
            alt="과제 영역 채점 결과"
          />
          <span className="mt-2 text-xl font-bold">과제 영역</span>
        </article>
        <article className="flex h-full flex-col text-center ">
          <Image
            src={result1}
            width={400}
            style={{ objectFit: "contain" }}
            alt="과제 영역 채점 결과"
          />
          <span className="mt-2 text-xl font-bold">과제 영역</span>
        </article>
      </section>
      <section className="flex justify-center gap-x-6">
        <a href={resultUrl} download className="btn bg-green-600">
          파일 다운
        </a>
        <Button title="다시 제출" onClick={handleAgain} color="gray" />
      </section>
    </main>
  );
}
