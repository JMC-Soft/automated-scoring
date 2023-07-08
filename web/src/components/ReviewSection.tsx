'use client';

import React from 'react';
import clsx from 'clsx';
import Button from '@/components/ui/Button';
import Note from '@/components/Note';
import { EssayResult } from '@/lib/types';

type Props = {
  data: EssayResult;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewSection({ data, isOpen, setIsOpen }: Props) {
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        className="absolute top-6 ml-6 gap-x-3 rounded-lg px-2"
        onClick={onClick}
      />
      <section
        className={clsx(
          'flex flex-col items-center gap-y-10 overflow-hidden whitespace-nowrap py-8 transition-all duration-500',
          {
            'w-1/4 border-r': isOpen,
            'w-0': !isOpen,
          },
        )}
      >
        <h4>{data.topic}</h4>
        <Note text={data.essayText} readonly />
      </section>
    </>
  );
}

export default ReviewSection;
