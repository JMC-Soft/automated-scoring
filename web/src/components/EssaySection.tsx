'use client';

import React from 'react';
import clsx from 'clsx';
import Note from '@/components/Note';
import Button from '@/components/ui/Button';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/subjectStore';
import useConfirm from '@/lib/hooks/useConfirm';

function EssaySection() {
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const [setEssayText, topic, setTopic] = useStore(useEssayStore, (state) => [
    state.setEssayText,
    state.topic,
    state.setTopic,
  ]);

  const textLength = essayText?.length || 0;

  useConfirm(() => {
    if (essayText || topic) {
      const result = window.confirm('저장된 글이 있습니다. 불러오시겠습니까?');

      if (!result && setEssayText && setTopic) {
        setEssayText('');
        setTopic('');
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setEssayText) {
      setEssayText(e.target.value);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-evenly gap-y-6 py-6 ">
      <h2 className="text-3xl font-bold">{topic || '주제를 선택해주세요.'}</h2>
      <span
        className={clsx('font-bold', {
          'text-black': textLength <= 1000,
          'text-yellow-500': textLength > 1000 && textLength <= 1250,
          'text-complementary-500': textLength > 1250 && textLength <= 1500,
          'text-red-500': textLength > 1500,
        })}
      >
        {textLength} / 1500
      </span>
      <Note
        className="w-3/4"
        text={essayText || ''}
        onTextChange={handleChange}
      />
      <Button className="w-fit rounded-lg px-4">제출하기</Button>
    </div>
  );
}

export default EssaySection;
