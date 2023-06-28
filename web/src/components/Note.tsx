'use client';

import React, { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useEssayStore from '@/store/subjectStore';

function Note() {
  const essayText = useEssayStore((state) => state.essayText);
  const setEssayText = useEssayStore((state) => state.setEssayText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEssayText(e.target.value);
  };

  return (
    <section className="h-[51vh] w-3/4 self-center justify-self-center overflow-y-scroll scrollbar-hide ">
      <TextareaAutosize
        minRows={15}
        className="bg-note h-full w-full overflow-hidden border-2 border-primary-700 px-1 leading-loose outline-none"
        defaultValue={essayText}
        onChange={handleChange}
        placeholder="내용을 입력하세요."
      />
    </section>
  );
}

export default Note;
