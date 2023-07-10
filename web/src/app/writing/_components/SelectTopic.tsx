'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import useEssayStore from '@/store/essayStore';

const options = [
  '나의 위인전',
  'Godzilla',
  'Back to the future',
  'Shutter Island',
];

function SelectTopic() {
  const topic = useEssayStore((state) => state.topic);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(topic);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  return (
    <>
      <div
        className={clsx('absolute', {
          'bottom-0 left-0 right-0 top-0 bg-gray-700/10': isOpen,
        })}
      />
      <div className="text-tertiary-700 group relative flex w-1/3 cursor-pointer flex-col rounded border-4 border-primary-500 text-lg shadow-primary-300 drop-shadow-lg">
        <div
          role="presentation"
          className="flex h-14 cursor-pointer items-center bg-white px-6 transition-all group-hover:bg-primary-50 group-hover:text-xl group-hover:font-extrabold group-hover:text-primary-500"
          onClick={toggleDropdown}
        >
          {selectedOption || '에세이 주제를 선택해주세요.'}
          <ArrowSmallDownIcon
            className={clsx(
              'ml-auto h-6 stroke-2 transition-all group-hover:stroke-primary-500 group-hover:stroke-[4px] group-hover:font-extrabold',
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
          {options.map((option) => (
            <li
              className="flex h-14 w-full items-center bg-white px-6 shadow-xl transition-all duration-300 hover:w-11/12 hover:bg-primary-50 hover:pl-10 hover:text-primary-500"
              role="presentation"
              key={option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SelectTopic;
