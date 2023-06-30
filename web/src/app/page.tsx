import React from 'react';
import TopicBar from '@/components/TopicBar';
import EssaySection from '@/components/EssaySection';

export default function Home() {
  return (
    <main className="relative grid max-h-full grid-cols-main-layout grid-rows-main-layout overflow-hidden">
      <TopicBar />
      <EssaySection />
    </main>
  );
}
