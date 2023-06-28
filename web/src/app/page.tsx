import React from 'react';
import TopicBar from '@/components/TopicBar';
import Note from '@/components/Note';
import Topic from '@/components/Topic';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="relative grid max-h-full grid-cols-main-layout grid-rows-main-layout">
      <TopicBar />
      <Topic />
      <Note />
      <Button className="mx-auto my-auto w-fit">제출하기</Button>
    </main>
  );
}
