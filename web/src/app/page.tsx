import React from 'react';
import EssaySection from '@/app/_components/EssaySection';
import SelectTopic from '@/app/_components/SelectTopic';
import EssayLength from '@/app/_components/EssayLength';

export default function Home() {
  return (
    <main className="bg-gradient-gray relative flex max-h-full flex-1 flex-col items-center justify-evenly gap-y-6 overflow-hidden py-6">
      <SelectTopic />
      <EssayLength />
      <EssaySection />
    </main>
  );
}
