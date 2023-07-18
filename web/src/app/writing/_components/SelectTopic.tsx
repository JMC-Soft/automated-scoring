'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useEssayStore from '@/store/essayStore';
import useStore from '@/lib/hooks/useStore';
import { Topic } from '@/lib/types';

const topics: Topic[] = [
  { title: '나의 위인전', type: '글짓기' },
  { title: '혐오시설 건설문제에 대한 본인의 생각', type: '대안 제시' },
  { title: '영화감상문', type: '설명문' },
];

function SelectTopic() {
  const [topic, setTopic] = useStore(useEssayStore, (state) => [
    state.topic,
    state.setTopic,
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: Topic) => () => {
    setTopic(value);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={clsx('absolute', {
          'bottom-0 left-0 right-0 top-0 bg-gray-700/10': isOpen,
        })}
      />
      <div className="group relative flex w-2/3 cursor-pointer flex-col text-lg">
        <div
          role="presentation"
          className="flex h-14 cursor-pointer items-center bg-white px-6 transition-all group-hover:text-xl group-hover:font-extrabold group-hover:text-primary-500"
          onClick={toggleDropdown}
        >
          {topic?.title || '에세이 주제를 선택해주세요.'}
          <ChevronDownIcon
            className={clsx(
              'ml-auto h-6 stroke-gray-500 stroke-2 transition-all group-hover:stroke-primary-500 group-hover:stroke-[4px] group-hover:font-extrabold',
              { 'rotate-180': isOpen },
            )}
          />
        </div>

        <ul
          className={clsx(
            'absolute bottom-0 w-full translate-y-full overflow-hidden transition-all duration-75',
            {
              'h-0': !isOpen,
              'h-56': isOpen,
            },
          )}
        >
          {topics.map((value) => (
            <li
              className="flex h-14 w-full items-center bg-white px-6 shadow-xl transition-all duration-300 hover:w-11/12 hover:bg-background-500 hover:pl-10 hover:text-primary-500"
              role="presentation"
              key={value.title}
              onClick={handleSelect(value)}
            >
              {value.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SelectTopic;
