'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';

type Props = {
  text: string;
  onTextChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

function Note({ text, onTextChange, className }: Props) {
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
      className={clsx('flex-1 basis-0 overflow-y-scroll', className)}
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
