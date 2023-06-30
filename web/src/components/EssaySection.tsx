'use client';

import React, { useLayoutEffect } from 'react';
import Topic from '@/components/Topic';
import Note from '@/components/Note';
import Button from '@/components/ui/Button';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/subjectStore';
import useHydration from '@/lib/hooks/useHydration';

function EssaySection() {
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const setEssayText = useEssayStore((state) => state.setEssayText);
  const topic = useStore(useEssayStore, (state) => state.topic);
  const setTopic = useEssayStore((state) => state.setTopic);
  const isHydrated = useHydration(useEssayStore);

  useLayoutEffect(() => {
    if (
      (essayText || topic) &&
      !confirm('저장된 글이 있습니다. 불러오시겠습니까?')
    ) {
      setEssayText('');
      setTopic('');
    }
  }, [isHydrated]);

  return (
    <>
      <Topic />
      <Note />
      <Button className="mx-auto my-auto w-fit">제출하기</Button>
    </>
  );
}

export default EssaySection;
