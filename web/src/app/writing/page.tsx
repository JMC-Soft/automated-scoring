import React from 'react';
import IpadNote from '@/app/writing/_components/IpadNote';

export default function Home() {
  return (
    <main className="relative flex h-[calc(100vh-4rem)] items-center justify-center bg-background-500">
      <div className="absolute aspect-[1/0.73] h-[75vh] rounded-[10%] shadow-2xl shadow-black" />
      <div className="bg-ipad relative flex aspect-[1/0.72] h-[75vh] items-center justify-center">
        <div className="relative flex h-[88%] w-[91.4%] flex-col overflow-hidden rounded-2xl bg-white px-6 py-2">
          <IpadNote />
        </div>
      </div>
    </main>
  );
}
