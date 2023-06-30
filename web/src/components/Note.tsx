'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useEssayStore from '@/store/subjectStore';
import useStore from '@/lib/hooks/useStore';

function Note() {
  const essayText = useStore(useEssayStore, (state) => state.essayText);
  const setEssayText = useEssayStore((state) => state.setEssayText);
  const textRef = useRef(essayText);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    textRef.current = e.target.value;
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      setEssayText(textRef.current || '');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      setEssayText(textRef.current || '');
    };
  }, [setEssayText]);

  return (
    <section className="h-[48.5vh] max-h-[48.5vh] min-h-[48.5vh] w-3/4 self-center justify-self-center overflow-y-scroll scrollbar-hide  ">
      <TextareaAutosize
        minRows={14}
        className="bg-note h-full w-full overflow-hidden border-2 border-primary-700 px-1 leading-loose outline-none "
        defaultValue={essayText}
        onChange={handleChange}
        placeholder="내용을 입력하세요."
      />
    </section>
  );
}

export default Note;
