'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';

type Props = {
  text: string;
  onTextChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function Note({ text, onTextChange }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = () => {
    if (!textAreaRef.current || !sectionRef.current) return;

    const currentScrollTop = sectionRef.current.scrollTop;

    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

    sectionRef.current.scrollTop = currentScrollTop;
  };

  useEffect(resizeTextArea, [text]);

  return (
    <section
      ref={sectionRef}
      className="h-full w-3/4 flex-1 basis-0 self-center justify-self-center overflow-y-scroll"
    >
      <textarea
        ref={textAreaRef}
        className="bg-note min-h-full w-full resize-none overflow-hidden border-2 border-primary-700 px-1 leading-loose outline-none"
        defaultValue={text}
        onChange={onTextChange}
        placeholder="내용을 입력하세요."
      />
    </section>
  );
}

export default Note;
