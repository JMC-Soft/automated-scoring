import React from 'react';
import IpadNote from '@/app/writing/_components/IpadNote';

export default function Home() {
  return (
    <main className="relative flex h-[calc(100vh-4rem)] items-center justify-center bg-background-500">
      <div className="absolute aspect-[1/0.73] h-[75vh] rounded-[10%] shadow-2xl shadow-black" />
      <div className="bg-ipad relative flex h-[75vh] w-[104.16vh] items-center justify-center">
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <IpadNote />
        </div>
      </div>
    </main>
  );
}
