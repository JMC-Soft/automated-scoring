'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';

type Props = {
  text: string;
  onTextChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
  title?: string;
  className?: string;
};

function Note({ text, onTextChange, readonly, title, className }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = () => {
    if (!textAreaRef.current || !sectionRef.current) return;

    const currentScrollTop = sectionRef.current.scrollTop;

    textAreaRef.current.style.height = '100%';
    textAreaRef.current.style.height = `${textAreaRef.current}px`;

    sectionRef.current.scrollTop = currentScrollTop;
  };

  useEffect(resizeTextArea, [text]);

  return (
    <div
      className={clsx(
        'flex h-full max-h-full w-full flex-col items-center overflow-y-scroll border shadow-lg scrollbar-hide',
        className,
      )}
      ref={sectionRef}
    >
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      <textarea
        className="min-h-full w-full flex-1 resize-none text-lg font-semibold outline-none"
        ref={textAreaRef}
        defaultValue={text}
        onChange={onTextChange}
        placeholder="내용을 입력하세요."
        readOnly={readonly}
      />
    </div>
  );
}

export default Note;
