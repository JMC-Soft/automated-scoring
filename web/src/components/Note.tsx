'use client';

import React, { ChangeEvent, useEffect, useRef } from 'react';
import noteStyles from '@/lib/styles/note.module.css';

type Props = {
  text: string;
  onTextChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
};

function Note({ text, onTextChange, readonly }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const resizeTextArea = () => {
    if (!textAreaRef.current || !sectionRef.current || !lineRef.current) return;

    const currentScrollTop = sectionRef.current.scrollTop;

    textAreaRef.current.style.height = '100%';
    lineRef.current.style.height = '100%';
    const height = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = `${height}px`;
    lineRef.current.style.height = `${height}px`;

    sectionRef.current.scrollTop = currentScrollTop;
  };

  useEffect(resizeTextArea, [text]);

  return (
    <div className={noteStyles.paper} ref={sectionRef}>
      <div className={noteStyles.line} ref={lineRef} />
      <textarea
        className={noteStyles.paperContent}
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
