'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Note from '@/components/Note';
import Button from '@/components/ui/Button';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/essayStore';
import useConfirm from '@/lib/hooks/useConfirm';

function EssaySection() {
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const [setEssayText, topic, setTopic] = useStore(useEssayStore, (state) => [
    state.setEssayText,
    state.topic,
    state.setTopic,
  ]);
  const [fetchEvaluateEssay, setResult] = useEssayStore((state) => [
    state.fetchEvaluateEssay,
    state.setResult,
  ]);
  const router = useRouter();

  useConfirm(() => {
    if (essayText || topic) {
      const result = window.confirm('저장된 글이 있습니다. 불러오시겠습니까?');

      if (!result && setEssayText && setTopic) {
        setEssayText('');
        setTopic('');
      }
    }
  });

  const handleEvaluate = async () => {
    if (!essayText) {
      alert('에세이를 작성해주세요.');
      return;
    }

    if (!topic) {
      alert('주제를 선택해주세요.');
      return;
    }

    if (!window.confirm('채점을 시작하시겠습니까?')) {
      return;
    }

    try {
      const result = await fetchEvaluateEssay({ essayText, topic });
      setResult(result);
      router.push('/result');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setEssayText) {
      setEssayText(e.target.value);
    }
  };

  return (
    <>
      <Note text={essayText || ''} onTextChange={handleChange} />
      <Button className="w-fit rounded-lg px-4" onClick={handleEvaluate}>
        제출하기
      </Button>
    </>
  );
}

export default EssaySection;
