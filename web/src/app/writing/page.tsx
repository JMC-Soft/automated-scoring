import React from 'react';
import IpadNote from '@/app/writing/_components/IpadNote';

export default function Home() {
  return (
    <main className="relative flex h-[calc(100vh-4rem)] items-center justify-center bg-background-500">
      <div className="absolute h-[69.35vw] max-h-[73vh] w-[95vw] max-w-[100vh] rounded-[10%] shadow-2xl shadow-black laptop:h-[54.75vw] laptop:w-[75vw]" />
      <div className="bg-ipad relative flex h-[69.35vw] max-h-[73vh] w-[95vw] max-w-[100vh] items-center justify-center laptop:h-[54.75vw] laptop:w-[75vw]">
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <IpadNote />
        </div>
      </div>
    </main>
  );
}
