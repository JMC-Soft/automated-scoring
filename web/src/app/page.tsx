import React from 'react';
import TopicBar from '@/components/TopicBar';
import EssaySection from '@/components/EssaySection';

export default function Home() {
  return (
    <main className="relative flex max-h-full overflow-hidden">
      <TopicBar />
      <EssaySection />
    </main>
  );
}
