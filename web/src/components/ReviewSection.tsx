'use client';

import React from 'react';
import clsx from 'clsx';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Note from '@/components/Note';
import useStore from '@/lib/hooks/useStore';
import useEssayStore from '@/store/subjectStore';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewSection({ isOpen, setIsOpen }: Props) {
  const [resultTopic, resultText] = useStore(useEssayStore, (state) => [
    state.resultTopic,
    state.resultText,
  ]);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        className="absolute top-6 ml-6 gap-x-3 rounded-lg px-2"
        onClick={onClick}
        Icon={ChevronDoubleRightIcon}
        iconClassName={clsx({ 'rotate-y-180': isOpen })}
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
        <h4>{resultTopic}</h4>
        <Note text={resultText} className="w-4/5" readonly />
      </section>
    </>
  );
}

export default ReviewSection;
